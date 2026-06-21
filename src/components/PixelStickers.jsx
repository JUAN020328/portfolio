/* ===== Pixel sticker decorations — reusable ===== */

export function PixelCat({ style }) {
  return (
    <div className="pixel-cat" style={{
      position: 'absolute',
      animation: 'float 4s ease-in-out infinite',
      pointerEvents: 'none',
      zIndex: 5,
      ...style,
    }} />
  )
}

export function PixelDog({ style }) {
  return (
    <div className="pixel-dog" style={{
      position: 'absolute',
      animation: 'float 5s ease-in-out 1s infinite',
      pointerEvents: 'none',
      zIndex: 5,
      ...style,
    }} />
  )
}

export function PixelPerson({ style }) {
  return (
    <div className="pixel-person" style={{
      position: 'absolute',
      animation: 'float 3.5s ease-in-out 0.5s infinite',
      pointerEvents: 'none',
      zIndex: 5,
      ...style,
    }} />
  )
}

export function Sparkle({ style, delay }) {
  return (
    <div className="sparkle" style={{
      position: 'absolute',
      animationDelay: delay || '0s',
      pointerEvents: 'none',
      zIndex: 4,
      ...style,
    }} />
  )
}

/* Purple glowing dot */
export function GlowDot({ style }) {
  return (
    <div style={{
      position: 'absolute',
      width: '6px', height: '6px',
      background: 'var(--purple-bright)',
      borderRadius: '1px',
      boxShadow: '0 0 16px var(--purple-glow), 0 0 40px var(--purple-dim)',
      animation: 'sparkle 2.5s ease-in-out infinite',
      pointerEvents: 'none',
      zIndex: 4,
      ...style,
    }} />
  )
}
