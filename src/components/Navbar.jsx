import { useState, useEffect } from 'react'

const NAV = [
  { label: '基本信息', href: '#basic' },
  { label: '技能', href: '#skills' },
  { label: '运营作品', href: '#operations' },
  { label: '其他作品', href: '#others' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 1000, height: 'var(--nav-height)',
      display: 'flex', alignItems: 'center',
      transition: 'all 0.25s',
      background: scrolled ? 'rgba(6,6,14,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#hero" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          textDecoration: 'none',
        }}>
          {/* tiny pixel person in logo */}
          <span style={{
            display: 'inline-block',
            width: '24px', height: '24px',
            background: 'var(--purple)',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          }} />
          <span style={{
            fontSize: '17px', fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}>
            陈俊璇
          </span>
        </a>

        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {NAV.map((item) => (
            <a key={item.label} href={item.href} style={{
              fontSize: '13px', fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              letterSpacing: '0.3px',
            }}
              onMouseEnter={(e) => e.target.style.color = 'var(--purple-light)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >{item.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}
