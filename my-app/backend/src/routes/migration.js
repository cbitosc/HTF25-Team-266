const express = require('express');
const router = express.Router();

// Simple in-memory migration job store
const jobs = {}; // jobId -> { status, createdAt }

router.post('/migrate', (req, res) => {
  const jobId = `job_${Date.now()}`;
  jobs[jobId] = { status: 'queued', createdAt: Date.now() };

  // simulate async progression
  setTimeout(() => { jobs[jobId].status = 'running'; }, 500);
  setTimeout(() => { jobs[jobId].status = 'completed'; }, 2000);

  res.json({ jobId, status: jobs[jobId].status });
});

router.get('/status/:jobId', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'job not found' });
  res.json({ jobId: req.params.jobId, status: job.status, createdAt: job.createdAt });
});

module.exports = router;
