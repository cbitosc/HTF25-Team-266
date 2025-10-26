"use client";
import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function EvaluationPage() {
  const [algos, setAlgos] = useState({ lamport: true, ecdsa: true, lattice: true });
  const [rounds, setRounds] = useState(3);
  const [messageSize, setMessageSize] = useState(128);
  const [results, setResults] = useState<any>(null);
  const [running, setRunning] = useState(false);

  function toggle(name: string) {
    setAlgos(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  }

  async function runBenchmark() {
    const selected = Object.keys(algos).filter(k => (algos as any)[k]);
    if (selected.length === 0) return alert('Choose at least one algorithm');
    setRunning(true);
    setResults(null);
    try {
      const res = await fetch(`${API_BASE}/api/eval/benchmark`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithms: selected, rounds, messageSize })
      });
      const json = await res.json();
      setResults(json);
    } catch (e) {
      setResults({ error: (e as Error).message });
    } finally { setRunning(false); }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluation / Benchmark</h1>
      <div className="mb-4">
        <label className="mr-2">Rounds:</label>
        <input type="number" value={rounds} onChange={e => setRounds(Number(e.target.value))} className="p-1 border rounded w-24 mr-4" />
        <label className="mr-2">Message size (bytes):</label>
        <input type="number" value={messageSize} onChange={e => setMessageSize(Number(e.target.value))} className="p-1 border rounded w-28" />
      </div>

      <div className="mb-4">
        <label className="mr-2"><input type="checkbox" checked={algos.lamport} onChange={() => toggle('lamport')} /> Lamport</label>
        <label className="ml-4 mr-2"><input type="checkbox" checked={algos.ecdsa} onChange={() => toggle('ecdsa')} /> ECDSA</label>
        <label className="ml-4"><input type="checkbox" checked={algos.lattice} onChange={() => toggle('lattice')} /> Lattice-sim</label>
      </div>

      <div className="mb-4">
        <button onClick={runBenchmark} className="px-3 py-1 bg-purple-600 text-white rounded" disabled={running}>{running ? 'Running...' : 'Run Benchmark'}</button>
      </div>

      {results && (
        <div className="mt-6">
          <h2 className="font-semibold">Results</h2>
          <pre className="bg-gray-100 p-3 rounded max-h-96 overflow-auto">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
