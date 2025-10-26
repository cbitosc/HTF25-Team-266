"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Zap, Lock, CheckCircle, Cpu, Gauge, Database, Info } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const CALCULATION_EXPLANATIONS = {
  cpu_usage: "CPU Usage = (PQC_ops × complexity_factor) / total_cpu_capacity × 100%",
  latency: "Latency = avg_signature_time + network_propagation_delay + verification_time",
  tps: "TPS = total_transactions_in_block / average_block_time",
  verification_rate: "Verification Rate = successful_verifications / total_verification_attempts × 100%",
  migration_progress: "Migration Progress = migrated_keys / total_keys × 100%",
}

// Mock data for benchmarks
const benchmarkData = [
  { time: "00:00", pqc_cpu: 45, classical_cpu: 32, pqc_latency: 120, classical_latency: 85 },
  { time: "04:00", pqc_cpu: 52, classical_cpu: 38, pqc_latency: 135, classical_latency: 92 },
  { time: "08:00", pqc_cpu: 48, classical_cpu: 35, pqc_latency: 128, classical_latency: 88 },
  { time: "12:00", pqc_cpu: 61, classical_cpu: 42, pqc_latency: 145, classical_latency: 98 },
  { time: "16:00", pqc_cpu: 55, classical_cpu: 39, pqc_latency: 132, classical_latency: 90 },
  { time: "20:00", pqc_cpu: 58, classical_cpu: 41, pqc_latency: 140, classical_latency: 95 },
]

const tpsData = [
  { algorithm: "ECDSA", tps: 8500, security: "Classical" },
  { algorithm: "Dilithium", tps: 7200, security: "Post-Quantum" },
  { algorithm: "SPHINCS+", tps: 6800, security: "Post-Quantum" },
  { algorithm: "Hybrid", tps: 7800, security: "Hybrid" },
]

const pqcPerformance = [
  { name: "Dilithium", security: 95, speed: 78, memory: 65, verification: 88 },
  { name: "SPHINCS+", security: 98, speed: 62, memory: 72, verification: 75 },
  { name: "Falcon", security: 92, speed: 85, memory: 58, verification: 90 },
]

const nodeStatus = [
  { id: "Node-01", status: "active", pqc: "Dilithium", validator: true, uptime: "99.8%" },
  { id: "Node-02", status: "active", pqc: "SPHINCS+", validator: true, uptime: "99.7%" },
  { id: "Node-03", status: "active", pqc: "Dilithium", validator: false, uptime: "99.9%" },
  { id: "Node-04", status: "syncing", pqc: "Hybrid", validator: false, uptime: "98.2%" },
]

