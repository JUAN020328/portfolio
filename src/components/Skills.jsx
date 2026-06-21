import { PixelDog, Sparkle } from './PixelStickers'

const SKILLS = [
  { title: '数据分析', items: ['小红书蒲公英', '数据复盘', '竞品分析', '运营周报'] },
  { title: '内容创作', items: ['选题策划', '爆款标题', '笔记撰写', '公众号推文', 'SOP搭建'] },
  { title: '视觉设计', items: ['Canva', '稿定设计', '封面设计', '排版美化'] },
  { title: '视频剪辑', items: ['剪映', '短视频制作'] },
  { title: '平台运营', items: ['小红书运营', '公众号运营', '社群运营', '矩阵账号'] },
  { title: '其他工具', items: ['秀米编辑器', '135编辑器', '微信后台'] },
  { title: '证书', items: ['CET-6', '计算机二级', '普通话二甲'] },
]

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <PixelDog style={{ top: '60px', left: '50px', animation: 'float 4s ease-in-out 0.3s infinite' }} />
      <Sparkle style={{ top: '40px', left: '90px', animationDelay: '0.5s' }} />
      <Sparkle style={{ bottom: '80px', right: '60px', animationDelay: '1s' }} />

      <div className="container">
        <div className="section-label">✦ SKILLS</div>
        <h2 className="section-title">相关技能</h2>
        <p className="section-desc" style={{ marginBottom: '64px' }}>
          熟练使用主流运营工具，具备完整的运营技能链路。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {SKILLS.map((cat, idx) => (
            <div key={cat.title} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              padding: '28px 24px', transition: 'all 0.25s', cursor: 'default',
              animation: `slideInLeft 0.4s ease ${idx * 0.06}s both`,
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--purple)'
                e.currentTarget.style.background = 'var(--bg-card-hover)'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 32px var(--purple-dim)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.2px' }}>
                {cat.title}
              </h3>
              <div style={{ width: '20px', height: '2px', background: 'var(--purple)', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.items.map((item) => (
                  <span key={item} style={{
                    fontSize: '12px', color: 'var(--text-secondary)',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                    padding: '4px 10px', transition: 'all 0.2s',
                  }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--purple-light)'
                      e.target.style.borderColor = 'var(--purple-dim)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text-secondary)'
                      e.target.style.borderColor = 'var(--border-subtle)'
                    }}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
