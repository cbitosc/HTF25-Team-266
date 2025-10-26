const express = require('express');
const router = express.Router();
const pqc = require('../crypto/pqc');

// POST /api/crypto/generate { type }
router.post('/generate', (req, res) => {
  const { type } = req.body;
  if (type === 'lamport') {
    const { sk, pk } = pqc.generateLamportKey();
    // Return only public key and a key id; private key returned for demo (in real app do not return sk)
    return res.json({ keyId: `lamport_${Date.now()}`, pk, sk });
  }
  if (type === 'ecdsa') {
    const { sk, pk } = pqc.generateEcdsaKey();
    return res.json({ keyId: `ecdsa_${Date.now()}`, pk, sk });
  }
  if (type === 'lattice') {
    const info = pqc.simulateLatticeGenerate();
    return res.json({ keyId: `lattice_${Date.now()}`, info });
  }
  res.status(400).json({ error: 'unknown type' });
});

// POST /api/crypto/sign { type, key, message }
router.post('/sign', (req, res) => {
  const { type, key, message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  if (type === 'lamport') {
    try {
      const result = pqc.signLamport(message, key);
      return res.json({ algorithm: 'lamport', ...result, signatureSize: result.sig.length * 32 });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  if (type === 'ecdsa') {
    try {
      const sig = pqc.signEcdsa(message, key);
      return res.json({ algorithm: 'ecdsa', signature: sig, signatureSize: Buffer.from(sig, 'hex').length });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  if (type === 'lattice') {
    const sig = pqc.simulateLatticeSign(message);
    return res.json({ algorithm: 'lattice-sim', signature: sig.signature, signatureSize: sig.sigSize });
  }
  res.status(400).json({ error: 'unknown type' });
});

// POST /api/crypto/verify { type, pk, message, signature }
router.post('/verify', (req, res) => {
  const { type, pk, message, signature } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  if (type === 'lamport') {
    const valid = pqc.verifyLamport(message, signature, pk);
    return res.json({ algorithm: 'lamport', valid });
  }
  if (type === 'ecdsa') {
    const valid = pqc.verifyEcdsa(message, signature, pk);
    return res.json({ algorithm: 'ecdsa', valid });
  }
  if (type === 'lattice') {
    const valid = pqc.simulateLatticeVerify(message, signature);
    return res.json({ algorithm: 'lattice-sim', valid });
  }
  res.status(400).json({ error: 'unknown type' });
});

module.exports = router;
