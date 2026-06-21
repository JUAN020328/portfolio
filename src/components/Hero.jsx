import { PixelCat, PixelDog, PixelPerson, Sparkle, GlowDot } from './PixelStickers'

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative',
      height: '100vh', minHeight: '680px',
      display: 'flex', alignItems: 'center',
      background: 'var(--bg-deep)',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 25%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 25%, transparent 70%)',
      }} />

      {/* Purple ambient glows */}
      <div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--purple-dim) 0%, transparent 60%)',
        filter: 'blur(70px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 60%)',
        filter: 'blur(60px)',
      }} />

      {/* === PIXEL STICKERS === */}
      <PixelCat style={{ top: '18%', right: '22%', animation: 'float 4s ease-in-out infinite' }} />
      <PixelDog style={{ bottom: '22%', right: '10%', animation: 'float 5s ease-in-out 1.5s infinite' }} />
      <PixelPerson style={{ top: '30%', left: '8%', animation: 'float 3.5s ease-in-out 0.8s infinite' }} />
      <GlowDot style={{ top: '25%', right: '31%' }} />
      <GlowDot style={{ bottom: '35%', left: '18%', animationDelay: '1s' }} />
      <GlowDot style={{ top: '40%', right: '45%', animationDelay: '0.5s' }} />
      <Sparkle style={{ top: '15%', right: '28%' }} />
      <Sparkle style={{ bottom: '28%', left: '12%', animationDelay: '1.2s' }} />
      <Sparkle style={{ top: '55%', right: '38%', animationDelay: '0.7s' }} />

      {/* geometric pixel decorations */}
      <div style={{
        position: 'absolute', top: '20%', left: '6%',
        width: '40px', height: '40px',
        border: '2px solid var(--purple-dim)',
        animation: 'floatWide 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '25%', right: '20%',
        width: '24px', height: '24px',
        background: 'var(--purple-dim)',
        animation: 'floatWide 5s ease-in-out 2s infinite',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '800px' }}>
          <div className="section-label animate-in"
            style={{ animationDelay: '0.1s', opacity: 0, marginBottom: '28px' }}>
            ✦ PORTFOLIO
          </div>

          <h1 className="animate-in" style={{
            animationDelay: '0.25s', opacity: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 6.5vw, 90px)',
            fontWeight: 900, lineHeight: 1.06,
            letterSpacing: '0.02em',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            textShadow: '0 0 80px var(--purple-dim)',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #e0d5ff 0%, #a78bfa 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px var(--purple-glow))',
            }}>
              用内容驱动增长
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #c084fc 0%, #e0d5ff 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px var(--purple-glow))',
            }}>
              让品牌被看见
            </span>
          </h1>

          <p className="animate-in" style={{
            animationDelay: '0.4s', opacity: 0,
            fontSize: '18px', color: 'var(--text-secondary)',
            maxWidth: '520px', lineHeight: 1.7, marginBottom: '44px',
          }}>
            专注于内容策略与品牌传播，擅长小红书、公众号等平台内容运营。
          </p>

          <div className="animate-in" style={{
            animationDelay: '0.55s', opacity: 0,
            display: 'flex', gap: '16px', flexWrap: 'wrap',
          }}>
            <a href="#operations" className="btn-primary">✦ 查看作品</a>
            <a href="#basic" className="btn-outline">了解更多</a>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '3px',
        animation: 'fadeUp 0.6s ease 1.2s forwards', opacity: 0,
      }}>
        SCROLL ↓
      </div>
    </section>
  )
}
