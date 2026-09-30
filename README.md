# Website KONI Hulu Sungai Utara — GitHub Pages + Google Spreadsheet/Drive

Arsitektur:

* **Frontend** (index.html, admin.html, config.js, logo.js) -> di-host di **GitHub Pages**
* **Backend/API** (Kode.gs) -> tetap di **Google Apps Script** yang terikat ke Spreadsheet Anda
* **Database** -> Google Spreadsheet, **foto** -> Google Drive (tidak berubah)

## Catatan

* Setiap mengubah `Kode.gs`, deploy ulang dengan **New version** (langkah A6).
* Edit langsung di Spreadsheet baru tampil setelah cache 10 menit habis (atau jalankan `clearDataCache\_` dari editor).
* Data pribadi (NIK, alamat, Foto KTP) tetap tidak dikirim ke halaman publik; Foto KTP tetap privat.

