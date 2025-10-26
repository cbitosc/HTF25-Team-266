const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
  const stats = {
    users: 120,
    transactionsToday: 34,
    networkStatus: 'healthy'
  };
  res.json({ stats });
});

module.exports = router;