const CustomTooltip = ({ text, explanation }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
      >
        <Info className="w-3 h-3" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-muted border border-border rounded-sm text-xs font-mono text-foreground whitespace-nowrap z-10 shadow-lg">
          {explanation}
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="border border-border rounded-sm p-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary font-mono">Quantum Resistant Blockchain</h1>
                <p className="text-muted-foreground text-sm mt-2">Post-Quantum Cryptography Network Dashboard</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-colors font-mono text-sm">
                  Live
                </button>
                <button className="px-4 py-2 border border-border text-foreground rounded-sm hover:bg-muted/50 transition-colors font-mono text-sm">
                  Settings
                </button>
              </div>
            </div>

            {/* Network Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-mono">NETWORK STATUS</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-foreground font-mono">Operational</p>
                </div>
                <p className="text-primary font-mono text-sm">Consensus: PoA + PQC</p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-mono">ACTIVE VALIDATORS</p>
                <p className="text-2xl font-bold text-primary font-mono">42</p>
                <p className="text-secondary font-mono text-sm">All PQC-enabled</p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-mono">NETWORK HEALTH</p>
                <p className="text-2xl font-bold text-primary font-mono">98.7%</p>
                <p className="text-green-500 font-mono text-sm">Optimal</p>
              </div>
            </div>
          </div>

          {/* PQC Algorithm Status */}
          <div className="border border-border rounded-sm p-6 bg-card">
            <h2 className="text-xl font-bold text-primary mb-6 font-mono">PQC Algorithm Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CRYSTALS-Dilithium */}
              <div className="border border-border rounded-sm p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-primary font-mono font-bold">CRYSTALS-Dilithium</p>
                    <p className="text-muted-foreground text-xs font-mono">Lattice-based</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-foreground">
                    Active Signatures: <span className="text-primary">12,847</span>
                  </p>
                  <p className="text-foreground flex items-center">
                    Verification Rate: <span className="text-primary">99.2%</span>
                    <CustomTooltip explanation={CALCULATION_EXPLANATIONS.verification_rate} />
                  </p>
                  <p className="text-foreground">
                    Avg Time: <span className="text-primary">2.3ms</span>
                  </p>
                </div>
              </div>

              {/* SPHINCS+ */}
              <div className="border border-border rounded-sm p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-primary font-mono font-bold">SPHINCS+</p>
                    <p className="text-muted-foreground text-xs font-mono">Hash-based</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-foreground">
                    Active Signatures: <span className="text-primary">8,234</span>
                  </p>
                  <p className="text-foreground flex items-center">
                    Verification Rate: <span className="text-primary">98.8%</span>
                    <CustomTooltip explanation={CALCULATION_EXPLANATIONS.verification_rate} />
                  </p>
                  <p className="text-foreground">
                    Avg Time: <span className="text-primary">3.1ms</span>
                  </p>
                </div>
              </div>

              {/* Hybrid Mode */}
              <div className="border border-border rounded-sm p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-primary font-mono font-bold">Hybrid Mode</p>
                    <p className="text-muted-foreground text-xs font-mono">ECDSA + PQC</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-foreground">
                    Active Signatures: <span className="text-primary">5,123</span>
                  </p>
                  <p className="text-foreground flex items-center">
                    Verification Rate: <span className="text-primary">99.5%</span>
                    <CustomTooltip explanation={CALCULATION_EXPLANATIONS.verification_rate} />
                  </p>
                  <p className="text-foreground">
                    Avg Time: <span className="text-primary">2.8ms</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Metrics */}
          <div className="border border-border rounded-sm p-6 bg-card">
            <h2 className="text-xl font-bold text-primary mb-6 font-mono flex items-center">
              Performance Benchmarks
              <CustomTooltip explanation={CALCULATION_EXPLANATIONS.cpu_usage} />
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CPU Usage Comparison */}
              <div className="border border-border rounded-sm p-4 bg-muted/20">
                <p className="text-sm font-mono text-muted-foreground mb-4">CPU Usage (%) - PQC vs Classical</p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={benchmarkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <RechartsTooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333" }} />
                    <Legend />
                    <Line type="monotone" dataKey="pqc_cpu" stroke="#00d9ff" name="PQC" strokeWidth={2} />
                    <Line type="monotone" dataKey="classical_cpu" stroke="#7c3aed" name="Classical" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Latency Comparison */}
              <div className="border border-border rounded-sm p-4 bg-muted/20">
                <p className="text-sm font-mono text-muted-foreground mb-4 flex items-center">
                  Network Latency (ms) - PQC vs Classical
                  <CustomTooltip explanation={CALCULATION_EXPLANATIONS.latency} />
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={benchmarkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <RechartsTooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333" }} />
                    <Legend />
                    <Line type="monotone" dataKey="pqc_latency" stroke="#00d9ff" name="PQC" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="classical_latency"
                      stroke="#7c3aed"
                      name="Classical"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TPS and Algorithm Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TPS Comparison */}
            <div className="border border-border rounded-sm p-6 bg-card">
              <h3 className="text-lg font-bold text-primary mb-4 font-mono flex items-center">
                Transactions Per Second (TPS)
                <CustomTooltip explanation={CALCULATION_EXPLANATIONS.tps} />
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tpsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="algorithm" stroke="#666" />
                  <YAxis stroke="#666" />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333" }} />
                  <Bar dataKey="tps" fill="#00d9ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* PQC Algorithm Radar */}
            <div className="border border-border rounded-sm p-6 bg-card">
              <h3 className="text-lg font-bold text-primary mb-4 font-mono">Algorithm Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={pqcPerformance}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="name" stroke="#666" />
                  <PolarRadiusAxis stroke="#666" />
                  <Radar name="Security" dataKey="security" stroke="#00d9ff" fill="#00d9ff" fillOpacity={0.3} />
                  <Radar name="Speed" dataKey="speed" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333" }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Node Status */}
          <div className="border border-border rounded-sm p-6 bg-card">
            <h2 className="text-xl font-bold text-primary mb-6 font-mono">Node Status & Validators</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Node ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">PQC Algorithm</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Validator</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {nodeStatus.map((node) => (
                    <tr key={node.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 text-foreground">{node.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${node.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                          ></div>
                          <span className="text-foreground capitalize">{node.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-primary">{node.pqc}</td>
                      <td className="py-3 px-4">
                        {node.validator ? (
                          <span className="px-2 py-1 bg-primary/20 border border-primary text-primary rounded-sm text-xs">
                            Validator
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-foreground">{node.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Zero-Knowledge Proofs & Migration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ZKP Status */}
            <div className="border border-border rounded-sm p-6 bg-card">
              <h3 className="text-lg font-bold text-primary mb-4 font-mono flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Zero-Knowledge Proofs
              </h3>
              <div className="space-y-4">
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono">Proofs Generated (24h)</p>
                    <p className="text-primary font-mono font-bold">3,847</p>
                  </div>
                  <div className="w-full bg-muted rounded-sm h-2">
                    <div className="bg-primary h-full rounded-sm" style={{ width: "78%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mt-2">
                    ZKP enables privacy-preserving transactions without revealing transaction details
                  </p>
                </div>
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono">Verification Success Rate</p>
                    <p className="text-green-500 font-mono font-bold">99.8%</p>
                  </div>
                  <div className="w-full bg-muted rounded-sm h-2">
                    <div className="bg-green-500 h-full rounded-sm" style={{ width: "99.8%" }}></div>
                  </div>
                </div>
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono">Privacy Transactions</p>
                    <p className="text-secondary font-mono font-bold">2,134</p>
                  </div>
                  <div className="w-full bg-muted rounded-sm h-2">
                    <div className="bg-secondary h-full rounded-sm" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Migration Status */}
            <div className="border border-border rounded-sm p-6 bg-card">
              <h3 className="text-lg font-bold text-primary mb-4 font-mono flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Key Migration Progress
              </h3>
              <div className="space-y-4">
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono flex items-center">
                      Classical → PQC Migration
                      <CustomTooltip explanation={CALCULATION_EXPLANATIONS.migration_progress} />
                    </p>
                    <p className="text-primary font-mono font-bold">68%</p>
                  </div>
                  <div className="w-full bg-muted rounded-sm h-2">
                    <div className="bg-primary h-full rounded-sm" style={{ width: "68%" }}></div>
                  </div>
                </div>
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono">Hybrid Mode Active</p>
                    <p className="text-secondary font-mono font-bold">32%</p>
                  </div>
                  <div className="w-full bg-muted rounded-sm h-2">
                    <div className="bg-secondary h-full rounded-sm" style={{ width: "32%" }}></div>
                  </div>
                </div>
                <div className="border border-border rounded-sm p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-mono">Keys Rotated</p>
                    <p className="text-green-500 font-mono font-bold">15,847</p>
                  </div>
                  <p className="text-muted-foreground text-xs font-mono mt-2">Est. completion: 2 weeks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border border-border bg-card rounded-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">Avg Block Time</p>
                  <p className="text-2xl font-bold text-primary mt-2 font-mono">12.3s</p>
                </div>
                <Gauge className="w-5 h-5 text-primary" />
              </div>
            </Card>
            <Card className="p-4 border border-border bg-card rounded-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">Avg TPS</p>
                  <p className="text-2xl font-bold text-primary mt-2 font-mono">7,450</p>
                </div>
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </Card>
            <Card className="p-4 border border-border bg-card rounded-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">Memory Usage</p>
                  <p className="text-2xl font-bold text-primary mt-2 font-mono">2.4GB</p>
                </div>
                <Cpu className="w-5 h-5 text-primary" />
              </div>
            </Card>
            <Card className="p-4 border border-border bg-card rounded-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">Total Blocks</p>
                  <p className="text-2xl font-bold text-primary mt-2 font-mono">847,234</p>
                </div>
                <Database className="w-5 h-5 text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
