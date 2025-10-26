"use client";
import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function PQCDemoPage() {
  const [type, setType] = useState<'lamport'|'ecdsa'|'lattice'>('lamport');
  const [keyPair, setKeyPair] = useState<any>(null);
  const [message, setMessage] = useState('Hello, quantum-resistant world');
  const [signature, setSignature] = useState<any>(null);
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setKeyPair(null);
    setSignature(null);
    setVerifyResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/crypto/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      const json = await res.json();
      setKeyPair(json);
    } catch (e) {
      setKeyPair({ error: (e as Error).message });
    } finally { setLoading(false); }
  }

  async function sign() {
    if (!keyPair) return alert('Generate keys first');
    setLoading(true);
    try {
      const body: any = { type, message };
      if (type === 'lamport') body.key = keyPair.sk;
      if (type === 'ecdsa') body.key = keyPair.sk;
      if (type === 'lattice') body.key = keyPair.info;

      const res = await fetch(`${API_BASE}/api/crypto/sign`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const json = await res.json();
      setSignature(json);
    } catch (e) {
      setSignature({ error: (e as Error).message });
    } finally { setLoading(false); }
  }

  async function verify() {
    if (!keyPair || !signature) return alert('Generate keys and signature first');
    setLoading(true);
    try {
      const body: any = { type, message };
      if (type === 'lamport') body.pk = keyPair.pk, body.signature = signature.sig || signature.signature;
      if (type === 'ecdsa') body.pk = keyPair.pk, body.signature = signature.signature || signature.signature;
      if (type === 'lattice') body.pk = keyPair.info, body.signature = signature.signature || signature.signature;

      // normalize signature field names
      if (!body.signature && signature.signature) body.signature = signature.signature;

      const res = await fetch(`${API_BASE}/api/crypto/verify`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const json = await res.json();
      setVerifyResult(json);
    } catch (e) {
      setVerifyResult({ error: (e as Error).message });
    } finally { setLoading(false); }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quantum-Resistant Crypto Demo</h1>
      <div className="mb-4">
        <label className="mr-2">Algorithm:</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="p-2 border rounded">
          <option value="lamport">Lamport (hash-based, one-time)</option>
          <option value="ecdsa">ECDSA (classical)</option>
          <option value="lattice">Lattice-sim (simulated)</option>
        </select>
        <button onClick={generate} className="ml-4 px-3 py-1 bg-blue-600 text-white rounded">Generate Key</button>
      </div>

      <div className="mb-6">
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        <div className="mt-2">
          <button onClick={sign} className="px-3 py-1 bg-green-600 text-white rounded mr-2">Sign</button>
          <button onClick={verify} className="px-3 py-1 bg-indigo-600 text-white rounded">Verify</button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Key / Signature</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-60 overflow-auto">{JSON.stringify(keyPair, null, 2)}</pre>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Signature Result</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-60 overflow-auto">{JSON.stringify(signature, null, 2)}</pre>
      </div>

      <div>
        <h2 className="font-semibold">Verify Result</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-40 overflow-auto">{JSON.stringify(verifyResult, null, 2)}</pre>
      </div>

      {loading && <div className="mt-4 text-sm text-gray-600">Processing...</div>}
    </div>
  );
}
