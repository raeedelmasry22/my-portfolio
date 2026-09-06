import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import logoSrc from '@/imports/5be9a558-7a91-4a2e-888c-efb446ccc15f.png'
import photoSrc from '@/imports/1ae852fd-2288-4e35-a757-414a1d7efedd.png'
import ProjectDetail from './ProjectDetail'
import { ALL_PROJECTS, FILTERS, type AnyProject } from './data/projects'

// ─── Reveal Hook ──────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`section-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2A82FF', fontSize: '11px', letterSpacing: '0.12em' }}>{num}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#636380', fontSize: '11px', letterSpacing: '0.14em' }}>{label.toUpperCase()}</span>
    </div>
  )
}

function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>
}

function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <img
      src={logoSrc}
      alt="Raeed Youssef"
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  )
}

// ─── Hero Portrait ────────────────────────────────────────────────────────────

function HeroPortrait() {
  return (
    <div
      className="relative flex justify-center lg:justify-end select-none hero-viz"
      style={{ minHeight: '480px' }}
    >
      {/* Ambient blue-purple glow — sits behind portrait, tints the dark bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '340px',
          height: '420px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(42,130,255,0.09) 0%, rgba(123,94,250,0.05) 55%, transparent 80%)',
          filter: 'blur(36px)',
        }}
      />

      {/* Portrait column */}
      <div className="relative" style={{ width: '310px', maxWidth: '100%' }}>

        {/* Top-left L-bracket */}
        <svg
          viewBox="0 0 40 40"
          width="40"
          height="40"
          fill="none"
          aria-hidden="true"
          style={{ position: 'absolute', top: -10, left: -10, zIndex: 4 }}
        >
          <path d="M40 2 L2 2 L2 40" stroke="#2A82FF" strokeWidth="1.6" opacity="0.65" strokeLinecap="round" />
          <circle cx="2" cy="2" r="2" fill="#2A82FF" opacity="0.55" />
        </svg>

        {/* Top-right L-bracket */}
        <svg
          viewBox="0 0 40 40"
          width="40"
          height="40"
          fill="none"
          aria-hidden="true"
          style={{ position: 'absolute', top: -10, right: -10, zIndex: 4 }}
        >
          <path d="M0 2 L38 2 L38 40" stroke="#2A82FF" strokeWidth="1.6" opacity="0.45" strokeLinecap="round" />
          <circle cx="38" cy="2" r="2" fill="#2A82FF" opacity="0.4" />
        </svg>

        {/* Thin left side rule */}
        <div
          style={{
            position: 'absolute',
            left: -22,
            top: '8%',
            width: '1px',
            height: '55%',
            background: 'linear-gradient(to bottom, transparent, rgba(42,130,255,0.35) 30%, rgba(42,130,255,0.35) 70%, transparent)',
            zIndex: 4,
          }}
        />

        {/* Dot grid — top right exterior */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: -36,
            zIndex: 4,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 6px)',
            gap: '5px',
          }}
          aria-hidden="true"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 2.5,
                height: 2.5,
                borderRadius: '50%',
                background: '#2A82FF',
                opacity: 0.1 + (i % 4) * 0.05,
              }}
            />
          ))}
        </div>

        {/* Photo — natural dark edges blend into site bg */}
        <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden', borderRadius: '2px' }}>
          <img
            src={photoSrc}
            alt="Raeed Youssef — AI Student & UI/UX Designer"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />

          {/* Bottom gradient — fully dissolves photo into page bg */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(to top, #07090F 0%, rgba(7,9,15,0.82) 35%, rgba(7,9,15,0.3) 65%, transparent 100%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Left edge vignette — softens portrait into the grid gap */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '15%',
              background: 'linear-gradient(to right, rgba(7,9,15,0.45), transparent)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Floating status badge — bottom-left, overlaps photo/bg boundary */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: -12,
            zIndex: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px 8px 10px',
            background: 'rgba(7,9,15,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(42,130,255,0.22)',
            borderRadius: '8px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22C55E',
              animation: 'status-blink 2.5s ease-in-out infinite',
              flexShrink: 0,
              display: 'block',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#9696B0',
              letterSpacing: '0.09em',
              whiteSpace: 'nowrap',
            }}
          >
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Scan-line accent — thin horizontal rule above status badge */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 100,
            width: '60%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(42,130,255,0.28) 40%, rgba(56,200,255,0.18) 100%)',
            zIndex: 4,
          }}
          aria-hidden="true"
        />

        {/* Bottom-right corner tick */}
        <svg
          viewBox="0 0 28 28"
          width="28"
          height="28"
          fill="none"
          aria-hidden="true"
          style={{ position: 'absolute', bottom: -6, right: -6, zIndex: 4, opacity: 0.35 }}
        >
          <path d="M0 28 L28 28 L28 0" stroke="#38C8FF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

