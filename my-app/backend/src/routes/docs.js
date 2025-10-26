const express = require('express');
const router = express.Router();

const docs = [
  { id: 'getting-started', title: 'Getting Started', content: 'This is a demo API for the frontend.' },
  { id: 'api', title: 'API Reference', content: 'List of available endpoints.' }
];

router.get('/', (req, res) => {
  res.json({ docs });
});

router.get('/:id', (req, res) => {
  const doc = docs.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'doc not found' });
  res.json({ doc });
});

module.exports = router;
