"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Copy, CheckCircle, Eye, EyeOff, Send, Download } from "lucide-react"

const PQC_ALGORITHMS = [
  {
    id: "dilithium",
    name: "CRYSTALS-Dilithium",
    description: "NIST standardized lattice-based signature",
    security: "NIST Level 5",
    keySize: "2.7 KB",
    sigSize: "3.3 KB",
    speed: "Fast",
    recommended: true,
  },
  {
    id: "sphincs",
    name: "SPHINCS+",
    description: "Hash-based signature scheme",
    security: "NIST Level 5",
    keySize: "64 B",
    sigSize: "17 KB",
    speed: "Moderate",
    recommended: false,
  },
  {
    id: "falcon",
    name: "Falcon",
    description: "Fast lattice-based signature",
    security: "NIST Level 1",
    keySize: "897 B",
    sigSize: "666 B",
    speed: "Very Fast",
    recommended: false,
  },
  {
    id: "kyber",
    name: "ML-KEM (Kyber)",
    description: "Key encapsulation mechanism",
    security: "NIST Level 3",
    keySize: "1.5 KB",
    sigSize: "1.0 KB",
    speed: "Fast",
    recommended: false,
  },
  {
    id: "hybrid",
    name: "Hybrid Mode",
    description: "ECDSA + Dilithium (transition)",
    security: "NIST Level 5",
    keySize: "3.2 KB",
    sigSize: "4.3 KB",
    speed: "Moderate",
    recommended: false,
  },
]

export default function WalletPage() {
  const [selectedAlgo, setSelectedAlgo] = useState("dilithium")
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentAlgo = PQC_ALGORITHMS.find((a) => a.id === selectedAlgo)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-primary font-mono">Quantum-Safe Wallet</h1>
            <p className="text-muted-foreground mt-2 font-mono text-sm">
              Post-quantum cryptography key management - Choose your algorithm and manage your keys securely
            </p>
          </div>

          {/* Wallet Balance Card - Real World Style */}
          <Card className="p-8 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 border rounded-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Total Balance</p>
                  <p className="text-5xl font-bold text-foreground font-mono mt-2">1,234.56 QRC</p>
                  <p className="text-sm text-muted-foreground font-mono mt-2">≈ $12,345.60 USD</p>
                </div>
                <Lock className="w-12 h-12 text-primary opacity-20" />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary text-background hover:bg-primary/90 rounded-lg font-mono border-0">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent border border-primary/50 text-foreground hover:bg-primary/10 rounded-lg font-mono"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receive
                </Button>
              </div>
            </div>
          </Card>

          {/* Algorithm Selection - Simplified */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold text-primary mb-2 font-mono">Select PQC Algorithm</h2>
            <p className="text-sm text-muted-foreground font-mono mb-6">
              Choose your post-quantum cryptography algorithm. Each has different trade-offs between security, speed,
              and key size.
            </p>

            {/* Algorithm Grid - Simplified */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {PQC_ALGORITHMS.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgo(algo.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-mono ${
                    selectedAlgo === algo.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/20 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-sm text-foreground">{algo.name}</p>
                    {algo.recommended && (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Recommended</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{algo.description}</p>
                  <div className="space-y-1 text-xs">
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Speed:</span> {algo.speed}
                    </p>
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Security:</span> {algo.security}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Current Selection Details */}
            <div className="p-4 border border-primary/30 rounded-lg bg-primary/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-primary font-mono font-bold">{currentAlgo?.name}</p>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-foreground font-mono mb-4">{currentAlgo?.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <p className="text-muted-foreground">Security Level</p>
                  <p className="text-primary font-bold mt-1">{currentAlgo?.security}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Key Size</p>
                  <p className="text-primary font-bold mt-1">{currentAlgo?.keySize}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Signature Size</p>
                  <p className="text-primary font-bold mt-1">{currentAlgo?.sigSize}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Speed</p>
                  <p className="text-primary font-bold mt-1">{currentAlgo?.speed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Management - Real World Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Key */}
            <Card className="p-6 border border-border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary font-mono">Primary Key</h3>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-medium rounded-lg font-mono">
                  Active
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono mb-4">Algorithm: {currentAlgo?.name}</p>

              {/* Address Display */}
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">Public Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-foreground font-mono flex-1 break-all">0x7f3a9e2c...9e2c</code>
                  <button onClick={handleCopy} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Private Key Display */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-mono">Private Key</p>
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    {showPrivateKey ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <code className="text-sm text-foreground font-mono break-all">
                  {showPrivateKey ? "0x4a2b1f8d...1f8d" : "••••••••••••••••••••••••"}
                </code>
              </div>

              <p className="text-xs text-muted-foreground font-mono mt-4">
                ⚠️ Never share your private key. Keep it secure and backed up.
              </p>
            </Card>

            {/* Backup Key */}
            <Card className="p-6 border border-border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary font-mono">Backup Key</h3>
                <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-medium rounded-lg font-mono">
                  Hybrid Mode
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono mb-4">Algorithm: ECDSA + Dilithium</p>

              {/* Address Display */}
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">Public Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-foreground font-mono flex-1 break-all">0x4a2b1f8d...1f8d</code>
                  <button onClick={handleCopy} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">Private Key</p>
                <code className="text-sm text-foreground font-mono break-all">••••••••••••••••••••••••</code>
              </div>

              <p className="text-xs text-muted-foreground font-mono mt-4">
                For backward compatibility during migration to PQC
              </p>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Recent Transactions</h2>
            <div className="space-y-3">
              {[
                { id: 1, type: "Received", amount: "+50.00 QRC", time: "2 hours ago", status: "Confirmed" },
                { id: 2, type: "Sent", amount: "-25.50 QRC", time: "5 hours ago", status: "Confirmed" },
                { id: 3, type: "Received", amount: "+100.00 QRC", time: "1 day ago", status: "Confirmed" },
              ].map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground font-mono">{tx.type}</p>
                    <p className="text-sm text-muted-foreground font-mono">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium font-mono ${tx.type === "Received" ? "text-green-500" : "text-foreground"}`}
                    >
                      {tx.amount}
                    </p>
                    <p className="text-xs text-green-500 font-mono">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