// ─── Project Thumbnails ────────────────────────────────────────────────────────

function ProjectThumb({ project }: { project: AnyProject }) {
  const c = project.color

  // UX projects with a real screenshot: show it as cover image
  if (project.type === 'ux') {
    return (
      <div
        className="card-thumb relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#07090F' }}
      >
        <img
          src={project.screenshotSrc}
          alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(7,9,15,0.75) 100%)' }} />
      </div>
    )
  }

  // AI projects: keep the abstract SVG patterns
  const patterns: Record<string, ReactNode> = {
    cv: (
      <svg viewBox="0 0 240 160" className="w-full h-full">
        <circle cx="120" cy="80" r="44" stroke={c} strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="120" cy="80" r="28" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3" />
        <circle cx="120" cy="80" r="9" fill={c} opacity="0.5" />
        <line x1="38" y1="80" x2="85" y2="80" stroke={c} strokeWidth="0.8" opacity="0.3" />
        <line x1="155" y1="80" x2="202" y2="80" stroke={c} strokeWidth="0.8" opacity="0.3" />
        <line x1="120" y1="12" x2="120" y2="48" stroke={c} strokeWidth="0.8" opacity="0.3" />
        <line x1="120" y1="112" x2="120" y2="148" stroke={c} strokeWidth="0.8" opacity="0.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <circle key={i} cx={120 + 58 * Math.cos(a * Math.PI / 180)} cy={80 + 58 * Math.sin(a * Math.PI / 180)} r="2.5" fill={c} opacity="0.35" />
        ))}
      </svg>
    ),
    dl: (
      <svg viewBox="0 0 240 160" className="w-full h-full">
        {[0, 1, 2, 3].flatMap(layer =>
          [0, 1, 2].flatMap(node => {
            const nx = 36 + layer * 55
            const ny = 34 + node * 46
            const lines = layer < 3
              ? [0, 1, 2].map(next => (
                <line key={`e-${layer}-${node}-${next}`} x1={nx} y1={ny} x2={36 + (layer + 1) * 55} y2={34 + next * 46} stroke={c} strokeWidth="0.5" opacity="0.18" />
              ))
              : []
            return [...lines, <circle key={`n-${layer}-${node}`} cx={nx} cy={ny} r="8" stroke={c} strokeWidth="0.9" fill={c} fillOpacity="0.12" opacity="0.75" />]
          })
        )}
      </svg>
    ),
    data: (
      <svg viewBox="0 0 240 160" className="w-full h-full">
        {[0.82, 0.55, 0.92, 0.42, 0.70, 0.60, 0.78].map((h, i) => (
          <rect key={i} x={18 + i * 30} y={148 - h * 118} width="20" height={h * 118} fill={c} opacity={0.18 + i * 0.03} rx="2" />
        ))}
        <polyline points="28,72 58,98 88,48 118,112 148,56 178,76 208,38" stroke={c} strokeWidth="1.5" fill="none" opacity="0.55" />
        {[28, 58, 88, 118, 148, 178, 208].map((x, i) => {
          const ys = [72, 98, 48, 112, 56, 76, 38]
          return <circle key={i} cx={x} cy={ys[i]} r="3" fill={c} opacity="0.7" />
        })}
      </svg>
    ),
    cv2: (
      <svg viewBox="0 0 240 160" className="w-full h-full">
        <rect x="52" y="38" width="80" height="64" stroke={c} strokeWidth="1.2" fill="none" opacity="0.55" rx="2" />
        <rect x="138" y="54" width="54" height="42" stroke={c} strokeWidth="1" fill="none" opacity="0.4" rx="2" />
        <rect x="24" y="62" width="34" height="28" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3" rx="2" />
        <rect x="58" y="45" width="66" height="18" stroke={c} strokeWidth="0.7" fill="none" opacity="0.35" />
        <text x="60" y="57" fontSize="7" fill={c} opacity="0.65" fontFamily="monospace">person 0.94</text>
        <rect x="144" y="61" width="42" height="12" stroke={c} strokeWidth="0.6" fill="none" opacity="0.3" />
        <text x="146" y="71" fontSize="6.5" fill={c} opacity="0.5" fontFamily="monospace">car 0.87</text>
      </svg>
    ),
  }

  return (
    <div
      className="card-thumb relative w-full overflow-hidden"
      style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, rgba(42,130,255,0.10) 0%, rgba(11,13,26,0.98) 100%)`,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {patterns[project.patternType] ?? patterns.data}
      </div>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({
  scrolled, activeSection, menuOpen, setMenuOpen, onLogoClick,
}: {
  scrolled: boolean
  activeSection: string
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  onLogoClick: () => void
}) {
  const links = ['About', 'Projects', 'Skills', 'Experience', 'Contact']
  return (
    <header
      className="modern-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,9,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-[70px]">
          <button onClick={onLogoClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <LogoMark size={52} />
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link text-sm font-medium ${activeSection === l.toLowerCase() ? 'active' : ''}`} style={{ color: activeSection === l.toLowerCase() ? '#E8E8F2' : '#636380', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-primary hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: '#2A82FF', color: '#fff', textDecoration: 'none', fontSize: '13px' }}>
              {"Let's Work Together"}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-px transition-all duration-300" style={{ background: '#E8E8F2', transformOrigin: 'center', transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }} />
              <span className="block h-px transition-all duration-300" style={{ background: '#E8E8F2', width: menuOpen ? '20px' : '12px', opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-px transition-all duration-300" style={{ background: '#E8E8F2', transformOrigin: 'center', transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </Container>
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? '340px' : '0',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(7,9,15,0.97)',
          backdropFilter: 'blur(14px)',
          borderTop: menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'max-height 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease',
        }}
      >
        <Container className="py-6">
          <div className="flex flex-col gap-5">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-base font-medium" style={{ color: '#9696B0', textDecoration: 'none' }}>{l}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary inline-flex justify-center px-5 py-3 rounded-full text-sm font-semibold mt-1" style={{ background: '#2A82FF', color: '#fff', textDecoration: 'none' }}>
              {"Let's Work Together"}
            </a>
          </div>
        </Container>
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: '#07090F' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(42,130,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42,130,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '68px 68px',
          mask: 'radial-gradient(ellipse 85% 85% at 50% 45%, black 30%, transparent 78%)',
        }}
      />
      <Container className="relative z-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="hero-copy">
            <div className="hero-badge inline-flex items-center gap-2 mb-8">
              <div
                className="px-3 py-1.5 rounded-full flex items-center gap-2 text-xs"
                style={{ border: '1px solid rgba(42,130,255,0.25)', background: 'rgba(42,130,255,0.06)', fontFamily: "'JetBrains Mono', monospace", color: '#9696B0', letterSpacing: '0.06em' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'status-blink 2.5s ease-in-out infinite' }} />
                Open to opportunities
              </div>
            </div>
            <h1 className="hero-headline text-5xl md:text-6xl xl:text-7xl leading-[1.02] mb-6 font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
              Building{' '}<span className="text-gradient-blue">Intelligent</span><br />Products with<br />AI & Design.
            </h1>
            <p className="hero-sub text-base md:text-lg leading-relaxed mb-10 max-w-xl" style={{ color: '#636380' }}>
              {"I'm Raeed Youssef, a fourth-year Artificial Intelligence student at Zagazig University, exploring AI, machine learning, computer vision, and UI/UX design."}
            </p>
            <div className="hero-ctas flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm" style={{ background: '#2A82FF', color: '#fff', textDecoration: 'none' }}>
                View My Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="#contact" className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9696B0', textDecoration: 'none' }}>
                Get In Touch
              </a>
            </div>
            <div className="mt-14 flex items-center gap-3" style={{ color: '#636380', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em' }}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, transparent, rgba(42,130,255,0.7))' }} />
                <div className="w-1 h-1 rounded-full" style={{ background: '#2A82FF' }} />
              </div>
              SCROLL TO EXPLORE
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroPortrait />
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const cards = [
    { label: 'Education', lines: ['Zagazig University', 'Computers & Information — AI'], color: '#2A82FF' },
    { label: 'Focus', lines: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision'], color: '#38C8FF' },
    { label: 'Design', lines: ['UI/UX Design', 'Digital Product Design'], color: '#7B5EFA' },
  ]
  return (
    <section id="about" className="section-shell py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel num="01" label="About" />
              <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-8" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
                AI, Design &<br /><span className="text-gradient-blue">Curiosity.</span>
              </h2>
              {/* Compact portrait */}
              <div className="relative inline-block">
                {/* Blue corner accent */}
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"
                  style={{ position: 'absolute', top: -6, left: -6, zIndex: 3 }}>
                  <path d="M20 2 L2 2 L2 20" stroke="#2A82FF" strokeWidth="1.5" opacity="0.65" strokeLinecap="round" />
                </svg>
                <div style={{ width: 148, height: 170, overflow: 'hidden', borderRadius: '3px', position: 'relative', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img
                    src={photoSrc}
                    alt="Raeed Youssef"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 8%', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,13,26,0.55) 0%, transparent 55%)', zIndex: 2 }} />
                </div>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"
                  style={{ position: 'absolute', bottom: -5, right: -5, zIndex: 3, opacity: 0.38 }}>
                  <path d="M0 14 L14 14 L14 0" stroke="#38C8FF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: '#9696B0' }}>
                {"I'm a fourth-year AI student who enjoys combining technical problem solving with digital product design. Right now I'm building a foundation in machine learning, computer vision, and data analysis — while exploring how intelligent systems can be shaped into useful, well-designed experiences."}
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {cards.map((card, i) => (
                <Reveal key={card.label} delay={150 + i * 80}>
                  <div className="info-card p-5 rounded-xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: card.color }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: card.color, fontSize: '10px', letterSpacing: '0.1em' }}>{card.label.toUpperCase()}</span>
                    </div>
                    {card.lines.map((line, j) => (
                      <div key={j} className="text-sm leading-snug mb-1" style={{ color: j === 0 ? '#E8E8F2' : '#636380' }}>{line}</div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectGrid({ projects, onProjectClick }: { projects: AnyProject[]; onProjectClick: (slug: string) => void }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 55}>
          <button
            onClick={() => onProjectClick(project.slug)}
            className="project-card card-hover rounded-xl overflow-hidden flex flex-col cursor-pointer h-full text-left w-full"
            style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', padding: 0 }}
          >
            <ProjectThumb project={project} />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: project.color, letterSpacing: '0.08em' }}>
                  {project.category.toUpperCase()}
                </span>
                {project.type === 'ux' && project.demoUrl && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#22C55E', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>LIVE</span>
                )}
              </div>
              <div className="flex items-start gap-2.5 mb-3">
                <span className="text-xs mt-0.5 shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2A2A3C' }}>{project.id}</span>
                <h3 className="text-[15px] font-semibold leading-snug" style={{ color: '#E8E8F2' }}>{project.title}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#636380' }}>{project.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#636380', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.03em' }}>{t}</span>
                  ))}
                </div>
                <span className="text-xs shrink-0 ml-2 flex items-center gap-1" style={{ color: '#2A82FF', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                  View
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  )
}

function Projects({ onProjectClick }: { onProjectClick: (slug: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.filters.includes(activeFilter))
  const featured = filtered.filter((project) => project.type === 'ux')
  const aiProjects = filtered.filter((project) => project.type === 'ai')

  return (
    <section id="projects" className="section-shell projects-section py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0A0B14' }}>
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <Reveal>
            <div>
              <SectionLabel num="02" label="Projects" />
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-3 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
                Selected Projects
              </h2>
              <p className="text-sm" style={{ color: '#636380', maxWidth: '420px', lineHeight: 1.65 }}>
                Academic AI projects and UI/UX design concepts. Click any card to view the full case study.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div
              className="flex gap-1 p-1 rounded-xl self-start md:self-auto overflow-x-auto"
              style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', maxWidth: '100%' }}
            >
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="filter-btn px-3 py-2 rounded-lg text-xs font-semibold shrink-0"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: activeFilter === f ? '#2A82FF' : 'transparent',
                    color: activeFilter === f ? '#fff' : '#636380',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    transition: 'background-color 0.2s, color 0.2s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {featured.length > 0 && (
          <div>
            <h3 className="project-group-title text-lg font-semibold mb-5" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>Featured Work</h3>
            <ProjectGrid projects={featured} onProjectClick={onProjectClick} />
          </div>
        )}

        {aiProjects.length > 0 && (
          <div className={featured.length > 0 ? 'mt-16' : ''}>
            <h3 className="project-group-title technical-title text-lg font-semibold mb-5" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>AI &amp; Machine Learning</h3>
            <ProjectGrid projects={aiProjects} onProjectClick={onProjectClick} />
          </div>
        )}
      </Container>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

const SKILLS: Record<string, { tags: string[]; color: string }> = {
  'AI & Machine Learning': { tags: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'TensorFlow', 'Scikit-learn', 'OpenCV'], color: '#2A82FF' },
  'Data': { tags: ['Pandas', 'NumPy', 'Data Analysis'], color: '#38C8FF' },
  'Design': { tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'], color: '#7B5EFA' },
  'Development': { tags: ['HTML', 'CSS', 'JavaScript', 'Git / GitHub'], color: '#4DA8FF' },
}

function Skills() {
  return (
    <section id="skills" className="section-shell py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel num="03" label="Skills" />
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
                Tools & <span className="text-gradient-blue">Tech</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {Object.entries(SKILLS).map(([category, { tags, color }], i) => (
              <Reveal key={category} delay={i * 75}>
                <div className="skill-cluster p-6 rounded-xl h-full" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color, fontSize: '10px', letterSpacing: '0.1em' }}>{category.toUpperCase()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="skill-tag text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9696B0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.03em', cursor: 'default' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const entries = [
    { period: '2023 — Present', title: 'Computers & Information — Artificial Intelligence', org: 'Zagazig University', desc: 'Currently in my fourth year, building a foundation in AI, machine learning, computer vision, data analysis, and software development.', active: true },
    { period: '2024 — Present', title: 'Academic AI Projects', org: 'University Coursework', desc: 'Developing ML models, computer vision pipelines, and data analysis projects as part of coursework and personal learning.', active: false },
    { period: '2024 — Present', title: 'UI/UX Design Projects', org: 'Self-directed', desc: 'Studying and practising UI/UX design through Figma, analysing product patterns, and working on personal digital product concepts.', active: false },
    { period: '2023 — Present', title: 'Personal Learning & Experiments', org: 'Independent', desc: 'Exploring AI tools, building small Python projects, and keeping up with developments in machine learning and computer vision.', active: false },
  ]
  return (
    <section id="experience" className="section-shell py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0A0B14' }}>
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel num="04" label="Experience" />
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
                My <span className="text-gradient-blue">Journey</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(to bottom, rgba(42,130,255,0.6), rgba(42,130,255,0.06))' }} />
              <div className="flex flex-col gap-7 pl-8">
                {entries.map((entry, i) => (
                  <Reveal key={i} delay={i * 75}>
                    <div className="relative">
                      <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full" style={{ background: entry.active ? '#2A82FF' : 'rgba(42,130,255,0.2)', border: `2px solid ${entry.active ? 'rgba(42,130,255,0.45)' : 'rgba(42,130,255,0.1)'}`, boxShadow: entry.active ? '0 0 14px rgba(42,130,255,0.55)' : 'none' }} />
                      <div className="timeline-card p-6 rounded-xl" style={{ background: '#0B0D1A', border: entry.active ? '1px solid rgba(42,130,255,0.2)' : '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2A82FF', fontSize: '11px', letterSpacing: '0.08em' }}>{entry.period}</span>
                          {entry.active && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(42,130,255,0.1)', color: '#2A82FF', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>CURRENT</span>}
                        </div>
                        <h3 className="font-semibold mb-1" style={{ color: '#E8E8F2', fontSize: '15px' }}>{entry.title}</h3>
                        <div className="text-xs mb-3" style={{ color: '#2A82FF', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>{entry.org}</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#636380' }}>{entry.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  { mark: '◈', title: 'AI & Machine Learning', body: 'Building and experimenting with intelligent systems using Python and modern ML techniques.', color: '#2A82FF' },
  { mark: '◎', title: 'Computer Vision', body: 'Exploring image processing, object detection, recognition, and visual AI systems.', color: '#38C8FF' },
  { mark: '⬡', title: 'UI/UX Design', body: 'Designing clean, intuitive digital experiences and product interfaces.', color: '#7B5EFA' },
  { mark: '◇', title: 'AI + Product Thinking', body: 'Combining technical AI knowledge with product thinking and user experience design.', color: '#4DA8FF' },
]

function Services() {
  return (
    <section className="section-shell py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container>
        <Reveal>
          <SectionLabel num="05" label="What I Bring" />
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-14 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
            Capabilities & <span className="text-gradient-blue">Interests</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 65}>
              <div className="capability-card card-hover p-6 rounded-xl flex flex-col gap-4 h-full" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xl w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: 'rgba(42,130,255,0.08)', color: s.color, border: '1px solid rgba(42,130,255,0.14)' }}>
                  {s.mark}
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: '#E8E8F2' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#636380' }}>{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('message', form.message)
    payload.append('_replyto', form.email)

    try {
      const response = await fetch('https://formspree.io/f/xrpzpwnz', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')
      setForm({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact-section py-28 lg:py-36" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0A0B14' }}>
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionLabel num="06" label="Contact" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}>
              {"Let's Build Something"}<br /><span className="text-gradient-blue">Intelligent.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: '#636380', maxWidth: '460px', margin: '0 auto 40px' }}>
              Have an idea, project, or collaboration in mind? {"I'd"} love to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.open('https://www.linkedin.com/in/raeedelmasry451/', '_blank', 'noopener,noreferrer')}
                className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold"
                style={{ background: '#2A82FF', color: '#fff', fontSize: '15px', border: 'none', cursor: 'pointer' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn ↗
              </button>
              <a
                href="mailto:raeed@example.com"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9696B0', textDecoration: 'none', fontSize: '15px' }}
              >
                Get In Touch
              </a>
            </div>
            <form className="contact-form mt-10 text-left" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="contact-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>
              <label className="contact-field mt-4">
                <span>Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  rows={5}
                  required
                />
              </label>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className={`contact-status ${status}`} role="status" aria-live="polite">
                  {status === 'success' && 'Thanks — your message has been sent.'}
                  {status === 'error' && 'Something went wrong. Please try again.'}
                  {status === 'submitting' && 'Sending your message…'}
                </p>
                <button
                  type="submit"
                  className="btn-primary contact-submit inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold"
                  style={{ background: '#2A82FF', color: '#fff', fontSize: '14px', border: 'none', cursor: status === 'submitting' ? 'wait' : 'pointer' }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  {status !== 'submitting' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </button>
              </div>
            </form>
            <div className="contact-info-row mt-6" aria-label="Direct contact details">
              <a
                href="https://wa.me/201123641069"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.52 3.48A11.84 11.84 0 0012.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.15 1.6 5.95L.07 24l6.33-1.66a11.84 11.84 0 005.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.14-3.42-8.42z" fill="currentColor" opacity=".18" />
                  <path d="M17.17 14.9c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-1.64-.82-2.72-1.47-3.8-3.33-.29-.5.29-.46.83-1.54.1-.2.05-.37-.02-.52-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47h-.53c-.18 0-.47.07-.72.35-.25.28-.94.92-.94 2.24 0 1.32.96 2.6 1.1 2.78.14.18 1.9 2.9 4.6 4.07.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.24-.18-.52-.32z" fill="currentColor" />
                </svg>
                <span>+20 1123641069</span>
              </a>
              <a href="mailto:raeedelmasry80@gmail.com" className="contact-info-item">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>raeedelmasry80@gmail.com</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#07090F' }}>
      <Container className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <LogoMark size={44} />
            <div>
              <div className="font-semibold text-sm" style={{ color: '#E8E8F2' }}>Raeed Youssef</div>
              <div className="text-xs" style={{ color: '#636380' }}>AI Student & UI/UX Designer</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => window.open('https://www.linkedin.com/in/raeedelmasry451/', '_blank', 'noopener,noreferrer')}
              className="social-link flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs"
              style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#636380', background: 'transparent', cursor: 'pointer' }}
              aria-label="LinkedIn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <div className="text-xs" style={{ color: '#2A2A3C', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
              © 2026 RAEED YOUSSEF
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const activeProject = activeSlug ? ALL_PROJECTS.find(p => p.slug === activeSlug) ?? null : null

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const ids = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] },
    )
    ids.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!))
    return () => observer.disconnect()
  }, [activeProject])

  const handleProjectClick = (slug: string) => {
    setActiveSlug(slug)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBack = () => {
    setActiveSlug(null)
    // Scroll to projects section after returning
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const handleNavigate = (slug: string) => {
    setActiveSlug(slug)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen" style={{ background: '#07090F', color: '#E8E8F2' }}>
      <Nav
        scrolled={scrolled}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onLogoClick={() => { setActiveSlug(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      />

      {activeProject ? (
        <ProjectDetail
          key={activeSlug}
          project={activeProject}
          allProjects={ALL_PROJECTS}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      ) : (
        <main key="main" className="page-in">
          <Hero />
          <About />
          <Projects onProjectClick={handleProjectClick} />
          <Skills />
          <Experience />
          <Services />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  )
}
