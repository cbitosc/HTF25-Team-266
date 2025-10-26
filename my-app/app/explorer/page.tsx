"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

const MOCK_BLOCKS = [
  { id: 2847156, txs: 256, miner: "0x7f3a...9e2c", time: "0s ago", pqc: "Dilithium" },
  { id: 2847155, txs: 266, miner: "0x4a2b...1f8d", time: "12s ago", pqc: "SPHINCS+" },
  { id: 2847154, txs: 276, miner: "0x9e2c...7f3a", time: "24s ago", pqc: "Hybrid" },
  { id: 2847153, txs: 286, miner: "0x1f8d...4a2b", time: "36s ago", pqc: "Dilithium" },
  { id: 2847152, txs: 296, miner: "0x7f3a...9e2c", time: "48s ago", pqc: "SPHINCS+" },
]

const MOCK_TRANSACTIONS = [
  {
    hash: "0x7f3a...9e2c",
    from: "0x4a2b...1f8d",
    to: "0x9e2c...7f3a",
    amount: "50.00 QRC",
    status: "Confirmed",
    pqc: "Dilithium",
  },
  {
    hash: "0x4a2b...1f8d",
    from: "0x9e2c...7f3a",
    to: "0x1f8d...4a2b",
    amount: "25.50 QRC",
    status: "Confirmed",
    pqc: "SPHINCS+",
  },
  {
    hash: "0x9e2c...7f3a",
    from: "0x1f8d...4a2b",
    to: "0x7f3a...9e2c",
    amount: "100.00 QRC",
    status: "Confirmed",
    pqc: "Hybrid",
  },
]

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simulate search results
      if (searchQuery.includes("0x")) {
        setSearchResults({
          type: "address",
          data: { address: searchQuery, balance: "1,234.56 QRC", txs: 42 },
        })
      } else if (!isNaN(searchQuery)) {
        setSearchResults({
          type: "block",
          data: { block: searchQuery, txs: 256, miner: "0x7f3a...9e2c" },
        })
      } else {
        setSearchResults({
          type: "transaction",
          data: { hash: searchQuery, status: "Confirmed", amount: "50.00 QRC" },
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground font-mono">Block Explorer</h1>
            <p className="text-muted-foreground mt-2 font-mono text-sm">
              Explore transactions and blocks on the quantum-resistant network
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by block number, transaction hash, or address..."
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-background hover:bg-primary/90 rounded-lg font-mono font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searchResults && (
            <Card className="p-6 border border-border rounded-lg bg-card">
              <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Search Results</h2>
              {searchResults.type === "address" && (
                <div className="space-y-3 font-mono">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Address:</span> {searchResults.data.address}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Balance:</span> {searchResults.data.balance}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Transactions:</span> {searchResults.data.txs}
                  </p>
                </div>
              )}
              {searchResults.type === "block" && (
                <div className="space-y-3 font-mono">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Block:</span> #{searchResults.data.block}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Transactions:</span> {searchResults.data.txs}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Miner:</span> {searchResults.data.miner}
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-mono">Latest Block</p>
              <p className="text-3xl font-bold text-primary mt-2 font-mono">#2,847,156</p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">12 seconds ago</p>
            </Card>
            <Card className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-mono">Total Transactions</p>
              <p className="text-3xl font-bold text-primary mt-2 font-mono">847.2M</p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">All time</p>
            </Card>
            <Card className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-mono">Active Addresses</p>
              <p className="text-3xl font-bold text-primary mt-2 font-mono">2.3M</p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">Last 24 hours</p>
            </Card>
          </div>

          {/* Recent Blocks */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Recent Blocks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Block</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Transactions</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Miner</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">PQC Algorithm</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BLOCKS.map((block) => (
                    <tr key={block.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">#{block.id}</td>
                      <td className="py-3 px-3 text-muted-foreground">{block.txs}</td>
                      <td className="py-3 px-3 text-muted-foreground truncate">{block.miner}</td>
                      <td className="py-3 px-3 text-primary">{block.pqc}</td>
                      <td className="py-3 px-3 text-muted-foreground">{block.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Transaction Hash</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">From</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">To</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">PQC Algorithm</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TRANSACTIONS.map((tx) => (
                    <tr key={tx.hash} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3 text-foreground truncate">{tx.hash}</td>
                      <td className="py-3 px-3 text-muted-foreground truncate">{tx.from}</td>
                      <td className="py-3 px-3 text-muted-foreground truncate">{tx.to}</td>
                      <td className="py-3 px-3 text-foreground">{tx.amount}</td>
                      <td className="py-3 px-3 text-primary">{tx.pqc}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
