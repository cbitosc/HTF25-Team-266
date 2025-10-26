import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { BookOpen, Code, Shield, Zap } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentation</h1>
            <p className="text-muted-foreground mt-2">Learn how to use the quantum-resistant blockchain platform</p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <BookOpen className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Learn the basics and set up your wallet</p>
            </Card>
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <Code className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground">Integrate with our REST and WebSocket APIs</p>
            </Card>
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <Shield className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">Understand quantum-resistant cryptography</p>
            </Card>
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <Zap className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Advanced</h3>
              <p className="text-sm text-muted-foreground">Deep dive into protocol specifications</p>
            </Card>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Getting Started</h2>
              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-medium text-foreground">1. Create Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate quantum-resistant keys using ML-KEM and ML-DSA algorithms
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-medium text-foreground">2. Secure Your Keys</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Back up your keys using encrypted storage and WebAuthn
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-medium text-foreground">3. Start Transacting</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send and receive assets with quantum-safe signatures
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quantum-Resistant Algorithms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground">ML-KEM (Kyber)</h3>
                  <p className="text-sm text-muted-foreground">
                    Key encapsulation mechanism for secure key exchange. Provides 256-bit security against quantum
                    attacks.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">ML-DSA (Dilithium)</h3>
                  <p className="text-sm text-muted-foreground">
                    Digital signature algorithm for transaction signing. Resistant to quantum computing threats.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">SLH-DSA (SPHINCS+)</h3>
                  <p className="text-sm text-muted-foreground">
                    Stateless hash-based signatures for additional security layers and hybrid signing modes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">API Endpoints</h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 bg-secondary rounded">
                  <p className="text-primary">GET /api/blocks</p>
                  <p className="text-muted-foreground">Retrieve recent blocks</p>
                </div>
                <div className="p-3 bg-secondary rounded">
                  <p className="text-primary">POST /api/transactions</p>
                  <p className="text-muted-foreground">Submit a new transaction</p>
                </div>
                <div className="p-3 bg-secondary rounded">
                  <p className="text-primary">GET /api/wallet/:address</p>
                  <p className="text-muted-foreground">Get wallet balance and details</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
