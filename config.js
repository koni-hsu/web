// ====== KONFIGURASI ======
// Tempel URL Web App Apps Script Anda (yang berakhiran /exec) di bawah ini.
const API_URL = 'https://script.google.com/macros/s/AKfycbwtIviEw9SVwmXPHRLgkmrpPlisG0-lyNHrjgt9EX_1PYEoSSLriZsggeXKj49VcrjH/exec';

// Pemanggil API ke Google Apps Script (pengganti google.script.run)
const API_TIMEOUT_MS = 20000;

async function api(fn, ...args) {
  if (!API_URL || API_URL.indexOf('PASTE_') === 0) throw new Error('API_URL belum diisi di config.js');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = fn === 'getData'
      ? await fetch(API_URL + '?action=getData', { signal: controller.signal, cache: 'no-store' })
      : await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ fn, args }),
          signal: controller.signal,
          cache: 'no-store'
        });
    if (!res.ok) throw new Error('Server HTTP ' + res.status);
    let j;
    try { j = await res.json(); } catch (e) { throw new Error('Respons server tidak valid (cek deploy Web App: akses harus "Siapa saja")'); }
    if (!j.ok) throw new Error(j.error || 'Terjadi kesalahan');
    return j.data;
  } catch (e) {
    if (e && e.name === 'AbortError') throw new Error('Server terlalu lama merespons. Coba lagi.');
    if (e && e.message && (/server HTTP/i.test(e.message) || /Respons server/i.test(e.message))) throw e;
    throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet.');
  } finally {
    clearTimeout(timer);
  }
}
