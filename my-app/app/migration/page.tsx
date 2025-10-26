"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ArrowRight, AlertCircle } from "lucide-react"

const MIGRATION_STEPS = [
  {
    id: 1,
    title: "Key Generation",
    description: "Generate quantum-resistant keys",
    details: "Creating CRYSTALS-Dilithium and SPHINCS+ key pairs for your wallet",
  },
  {
    id: 2,
    title: "Asset Transfer",
    description: "Transfer assets to PQC-secured addresses",
    details: "Moving 1,234.56 QRC to quantum-resistant wallet addresses",
  },
  {
    id: 3,
    title: "Hybrid Verification",
    description: "Verify with both classical and PQC signatures",
    details: "Testing dual-signature verification (ECDSA + Dilithium) for security",
  },
  {
    id: 4,
    title: "Final Verification",
    description: "Complete migration and activate PQC mode",
    details: "Finalize all transactions and enable full post-quantum security",
  },
]

export default function MigrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [migrationData, setMigrationData] = useState({
    keysGenerated: 0,
    assetsTransferred: 0,
    totalAssets: 1234.56,
    verificationsPassed: 0,
  })

  const handleContinueMigration = () => {
    if (currentStep === 0) {
      // Step 1: Generate Keys
      setMigrationData((prev) => ({
        ...prev,
        keysGenerated: 2,
      }))
      setCurrentStep(1)
    } else if (currentStep === 1) {
      // Step 2: Transfer Assets (simulate progress)
      setMigrationData((prev) => {
        const newTransferred = Math.min(prev.assetsTransferred + 300, prev.totalAssets)
        if (newTransferred >= prev.totalAssets) {
          setCurrentStep(2)
        }
        return {
          ...prev,
          assetsTransferred: newTransferred,
        }
      })
    } else if (currentStep === 2) {
      // Step 3: Hybrid Verification
      setMigrationData((prev) => ({
        ...prev,
        verificationsPassed: 42,
      }))
      setCurrentStep(3)
    } else if (currentStep === 3) {
      // Step 4: Complete
      setCurrentStep(4)
    }
  }

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return "completed"
    if (stepIndex === currentStep) return "in_progress"
    return "pending"
  }

  const transferProgress = (migrationData.assetsTransferred / migrationData.totalAssets) * 100
  const isComplete = currentStep === 4

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-primary font-mono">Migration Wizard</h1>
            <p className="text-muted-foreground mt-2 font-mono text-sm">
              Migrate your assets from classical cryptography to quantum-resistant cryptography
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary font-mono">Migration Progress</h2>
              <span className="text-sm font-mono text-muted-foreground">
                Step {currentStep + 1} of {MIGRATION_STEPS.length}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {MIGRATION_STEPS.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  {/* Step Indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-mono font-bold transition-all ${
                        getStepStatus(index) === "completed"
                          ? "bg-green-500/20 border-green-500 text-green-500"
                          : getStepStatus(index) === "in_progress"
                            ? "bg-primary/20 border-primary text-primary animate-pulse"
                            : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {getStepStatus(index) === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : getStepStatus(index) === "in_progress" ? (
                        <Clock className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    {index < MIGRATION_STEPS.length - 1 && (
                      <div
                        className={`w-1 h-16 mt-2 ${
                          getStepStatus(index) === "completed" ? "bg-green-500" : "bg-border"
                        }`}
                      ></div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-foreground font-mono">{step.title}</p>
                    <p className="text-sm text-muted-foreground font-mono">{step.description}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{step.details}</p>

                    {/* Step-specific content */}
                    {index === 1 && getStepStatus(index) !== "pending" && (
                      <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-foreground">
                            {migrationData.assetsTransferred.toFixed(2)} / {migrationData.totalAssets} QRC
                          </span>
                          <span className="text-xs font-mono text-primary font-bold">
                            {transferProgress.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-lg h-2">
                          <div
                            className="bg-primary h-full rounded-lg transition-all duration-500"
                            style={{ width: `${transferProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Step Details */}
          {!isComplete && (
            <Card className="p-6 border border-border rounded-lg bg-card">
              <h2 className="text-lg font-semibold text-primary mb-4 font-mono">
                Step {currentStep + 1}: {MIGRATION_STEPS[currentStep].title}
              </h2>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <p className="text-foreground font-mono">Generating quantum-resistant key pairs...</p>
                  <div className="p-4 bg-muted/20 rounded-lg border border-border space-y-2 font-mono text-sm">
                    <p className="text-foreground">✓ CRYSTALS-Dilithium keys generated</p>
                    <p className="text-foreground">✓ SPHINCS+ keys generated</p>
                    <p className="text-foreground">✓ Keys securely stored in wallet</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    These keys are resistant to attacks from both classical and quantum computers.
                  </p>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-foreground font-mono">
                    Transferring {migrationData.totalAssets} QRC to PQC-secured addresses...
                  </p>
                  <div className="p-4 bg-muted/20 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-mono text-foreground">Transfer Progress</span>
                      <span className="text-sm font-mono text-primary font-bold">{transferProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-lg h-3">
                      <div
                        className="bg-primary h-full rounded-lg transition-all duration-500"
                        style={{ width: `${transferProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-2">
                      {migrationData.assetsTransferred.toFixed(2)} QRC transferred
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-foreground font-mono">Verifying transactions with hybrid signatures...</p>
                  <div className="p-4 bg-muted/20 rounded-lg border border-border space-y-2 font-mono text-sm">
                    <p className="text-foreground">✓ ECDSA signature verification passed</p>
                    <p className="text-foreground">✓ Dilithium signature verification passed</p>
                    <p className="text-foreground">✓ Dual-signature validation successful</p>
                    <p className="text-foreground">✓ All {migrationData.verificationsPassed} transactions verified</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Hybrid mode ensures security during the transition period by using both classical and post-quantum
                    signatures.
                  </p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 space-y-2 font-mono text-sm">
                    <p className="text-green-500 font-bold">✓ All verifications passed</p>
                    <p className="text-foreground">Ready to finalize migration and activate full PQC mode</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Your wallet is now fully migrated to quantum-resistant cryptography. All future transactions will
                    use PQC algorithms.
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Migration Details */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Migration Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg border border-border font-mono">
                <p className="text-muted-foreground text-sm">Total Assets</p>
                <p className="text-2xl font-bold text-foreground mt-2">{migrationData.totalAssets} QRC</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg border border-border font-mono">
                <p className="text-muted-foreground text-sm">Assets Transferred</p>
                <p className="text-2xl font-bold text-primary mt-2">{migrationData.assetsTransferred.toFixed(2)} QRC</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg border border-border font-mono">
                <p className="text-muted-foreground text-sm">Keys Generated</p>
                <p className="text-2xl font-bold text-foreground mt-2">{migrationData.keysGenerated}</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg border border-border font-mono">
                <p className="text-muted-foreground text-sm">Verifications Passed</p>
                <p className="text-2xl font-bold text-green-500 mt-2">{migrationData.verificationsPassed}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleContinueMigration}
              disabled={isComplete}
              className="flex-1 h-12 bg-primary text-background hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-mono border-0 flex items-center justify-center gap-2"
            >
              {isComplete ? "Migration Complete ✓" : "Continue Migration"}
              {!isComplete && <ArrowRight className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 bg-transparent border border-border text-foreground hover:bg-muted/50 rounded-lg font-mono"
            >
              View Details
            </Button>
          </div>

          {/* FAQ */}
          <Card className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-semibold text-primary mb-4 font-mono">Migration FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground mb-2 font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Why migrate to quantum-resistant cryptography?
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Quantum computers pose a threat to current cryptographic systems. Migrating now ensures your assets
                  remain secure in the quantum era. Post-quantum cryptography is resistant to attacks from both
                  classical and quantum computers.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2 font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Is my data safe during migration?
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Yes. All transfers use end-to-end encryption and are verified on-chain with both classical and PQC
                  signatures. Your private keys never leave your device.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2 font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  What is Hybrid Mode?
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Hybrid Mode uses both ECDSA (classical) and Dilithium (post-quantum) signatures simultaneously. This
                  provides security against both current and future quantum threats during the transition period.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
