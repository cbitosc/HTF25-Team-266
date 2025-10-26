"use client"

import { Card } from "@/components/ui/card"
import { Activity, Zap, Shield, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Network Status",
    value: "98.7%",
    description: "Nodes online",
    icon: Activity,
    color: "text-primary",
  },
  {
    label: "Avg Latency",
    value: "245ms",
    description: "Network latency",
    icon: Zap,
    color: "text-accent",
  },
  {
    label: "Security Level",
    value: "NIST L5",
    description: "Post-quantum secure",
    icon: Shield,
    color: "text-primary",
  },
  {
    label: "TPS",
    value: "1,240",
    description: "Transactions/second",
    icon: TrendingUp,
    color: "text-accent",
  },
]

export function Dashboard() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Network Overview</h2>
          <p className="text-muted-foreground">Real-time metrics and system status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`${stat.color} opacity-60`} size={24} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Algorithm Status */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">Active Algorithms</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Kyber-1024", status: "Active", adoption: "85%" },
              { name: "SPHINCS+", status: "Active", adoption: "60%" },
              { name: "Dilithium", status: "Staging", adoption: "15%" },
            ].map((algo) => (
              <Card key={algo.name} className="p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{algo.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      algo.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {algo.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Adoption</span>
                    <span className="font-medium text-foreground">{algo.adoption}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: algo.adoption }}></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
