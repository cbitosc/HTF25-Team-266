const crypto = require('crypto');
const sha256 = (data) => crypto.createHash('sha256').update(data).digest();

// Lamport one-time signature implementation (demo)
// Key sizes are large (2 * 256 * 32 bytes for 256-bit hash) — this is expected.
function generateLamportKey() {
  const n = 256; // bits
  const sk = [];
  const pk = [];
  for (let i = 0; i < n; i++) {
    const a = crypto.randomBytes(32);
    const b = crypto.randomBytes(32);
    sk.push([a.toString('hex'), b.toString('hex')]);
    pk.push([sha256(a).toString('hex'), sha256(b).toString('hex')]);
  }
  return { sk, pk };
}

function signLamport(message, sk) {
  const digest = sha256(Buffer.from(message));
  const bits = Buffer.from(digest).toString('hex');
  // bits as hex -> convert to binary string
  const bin = Buffer.from(digest).toString('binary');
  // Simpler: iterate through each bit of digest
  const sig = [];
  const digestBits = [];
  for (let byteIdx = 0; byteIdx < digest.length; byteIdx++) {
    const byte = digest[byteIdx];
    for (let bit = 7; bit >= 0; bit--) {
      const b = (byte >> bit) & 1;
      digestBits.push(b);
    }
  }
  for (let i = 0; i < digestBits.length; i++) {
    const bit = digestBits[i];
    const skpart = sk[i][bit];
    sig.push(skpart);
  }
  return { sig, digest: digest.toString('hex') };
}

function verifyLamport(message, sig, pk) {
  const digest = sha256(Buffer.from(message));
  const digestBits = [];
  for (let byteIdx = 0; byteIdx < digest.length; byteIdx++) {
    const byte = digest[byteIdx];
    for (let bit = 7; bit >= 0; bit--) {
      const b = (byte >> bit) & 1;
      digestBits.push(b);
    }
  }
  if (sig.length !== digestBits.length) return false;
  for (let i = 0; i < digestBits.length; i++) {
    const bit = digestBits[i];
    const hashed = sha256(Buffer.from(sig[i], 'hex')).toString('hex');
    if (hashed !== pk[i][bit]) return false;
  }
  return true;
}

// Classical ECDSA (P-256) wrapper using Node's crypto
function generateEcdsaKey() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' });
  return {
    sk: privateKey.export({ type: 'pkcs8', format: 'pem' }),
    pk: publicKey.export({ type: 'spki', format: 'pem' })
  };
}

function signEcdsa(message, skPem) {
  const sign = crypto.createSign('SHA256');
  sign.update(message);
  sign.end();
  const sig = sign.sign(skPem);
  return sig.toString('hex');
}

function verifyEcdsa(message, sigHex, pkPem) {
  const verify = crypto.createVerify('SHA256');
  verify.update(message);
  verify.end();
  return verify.verify(pkPem, Buffer.from(sigHex, 'hex'));
}

// Simulated lattice-based adapter (placeholder) — describes sizes and simulates time cost
function simulateLatticeGenerate() {
  // approximate sizes in bytes for demonstration
  return { skSize: 3500, pkSize: 1500, note: 'Simulated Dilithium-like key sizes' };
}

function simulateLatticeSign(message) {
  // Simulate heavier CPU by performing repeated hashing
  const rounds = 20000;
  let x = sha256(Buffer.from(message));
  for (let i = 0; i < rounds; i++) {
    x = sha256(x);
  }
  return { signature: x.toString('hex'), sigSize: 2000 };
}

function simulateLatticeVerify(message, signature) {
  // Quick simulated verify (less work)
  const x = sha256(Buffer.from(message)).toString('hex');
  return { valid: typeof signature === 'string', note: 'Simulated verification (placeholder)' };
}

module.exports = {
  generateLamportKey,
  signLamport,
  verifyLamport,
  generateEcdsaKey,
  signEcdsa,
  verifyEcdsa,
  simulateLatticeGenerate,
  simulateLatticeSign,
  simulateLatticeVerify
};
