import { useEffect } from 'react'
import type { AnyProject, AIProject, UXProject } from './data/projects'

// ─── Shared Primitives ────────────────────────────────────────────────────────

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-5xl mx-auto px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

function MonoLabel({ children, color = '#2A82FF' }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', color }}>
      {children}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold mb-5 tracking-tight"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}
    >
      {children}
    </h2>
  )
}

function Placeholder({
  label,
  sublabel,
  height = 280,
}: {
  label: string
  sublabel?: string
  height?: number
}) {
  return (
    <div
      className="rounded-2xl flex flex-col items-center justify-center gap-3 text-center"
      style={{
        height,
        background: '#0B0D1A',
        border: '1.5px dashed rgba(42,130,255,0.18)',
      }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(42,130,255,0.1)', border: '1px solid rgba(42,130,255,0.2)' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="#2A82FF" strokeWidth="1.2" />
          <path d="M4 7h6M7 4v6" stroke="#2A82FF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <MonoLabel>{label}</MonoLabel>
        {sublabel && (
          <p className="mt-1 text-sm" style={{ color: '#636380', maxWidth: '280px', lineHeight: 1.55 }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  )
}

function NavRow({
  prev,
  next,
  onNavigate,
  onBack,
}: {
  prev: AnyProject | null
  next: AnyProject | null
  onNavigate: (slug: string) => void
  onBack: () => void
}) {
  return (
    <div
      className="mt-16 pt-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: '#636380', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8H2M6 4L2 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Projects
        </button>

        {/* Prev / Next */}
        <div className="flex items-center gap-3">
          {prev && (
            <button
              onClick={() => onNavigate(prev.slug)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', color: '#9696B0', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 6H3M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>
          )}
          {next && (
            <button
              onClick={() => onNavigate(next.slug)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', color: '#9696B0', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Preview labels */}
      <div className="flex items-start justify-between mt-3">
        <div style={{ width: '120px' }} />
        <div className="flex gap-3 items-start">
          {prev && (
            <div className="text-right text-xs hidden sm:block" style={{ color: '#3A3A58', maxWidth: '160px', lineHeight: 1.4 }}>
              {prev.title}
            </div>
          )}
          {next && (
            <div className="text-left text-xs hidden sm:block" style={{ color: '#3A3A58', maxWidth: '160px', lineHeight: 1.4 }}>
              {next.title}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── AI Project Detail ────────────────────────────────────────────────────────

function AIProjectDetail({
  project,
  prev,
  next,
  onBack,
  onNavigate,
}: {
  project: AIProject
  prev: AnyProject | null
  next: AnyProject | null
  onBack: () => void
  onNavigate: (slug: string) => void
}) {
  return (
    <div className="pt-28 pb-20 page-in" style={{ background: '#07090F', minHeight: '100vh' }}>
      <Container>
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-10 text-sm font-medium group"
          style={{ color: '#636380', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8H2M6 4L2 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Projects
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div
              className="px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: 'rgba(42,130,255,0.1)', color: project.color, border: `1px solid rgba(42,130,255,0.2)`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
            >
              {project.category.toUpperCase()}
            </div>
            <MonoLabel color="#3A3A58">{project.id}</MonoLabel>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2', lineHeight: 1.05 }}
          >
            {project.title}
          </h1>

          {/* Tech stack */}
          <div className="mb-3">
            <MonoLabel color="#9696B0">TECH STACK</MonoLabel>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9696B0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          {project.demoUrl && (
            <div className="flex flex-wrap gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9696B0', textDecoration: 'none' }}
              >
                Live Demo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H6M10 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Overview + Problem */}
        <div
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <MonoLabel>PROJECT OVERVIEW</MonoLabel>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9696B0' }}>
              {project.overview}
            </p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <MonoLabel color="#38C8FF">THE PROBLEM</MonoLabel>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9696B0' }}>
              {project.problem}
            </p>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="mb-10">
          <Placeholder
            label="PROJECT SCREENSHOTS / VISUALS"
            sublabel="Replace this area with your actual project screenshots, output images, or demo recordings."
            height={340}
          />
        </div>

        {/* Approach */}
        <div className="mb-10">
          <SectionHeading>Approach</SectionHeading>
          <div className="flex flex-col gap-3">
            {project.approach.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl"
                style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(42,130,255,0.1)', color: '#2A82FF', fontFamily: "'JetBrains Mono', monospace", border: '1px solid rgba(42,130,255,0.18)' }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#9696B0' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="mb-10">
          <SectionHeading>Methodology</SectionHeading>
          <div
            className="p-6 rounded-2xl"
            style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}
          >
            <div className="flex items-center gap-0 min-w-max">
              {project.pipeline.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 px-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'rgba(42,130,255,0.12)', color: '#2A82FF', border: '1px solid rgba(42,130,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {step.step}
                    </div>
                    <span
                      className="text-[11px] text-center leading-tight max-w-[80px]"
                      style={{ color: '#636380', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < project.pipeline.length - 1 && (
                    <div className="flex items-center mb-5">
                      <div className="w-6 h-px" style={{ background: 'rgba(42,130,255,0.25)' }} />
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginLeft: '-1px' }}>
                        <path d="M1 4h6M4 1l3 3-3 3" stroke="rgba(42,130,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features + Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Key Features */}
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <SectionHeading>Key Features</SectionHeading>
            <div className="flex flex-col gap-3">
              {project.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#2A82FF' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#9696B0' }}>{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <SectionHeading>Results / Evaluation</SectionHeading>
            <div className="flex flex-col gap-4">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(42,130,255,0.04)', border: '1px solid rgba(42,130,255,0.1)' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <MonoLabel color="#2A82FF">{r.metric.toUpperCase()}</MonoLabel>
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2' }}
                    >
                      {r.value}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#636380', lineHeight: 1.5 }}>{r.note}</p>
                </div>
              ))}
              <p className="text-xs mt-1" style={{ color: '#3A3A58', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                XX% = placeholder — replace with your actual results
              </p>
            </div>
          </div>
        </div>

        {/* What I Learned */}
        <div
          className="p-7 rounded-2xl mb-6"
          style={{ background: 'linear-gradient(135deg, rgba(42,130,255,0.06) 0%, rgba(11,13,26,1) 70%)', border: '1px solid rgba(42,130,255,0.14)' }}
        >
          <SectionHeading>What I Learned</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.learned.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#38C8FF' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#9696B0' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <NavRow prev={prev} next={next} onNavigate={onNavigate} onBack={onBack} />
      </Container>
    </div>
  )
}

// ─── UI/UX Project Detail ─────────────────────────────────────────────────────

function UXProjectDetail({
  project,
  prev,
  next,
  onBack,
  onNavigate,
}: {
  project: UXProject
  prev: AnyProject | null
  next: AnyProject | null
  onBack: () => void
  onNavigate: (slug: string) => void
}) {
  const accentRgb = project.color.startsWith('#')
    ? parseInt(project.color.slice(1, 3), 16) + ',' + parseInt(project.color.slice(3, 5), 16) + ',' + parseInt(project.color.slice(5, 7), 16)
    : '42,130,255'

  return (
    <div className="pt-28 pb-20 page-in" style={{ background: '#07090F', minHeight: '100vh' }}>
      <Container>
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-10 text-sm font-medium"
          style={{ color: '#636380', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8H2M6 4L2 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Projects
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div
              className="px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: `rgba(${accentRgb},0.12)`, color: project.color, border: `1px solid rgba(${accentRgb},0.25)`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
            >
              {project.category.toUpperCase()}
            </div>
            <MonoLabel color="#3A3A58">{project.id}</MonoLabel>
            {project.platform === 'web' && project.demoUrl && (
              <div className="px-2.5 py-1 rounded-full text-[10px]" style={{ background: 'rgba(42,130,255,0.08)', color: '#2A82FF', border: '1px solid rgba(42,130,255,0.18)', fontFamily: "'JetBrains Mono', monospace" }}>
                LIVE
              </div>
            )}
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#E8E8F2', lineHeight: 1.05 }}
          >
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9696B0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA buttons — only real provided URLs */}
          {(project.figmaUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ background: '#2A82FF', color: '#fff', textDecoration: 'none' }}
                >
                  Live Website
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H6M10 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ background: '#7B5EFA', color: '#fff', textDecoration: 'none' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
                    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
                    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
                    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
                    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
                  </svg>
                  View Prototype
                </a>
              )}
            </div>
          )}
        </div>

        {/* Hero Screenshot — large premium showcase */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-12"
          style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <img
            src={project.screenshotSrc}
            alt={`${project.title} — project screenshot`}
            style={{ width: '100%', display: 'block', objectFit: project.platform === 'web' ? 'cover' : 'contain', maxHeight: project.platform === 'mobile' ? '520px' : '580px' }}
          />
          {project.platform === 'web' && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 65%, rgba(7,9,15,0.5) 100%)' }} />
          )}
        </div>

        {/* 01 Overview + 02 Challenge */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <MonoLabel color="#2A82FF">01 — OVERVIEW</MonoLabel>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9696B0' }}>{project.overview}</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <MonoLabel color="#38C8FF">02 — CHALLENGE</MonoLabel>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9696B0' }}>{project.challenge}</p>
          </div>
        </div>

        {/* 03 Goals */}
        <div className="p-6 rounded-2xl mb-10" style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}>
          <MonoLabel color={project.color}>03 — GOALS</MonoLabel>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {project.goals.map((g, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.color }} />
                <p className="text-sm leading-relaxed" style={{ color: '#9696B0' }}>{g}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 04 UX Process */}
        <div className="mb-10">
          <div className="mb-5">
            <MonoLabel color="#9696B0">04 — UX PROCESS</MonoLabel>
          </div>
          <div className="flex flex-col gap-3">
            {project.uxProcess.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl"
                style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: `rgba(${accentRgb},0.1)`, color: project.color, fontFamily: "'JetBrains Mono', monospace", border: `1px solid rgba(${accentRgb},0.18)` }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#9696B0' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 05 User Flow */}
        <div className="mb-10">
          <div className="mb-5">
            <MonoLabel color="#9696B0">05 — USER FLOW</MonoLabel>
          </div>
          <div
            className="p-6 rounded-2xl"
            style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}
          >
            <div className="flex items-center gap-0 min-w-max">
              {project.userFlow.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 px-3" style={{ maxWidth: '130px' }}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: `rgba(${accentRgb},0.12)`, color: project.color, border: `1px solid rgba(${accentRgb},0.2)`, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[11px] text-center leading-tight" style={{ color: '#636380', fontFamily: "'JetBrains Mono', monospace" }}>
                      {step}
                    </span>
                  </div>
                  {i < project.userFlow.length - 1 && (
                    <div className="flex items-center mb-5">
                      <div className="w-5 h-px" style={{ background: `rgba(${accentRgb},0.25)` }} />
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginLeft: '-1px' }}>
                        <path d="M1 4h6M4 1l3 3-3 3" stroke={`rgba(${accentRgb},0.4)`} strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 06 Wireframes placeholder */}
        <div className="mb-5">
          <MonoLabel color="#9696B0">06 — WIREFRAMES</MonoLabel>
        </div>
        <div className="mb-10">
          <Placeholder
            label="WIREFRAMES / LOW-FI SKETCHES"
            sublabel="Add your wireframes or early explorations here when available."
            height={220}
          />
        </div>

        {/* 07-08 Visual Direction + Final UI — another look at the screenshot */}
        <div className="mb-5">
          <MonoLabel color="#9696B0">07–08 — VISUAL DIRECTION & FINAL UI</MonoLabel>
        </div>
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-10"
          style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <img
            src={project.screenshotSrc}
            alt={`${project.title} — final UI`}
            style={{ width: '100%', display: 'block', objectFit: project.platform === 'mobile' ? 'contain' : 'cover', maxHeight: '460px' }}
          />
        </div>

        {/* 09 Key Features */}
        <div
          className="p-7 rounded-2xl mb-10"
          style={{ background: '#0B0D1A', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="mb-5">
            <MonoLabel color="#9696B0">09 — KEY FEATURES</MonoLabel>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.color }} />
                <p className="text-sm leading-relaxed" style={{ color: '#9696B0' }}>{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Outcome */}
        <div
          className="p-7 rounded-2xl mb-10"
          style={{ background: `linear-gradient(135deg, rgba(${accentRgb},0.06) 0%, rgba(11,13,26,1) 70%)`, border: `1px solid rgba(${accentRgb},0.14)` }}
        >
          <div className="mb-4">
            <MonoLabel color={project.color}>10 — OUTCOME</MonoLabel>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#9696B0' }}>{project.outcome}</p>
        </div>

        {/* 11 Live Website / Prototype */}
        {(project.demoUrl || project.figmaUrl) && (
          <div className="mb-6">
            <div className="mb-5">
              <MonoLabel color="#9696B0">11 — {project.demoUrl ? 'LIVE WEBSITE' : 'PROTOTYPE'}</MonoLabel>
            </div>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl"
              style={{ background: '#0B0D1A', border: `1px solid rgba(${accentRgb},0.18)` }}
            >
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#E8E8F2', fontSize: '15px' }}>{project.title}</h3>
                <p className="text-sm" style={{ color: '#636380' }}>
                  {project.demoUrl
                    ? project.platform === 'web' ? 'Deployed and accessible at the link below.' : 'Live and accessible at the link below.'
                    : 'View the full interactive prototype on Figma.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                    style={{ background: '#2A82FF', color: '#fff', textDecoration: 'none' }}
                  >
                    Visit Live Site ↗
                  </a>
                )}
                {project.figmaUrl && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                    style={{ background: '#7B5EFA', color: '#fff', textDecoration: 'none' }}
                  >
                    View Prototype ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <NavRow prev={prev} next={next} onNavigate={onNavigate} onBack={onBack} />
      </Container>
    </div>
  )
}

// ─── Router ───────────────────────────────────────────────────────────────────

interface ProjectDetailProps {
  project: AnyProject
  allProjects: AnyProject[]
  onBack: () => void
  onNavigate: (slug: string) => void
}

export default function ProjectDetail({ project, allProjects, onBack, onNavigate }: ProjectDetailProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [project.slug])

  const idx = allProjects.findIndex(p => p.slug === project.slug)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  if (project.type === 'ai') {
    return (
      <AIProjectDetail
        project={project}
        prev={prev}
        next={next}
        onBack={onBack}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <UXProjectDetail
      project={project as UXProject}
      prev={prev}
      next={next}
      onBack={onBack}
      onNavigate={onNavigate}
    />
  )
}
