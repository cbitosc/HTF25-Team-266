const express = require('express');
const router = express.Router();

// Simple in-memory wallet store (for demo only)
const wallets = {
  'main': { address: 'main', balance: 1000 }
};

// GET /api/wallet/balance
router.get('/balance', (req, res) => {
  const { address = 'main' } = req.query;
  const w = wallets[address];
  if (!w) return res.status(404).json({ error: 'wallet not found' });
  res.json({ address: w.address, balance: w.balance });
});

// POST /api/wallet/transfer { to, from, amount }
router.post('/transfer', (req, res) => {
  const { to, from = 'main', amount } = req.body;
  if (!to || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'invalid transfer payload' });
  }
  if (!wallets[from]) wallets[from] = { address: from, balance: 0 };
  if (!wallets[to]) wallets[to] = { address: to, balance: 0 };
  if (wallets[from].balance < amount) return res.status(400).json({ error: 'insufficient funds' });

  wallets[from].balance -= amount;
  wallets[to].balance += amount;

  const tx = { id: `tx_${Date.now()}`, from, to, amount, timestamp: Date.now() };
  // For demo we won't persist transactions, but return the tx object
  res.json({ tx, balances: { [from]: wallets[from].balance, [to]: wallets[to].balance } });
});

module.exports = router;
