const mysql = require('mysql');

// Konfigurasi koneksi
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'kolam_renang', // Nama database
});



// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;

