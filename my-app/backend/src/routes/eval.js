const express = require('express');
const router = express.Router();
const pqc = require('../crypto/pqc');

// POST /api/eval/benchmark { algorithms: ['lamport','ecdsa','lattice'], rounds: n, messageSize }
router.post('/benchmark', async (req, res) => {
  const { algorithms = ['lamport','ecdsa','lattice'], rounds = 5, messageSize = 128 } = req.body || {};
  const message = 'x'.repeat(messageSize);
  const results = {};

  for (const alg of algorithms) {
    results[alg] = { sign: [], verify: [], signatureSize: null, keySize: null };
    // generate key / info
    let keyInfo;
    if (alg === 'lamport') {
      keyInfo = pqc.generateLamportKey();
      results[alg].keySize = JSON.stringify(keyInfo.sk).length + JSON.stringify(keyInfo.pk).length;
    } else if (alg === 'ecdsa') {
      keyInfo = pqc.generateEcdsaKey();
      results[alg].keySize = Buffer.byteLength(keyInfo.sk) + Buffer.byteLength(keyInfo.pk);
    } else {
      keyInfo = pqc.simulateLatticeGenerate();
      results[alg].keySize = (keyInfo.skSize || 0) + (keyInfo.pkSize || 0);
    }

    for (let i = 0; i < rounds; i++) {
      const t0 = Date.now();
      let signature;
      if (alg === 'lamport') {
        const s = pqc.signLamport(message, keyInfo.sk);
        signature = s.sig;
      } else if (alg === 'ecdsa') {
        signature = pqc.signEcdsa(message, keyInfo.sk);
      } else {
        signature = pqc.simulateLatticeSign(message).signature;
      }
      const t1 = Date.now();
      // verify
      let valid;
      const vt0 = Date.now();
      if (alg === 'lamport') {
        valid = pqc.verifyLamport(message, signature, keyInfo.pk);
      } else if (alg === 'ecdsa') {
        valid = pqc.verifyEcdsa(message, signature, keyInfo.pk);
      } else {
        valid = pqc.simulateLatticeVerify(message, signature).valid;
      }
      const vt1 = Date.now();

      results[alg].sign.push(t1 - t0);
      results[alg].verify.push(vt1 - vt0);
      if (!results[alg].signatureSize) {
        results[alg].signatureSize = (typeof signature === 'string') ? Buffer.byteLength(signature, 'hex') || signature.length : JSON.stringify(signature).length;
      }
      results[alg].lastValid = !!valid;
    }
    // average
    const avg = (arr) => arr.reduce((a,b)=>a+b,0)/arr.length;
    results[alg].avgSignMs = avg(results[alg].sign);
    results[alg].avgVerifyMs = avg(results[alg].verify);
  }

  res.json({ messageSize, rounds, results, note: 'Lamport is one-time; key reuse is insecure — used here for demo only.' });
});

module.exports = router;
