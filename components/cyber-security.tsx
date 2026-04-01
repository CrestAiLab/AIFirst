"use client"

import { Shield, Lock, Search, Activity } from "lucide-react"
import { CyberSecurityConfig } from "@/lib/sanity/types"

interface CyberSecurityProps {
  config?: CyberSecurityConfig
}

export function CyberSecurity({ config }: CyberSecurityProps) {
  if (!config) return null

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-card/30 scanline" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Enterprise Security</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-neon tracking-tight">
              {config.heading}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {config.description}
            </p>

            <div className="space-y-4 pt-4">
              {config.features?.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                    {idx % 3 === 0 ? <Lock className="w-5 h-5" /> : idx % 3 === 1 ? <Search className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {config.buttonText && (
              <button className="mt-8 group relative flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-black transition-all duration-300 hover:bg-primary/90 shadow-glow hover:shadow-glow-accent">
                <span className="font-bold font-mono tracking-wide">{config.buttonText}</span>
              </button>
            )}
          </div>

          {/* Animation Column */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-2xl border border-border/50 bg-card p-6 shadow-glow-accent overflow-hidden glass-card">
              <div className="absolute top-0 left-0 w-full h-8 bg-black/60 border-b border-border/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-4 text-xs font-mono text-muted-foreground">security-scan.sh</span>
              </div>
              
              <div className="mt-8 space-y-4 font-mono text-sm">
                <div className="flex items-center text-primary overflow-hidden whitespace-nowrap border-r-2 border-primary animate-pulse w-max">
                  &gt; Initializing vulnerability scan...
                </div>
                <div className="text-muted-foreground delay-100 transition-opacity">
                  [OK] Vector DB isolation verified
                </div>
                <div className="text-muted-foreground delay-200 transition-opacity">
                  [OK] Prompt injection firewall active
                </div>
                <div className="text-muted-foreground delay-300 transition-opacity">
                  [OK] Role-based access control synced
                </div>
                <div className="flex items-center text-primary mt-4">
                  &gt; System secure. Awaiting commands.<span className="animate-ping ml-1 w-2 h-4 bg-primary inline-block" />
                </div>
              </div>

              {/* Decorative scan visuals */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
