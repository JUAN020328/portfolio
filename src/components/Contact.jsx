import { PixelCat, PixelDog, PixelPerson, Sparkle, GlowDot } from './PixelStickers'

export default function Contact() {
  return (
    <footer style={{
      position: 'relative', minHeight: '55vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border-subtle)',
      overflow: 'hidden',
    }}>
      {/* Purple glow */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--purple-dim) 0%, transparent 60%)',
        filter: 'blur(80px)',
      }} />

      {/* === ALL THREE PIXEL CHARACTERS in footer === */}
      <PixelCat style={{ top: '20%', left: '8%', animation: 'wiggle 3s ease-in-out infinite' }} />
      <PixelDog style={{ top: '25%', right: '10%', animation: 'wiggle 3.5s ease-in-out 0.5s infinite' }} />
      <PixelPerson style={{ bottom: '25%', left: '15%', animation: 'float 4s ease-in-out 0.8s infinite' }} />
      <GlowDot style={{ top: '15%', left: '13%' }} />
      <GlowDot style={{ top: '18%', right: '14%', animationDelay: '1.5s' }} />
      <GlowDot style={{ bottom: '35%', left: '20%', animationDelay: '0.6s' }} />
      <Sparkle style={{ top: '30%', right: '15%' }} />
      <Sparkle style={{ bottom: '30%', left: '10%', animationDelay: '0.9s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ display: 'inline-flex', justifyContent: 'center' }}>
            ✦ CONTACT
          </div>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            <span style={{
              color: 'var(--purple-light)',
              textShadow: '0 0 40px var(--purple-glow)',
            }}>
              保持联系
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            18664245328@163.com · 18664245328
          </p>

          <a href="mailto:18664245328@163.com" className="btn-primary">
            ✦ 发送邮件
          </a>

          <div style={{
            marginTop: '100px', paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2026 陈俊璇</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['小红书', '公众号'].map((p) => (
                <span key={p} style={{
                  fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s',
                }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--purple-light)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
