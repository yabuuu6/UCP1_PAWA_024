const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// GET: Arahkan ke halaman /pools
app.get('/', (req, res) => {
    res.redirect('/pools');
});

// GET: Tampilkan semua data kolam renang
app.get('/pools', (req, res) => {
    const query = 'SELECT * FROM pools';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        } 
        res.render('index', { pools: results });
    });
});

// GET: Tampilkan form tambah kolam renang
app.get('/pools/add', (req, res) => {
    res.render('add');
});

// POST: Tambah data kolam renang baru
app.post('/pools/add', (req, res) => {
    const { name, location, price } = req.body;
    const query = 'INSERT INTO pools (nama, tempat_asal, harga) VALUES (?, ?, ?)';
    db.query(query, [name, location, price], (err) => {
      if (err) return res.status(500).send('Error adding pools');
      res.redirect('/pools');
    });
});

// POST: Update data kolam renang
app.post('/pools/edit/:id', (req, res) => {
  const { name, location, price } = req.body;
  const query = 'UPDATE pools SET nama = ?, tempat_asal = ?, harga = ? WHERE id = ?';
  db.query(query, [name, location, price, req.params.id], (err) => {
    if (err) return res.status(500).send('Error updating pool');
    res.redirect('/pools');
  });
});

// POST: Hapus data kolam renang
app.post('/pools/delete/:id', (req, res) => {
  const query = 'DELETE FROM pools WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send('Error deleting pool');
    res.redirect('/pools');
  });
});

// Mulai server
const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
