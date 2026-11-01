/* ============================================================
   skyh.js — Formato .skyh v1 (Huffman Web Compressor · Skynet)
   ------------------------------------------------------------
   Implementa la "Especificación del formato .skyh":

   [ HEADER 48 B ][ NOMBRE ][ TABLA DE FRECUENCIAS ][ DATOS ]

   Offset  Bytes  Campo
   0       4      Magic "SKYH"
   4       1      Versión (1)
   5       1      Flags (reservado, 0)
   6       4      Tamaño original (uint32 LE)
   10      4      Total de bits válidos (uint32 LE)
   14      2      N = símbolos distintos (uint16 LE, 0–256)
   16      32     SHA-256 del original
   48      1+L    Longitud L del nombre + nombre UTF-8
   …       N×5    Tabla: 1 byte símbolo + 4 bytes frecuencia (uint32 LE)
   …       ⌈bits/8⌉ Datos comprimidos (bits empaquetados MSB primero)

   Uso en el navegador:  <script src="skyh.js"></script>  → objeto global `Skyh`
   Uso en Node (pruebas): const Skyh = require("./skyh.js");

   API principal (todas las funciones de archivo son async por SHA-256):
     Skyh.escribirArchivo(bytes, nombre)  → { archivo, info }
     Skyh.leerArchivo(entrada)            → info   (solo inspecciona)
     Skyh.descomprimir(info)              → { bytes, hashCalculado, integro }
   ============================================================ */

(function (global) {
  "use strict";

  // ------------------------------------------------------------
  // CONSTANTES DEL FORMATO
  // ------------------------------------------------------------
  const MAGIC = [0x53, 0x4b, 0x59, 0x48]; // "SKYH"
  const VERSION = 1;
  const TAM_HEADER = 48;
  const TAM_ENTRADA_TABLA = 5;
  const MAX_UINT32 = 0xffffffff;

  class SkyhError extends Error {
    constructor(mensaje) {
      super(mensaje);
      this.name = "SkyhError";
    }
  }

  // ------------------------------------------------------------
  // SHA-256 (WebCrypto si existe; respaldo en JS puro)
  // ------------------------------------------------------------
  const K256 = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);

  function sha256Js(datos) {
    const l = datos.length;
    const total = Math.ceil((l + 9) / 64) * 64;
    const buf = new Uint8Array(total);
    buf.set(datos);
    buf[l] = 0x80;
    const dv = new DataView(buf.buffer);
    dv.setUint32(total - 8, Math.floor(l / 0x20000000));
    dv.setUint32(total - 4, (l << 3) >>> 0);

    const H = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ]);
    const w = new Uint32Array(64);

    for (let o = 0; o < total; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) {
        const a = w[i - 15], b = w[i - 2];
        const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3);
        const s1 = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K256[i] + w[i]) >>> 0;
        const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        const mj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + mj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0;
        d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0;
      H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0;
      H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }

    const salida = new Uint8Array(32);
    const dvOut = new DataView(salida.buffer);
    for (let i = 0; i < 8; i++) dvOut.setUint32(i * 4, H[i]);
    return salida;
  }

  async function sha256(datos) {
    const subtle = global.crypto && global.crypto.subtle;
    if (subtle) {
      try {
        return new Uint8Array(await subtle.digest("SHA-256", datos));
      } catch (e) {
        /* contexto no seguro: usar respaldo */
      }
    }
    return sha256Js(datos);
  }

})(typeof globalThis !== "undefined" ? globalThis : this);
