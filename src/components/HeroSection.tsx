'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    let t = 0
    let raf: number

    const verts: [number, number, number][] = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1]
    ]
    const edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ]
    const is = 0.42
    const innerVerts: [number,number,number][] = verts.map(v => [v[0]*is, v[1]*is, v[2]*is])

    function project(v: [number,number,number], rx: number, ry: number): [number,number] {
      let x = v[0] * Math.cos(ry) - v[2] * Math.sin(ry)
      const z = v[0] * Math.sin(ry) + v[2] * Math.cos(ry)
      let y = v[1]
      const ny = y * Math.cos(rx) - z * Math.sin(rx)
      const nz = y * Math.sin(rx) + z * Math.cos(rx)
      const fov = 3.5
      const scale = fov / (fov + nz)
      return [W/2 + x * scale * 110, H/2 + ny * scale * 110]
    }

    function drawCube(vs: [number,number,number][], rx: number, ry: number, alpha: number, lw: number) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = '#2DD9B4'
      ctx.lineWidth = lw
      ctx.lineCap = 'round'
      edges.forEach(([a, b]) => {
        const [x1, y1] = project(vs[a], rx, ry)
        const [x2, y2] = project(vs[b], rx, ry)
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      })
      vs.forEach(v => {
        const [px, py] = project(v, rx, ry)
        ctx.beginPath(); ctx.arc(px, py, lw * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = '#2DD9B4'; ctx.globalAlpha = alpha * 0.8; ctx.fill()
      })
      ctx.restore()
    }

    function drawConnectors(ov: [number,number,number][], iv: [number,number,number][], rx: number, ry: number) {
      ctx.save()
      ctx.strokeStyle = 'rgba(45,217,180,0.12)'; ctx.lineWidth = 0.7
      ctx.setLineDash([3, 5])
      for (let i = 0; i < 8; i++) {
        const [x1,y1] = project(ov[i], rx, ry)
        const [x2,y2] = project(iv[i], rx, ry)
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
      }
      ctx.setLineDash([])
      ctx.restore()
    }

    function drawOrbitDots(t: number) {
      const pts = [
        { r: 160, angle: t * 0.3, sz: 1.5 },
        { r: 175, angle: t * 0.3 + 1.2, sz: 1 },
        { r: 145, angle: t * 0.3 + 2.5, sz: 1.8 },
        { r: 185, angle: t * 0.3 + 3.8, sz: 1 },
        { r: 155, angle: t * 0.3 + 5.1, sz: 1.3 },
      ]
      pts.forEach(d => {
        ctx.beginPath()
        ctx.arc(W/2 + Math.cos(d.angle)*d.r, H/2 + Math.sin(d.angle)*d.r, d.sz, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(45,217,180,0.4)'; ctx.fill()
      })
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      drawCube(verts, -0.35, 0.5, 0.55, 1.2)
      drawConnectors(verts, innerVerts, -0.35, 0.5)
      drawCube(innerVerts, -0.35, 0.9, 0.3, 0.8)
      return
    }

    function render() {
      ctx!.clearRect(0, 0, W, H)
      t += 0.006
      const rx = -0.35 + Math.sin(t * 0.4) * 0.05
      const ry = t

      drawOrbitDots(t)
      drawCube(verts, rx, ry, 0.55, 1.2)
      drawConnectors(verts, innerVerts, rx, ry)
      drawCube(innerVerts, rx, ry + 0.4, 0.3, 0.8)

      ctx!.save()
      ctx!.strokeStyle = 'rgba(45,217,180,0.07)'; ctx!.lineWidth = 1
      ctx!.beginPath(); ctx!.ellipse(W/2, H/2, 170, 60, t * 0.3, 0, Math.PI * 2); ctx!.stroke()
      ctx!.restore()

      raf = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-[68px] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(45,217,180,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(45,217,180,.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,217,180,.08) 0%,transparent 70%)' }} />
      <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(88,166,255,.05) 0%,transparent 70%)' }} />

      <div className="max-w-[1160px] mx-auto px-7 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-[80px] items-center">
          {/* Content */}
          <div className="max-w-[620px]">
            <motion.div {...fadeUp(0)} className="mb-6">
              <span className="eyebrow">Engineering Solutions. Real Impact.</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="text-[clamp(2.8rem,6vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--text-1)] mb-6"
            >
              Building Systems<br />
              That Solve<br />
              <span style={{ color: 'var(--accent)' }}>Real Problems.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.24)}
              className="text-[17px] text-[var(--text-2)] leading-[1.7] max-w-[480px] mb-9"
            >
              Craft Your Systems is a student-led technology studio building software systems,
              digital experiences, and custom solutions that create meaningful impact.
            </motion.p>

            <motion.div {...fadeUp(0.36)} className="flex flex-wrap items-center gap-3 mb-10">
              <a href="#projects" className="btn-primary text-[15px] !px-6 !py-3">
                Explore Our Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contact" className="btn-ghost text-[15px] !px-6 !py-3">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.48)} className="flex items-center gap-2.5 text-[13px] text-[var(--text-3)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="5" cy="5" r="2.5" stroke="#484F58" strokeWidth="1.2"/>
                <circle cx="11" cy="5" r="2.5" stroke="#484F58" strokeWidth="1.2"/>
                <path d="M1 13.5c0-2.2 1.8-4 4-4M15 13.5c0-2.2-1.8-4-4-4" stroke="#484F58" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>We&apos;re a student-led team of builders and problem solvers.</span>
            </motion.div>
          </div>

          {/* Cube canvas */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <canvas ref={canvasRef} width={420} height={420} className="w-[420px] h-[420px]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
