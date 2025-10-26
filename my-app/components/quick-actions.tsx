"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Key, Shuffle, Search, Settings } from "lucide-react"

const actions = [
  {
    icon: Key,
    title: "Generate PQ Key",
    description: "Create a new post-quantum keypair with your choice of algorithm",
    href: "/wallet",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shuffle,
    title: "Start Migration",
    description: "Run a dry-run migration to test post-quantum algorithm transitions",
    href: "/migration",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Search,
    title: "Explore Transactions",
    description: "Search and verify transactions with quantum-resistant signatures",
    href: "/explorer",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Settings,
    title: "Configure Consensus",
    description: "Manage post-quantum algorithm parameters and network settings",
    href: "/dashboard",
    color: "bg-accent/10 text-accent",
  },
]

export function QuickActions() {
  return (
    <section className="px-4 py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Quick Actions</h2>
          <p className="text-muted-foreground">Get started with quantum-resistant operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Card className="p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
