import { useState } from 'react'
import { PixelPerson, GlowDot } from './PixelStickers'

const CATEGORIES = [
  { label: '小红书', folder: '小红书', prefix: 'xhs', count: 6 },
  { label: '公众号', folder: '公众号', prefix: 'gzh', count: 5 },
  { label: '视频号', folder: '视频号', prefix: 'sph', count: 5 },
]

function ImageCard({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  if (error) return null

  return (
    <div style={{
      aspectRatio: '3/4', background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)', overflow: 'hidden',
      cursor: 'pointer', position: 'relative', transition: 'all 0.3s',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--purple)'
        e.currentTarget.style.boxShadow = '0 8px 32px var(--purple-dim)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          ✦
        </div>
      )}
      <img src={src} alt={alt}
        onLoad={() => setLoaded(true)} onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }}
      />
    </div>
  )
}

export default function OperationsWorks() {
  return (
    <section id="operations" className="section" style={{ background: 'var(--bg-primary)' }}>
      <PixelPerson style={{ top: '100px', right: '50px', animation: 'float 4s ease-in-out 0.2s infinite' }} />
      <GlowDot style={{ top: '80px', right: '80px' }} />

      <div className="container">
        <div className="section-label">✦ OPERATIONS</div>
        <h2 className="section-title">运营作品</h2>
        <p className="section-desc" style={{ marginBottom: '64px' }}>
          小红书 · 公众号 · 视频号
        </p>

        {CATEGORIES.map((cat) => (
          <div key={cat.label} style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                ✦ {cat.label}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {cat.count} 张
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {Array.from({ length: cat.count }, (_, i) => (
                <ImageCard
                  key={`${cat.prefix}-${i + 1}`}
                  src={`${import.meta.env.BASE_URL}images/运营作品/${cat.folder}/${cat.prefix}${i + 1}.jpg`}
                  alt={`${cat.label} ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
