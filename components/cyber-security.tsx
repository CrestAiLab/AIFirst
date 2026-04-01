"use client"

import { Shield, Lock, Search, Activity } from "lucide-react"
import { CyberSecurityConfig } from "@/lib/sanity/types"
import Image from "next/image"

interface CyberSecurityProps {
  config?: CyberSecurityConfig
}

export function CyberSecurity({ config }: CyberSecurityProps) {
  if (!config) return null

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 bg-background" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.02)_0%,transparent_70%)] rounded-full blur-[80px] -translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80 mb-4 backdrop-blur-sm cursor-default transition-colors hover:bg-foreground/10">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono tracking-[0.15em] uppercase">Enterprise Security</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground tracking-tight leading-[1.1]">
              {config.heading}
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-xl font-light leading-relaxed">
              {config.description}
            </p>

            <div className="space-y-8 pt-8 border-t border-foreground/5">
              {config.features?.map((feature, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="mt-1 p-3 rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground/60 transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground shadow-sm">
                    {idx % 3 === 0 ? <Lock className="w-5 h-5" /> : idx % 3 === 1 ? <Search className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-foreground mb-1 tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground/80 text-base font-light leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {config.buttonText && (
              <div className="pt-6">
                <button className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-foreground px-10 text-background transition-all hover:bg-foreground/90 hover:scale-[1.02] shadow-xl">
                  <span className="font-medium text-base tracking-wide flex items-center gap-2">
                    {config.buttonText}
                    <Shield className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Animation Column (Terminal) */}
          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center -z-10 mix-blend-screen opacity-10 pointer-events-none">
              <Image 
                src="/assets/cyber_security_shield.png"
                alt="Cyber Security Shield"
                width={600}
                height={600}
                className="object-contain"
              />
            </div>
            
            <div className="relative w-full rounded-2xl border border-white/10 bg-[#0A0A0A] p-1 shadow-2xl overflow-hidden glass-card">
              <div className="rounded-xl overflow-hidden bg-black/80 backdrop-blur-2xl h-[450px] flex flex-col">
                {/* Terminal Header */}
                <div className="flex items-center px-4 h-12 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
                  </div>
                  <div className="mx-auto -ml-8 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-white/30" />
                    <span className="text-xs font-mono text-white/30">user@infrastructure:~</span>
                  </div>
                </div>
                
                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm relative flex-1 flex flex-col">
                  <div className="flex items-center text-white/60 overflow-hidden whitespace-nowrap border-r-[1px] border-white/60 animate-[pulse_1s_infinite] w-max mb-6">
                    $ ./security-scan.sh --deep
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="text-white/40 delay-100 transition-opacity flex items-center gap-3">
                      <span className="text-white/80">✓</span> Vector DB isolation verified
                    </div>
                    <div className="text-white/40 delay-200 transition-opacity flex items-center gap-3">
                      <span className="text-white/80">✓</span> Prompt injection firewall active
                    </div>
                    <div className="text-white/40 delay-300 transition-opacity flex items-center gap-3">
                      <span className="text-white/80">✓</span> Role-based access control synced
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 flex flex-col gap-2">
                    <div className="h-px w-full bg-white/5 mb-2" />
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>SCAN_COMPLETE</span>
                      <span>0 VULNERABILITIES</span>
                    </div>
                    <div className="flex items-center text-white/80 font-medium">
                      $ System secure. Awaiting inputs.<span className="animate-[ping_1.5s_infinite] ml-1 w-2 h-4 bg-white/80 inline-block" />
                    </div>
                  </div>
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[length:100%_4px] pointer-events-none opacity-20 mask-image-[linear-gradient(to_bottom,black,transparent)]" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
