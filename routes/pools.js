const express = require('express');
const router = express.Router();

// Data Array
let pools = [
  { id: 1, name: 'Kolam Renang A', location: 'Jakarta', price: 50000 },
  { id: 2, name: 'Kolam Renang B', location: 'Bandung', price: 40000 },
];

// READ: Lihat semua data
router.get('/', (req, res) => {
  res.render('index', { pools });
});

// CREATE: Form tambah data
router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  const { name, location, price } = req.body;
  const id = pools.length ? pools[pools.length - 1].id + 1 : 1;
  pools.push({ id, name, location, price: Number(price) });
  res.redirect('/pools');
});

// UPDATE: Form edit data
router.get('/edit/:id', (req, res) => {
  const id = Number(req.params.id);
  const pool = pools.find((p) => p.id === id);
  if (!pool) return res.status(404).send('Data tidak ditemukan');
  res.render('edit', { pool });
});

router.post('/edit/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, location, price } = req.body;
  const pool = pools.find((p) => p.id === id);
  if (pool) {
    pool.name = name;
    pool.location = location;
    pool.price = Number(price);
  }
  res.redirect('/pools');
});

// DELETE: Hapus data
router.post('/delete/:id', (req, res) => {
  const id = Number(req.params.id);
  pools = pools.filter((p) => p.id !== id);
  res.redirect('/pools');
});

module.exports = router;
