import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Dashboard } from "@/components/dashboard"
import { QuickActions } from "@/components/quick-actions"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Dashboard />
        <QuickActions />
      </main>
      <Footer />
    </div>
  )
}
