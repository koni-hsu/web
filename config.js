// ====== KONFIGURASI ======
// Tempel URL Web App Apps Script Anda (yang berakhiran /exec) di bawah ini.
const API_URL = 'https://script.google.com/macros/s/AKfycbxmYcNKu4oy0VG-ls3DbFHNf-Kt_I70bsfIs8Lbmcn_qSqAKi57g5p4MV6co1Ol55yQNw/exec';

// Pemanggil API ke Google Apps Script (pengganti google.script.run)
async function api(fn, ...args) {
  if (!API_URL || API_URL.indexOf('PASTE_') === 0) throw new Error('API_URL belum diisi di config.js');
  let res;
  try {
    res = fn === 'getData'
      ? await fetch(API_URL + '?action=getData')
      : await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain agar tidak memicu preflight CORS
          body: JSON.stringify({ fn, args })
        });
  } catch (e) { throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet.'); }
  let j;
  try { j = await res.json(); } catch (e) { throw new Error('Respons server tidak valid (cek deploy Web App: akses harus "Siapa saja")'); }
  if (!j.ok) throw new Error(j.error || 'Terjadi kesalahan');
  return j.data;
}
