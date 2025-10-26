const express = require('express');
const router = express.Router();

// Demo blockchain data
const blocks = [
  { height: 1, hash: '0001', timestamp: Date.now() - 60000, transactions: [] },
  { height: 2, hash: '0002', timestamp: Date.now() - 30000, transactions: [] }
];
const txIndex = {}; // map txId -> tx

router.get('/blocks/latest', (req, res) => {
  const latest = blocks[blocks.length - 1];
  res.json({ block: latest });
});

router.get('/blocks/:height', (req, res) => {
  const h = Number(req.params.height);
  const block = blocks.find(b => b.height === h);
  if (!block) return res.status(404).json({ error: 'block not found' });
  res.json({ block });
});

router.get('/tx/:id', (req, res) => {
  const tx = txIndex[req.params.id];
  if (!tx) return res.status(404).json({ error: 'tx not found' });
  res.json({ tx });
});

module.exports = router;
