import { useState } from 'react'
import { PixelCat, GlowDot } from './PixelStickers'

const INTERNSHIPS = [
  {
    company: '作业帮', role: '新媒体运营实习生', period: '2026.04 - 2026.06',
    details: [
      '官号运营：负责小红书/公众号/视频号内容策划与发布。视频笔记发布24小时内播放量达5w+，点赞900+，新增关注171人，单日涨粉超此前3个月总和',
      '直播数据分析：每场直播后拉取并清洗数据，建立日报模板。通过分析流量来源优化话术，转粉率提升0.8%，平均停留时长从52秒提升至一分半',
    ],
  },
  {
    company: 'WonderQuest（美国）', role: '红人运营实习生', period: '2025.10 - 2026.02',
    details: [
      '负责招募并维护达人关系，推动达人完成公司品牌客户相关产品的推荐及佣金的处理，利用社群方式按照领导要求定期开展和宣传campaigns & event',
      '负责按照SOP培训达人在大促期间批量发布相关热点话题UGC',
      '负责公司内部达人晋升的激励管理',
    ],
  },
  {
    company: '小满科技有限公司（阿里系）', role: '招聘运营实习生', period: '2025.06 - 2025.10',
    details: [
      '小红书招聘账号运营：发布研发、产品、营销等岗位笔记60+条',
      '运营100+人社群，日均回复20+条咨询',
      '通过数据分析增加渠道运营及研发岗发布频次，促成60+份简历投递',
    ],
  },
]

const STATS = [
  { value: '200+', label: '笔记产出' },
  { value: '100w+', label: '内容曝光' },
  { value: '300+', label: '图片素材' },
  { value: '3', label: '大厂实习' },
]

export default function BasicInfo() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="basic" className="section" style={{ background: 'var(--bg-primary)' }}>
      {/* Pixel sticker */}
      <PixelCat style={{ top: '80px', right: '60px', animation: 'float 4.5s ease-in-out 0.5s infinite' }} />
      <GlowDot style={{ top: '60px', right: '100px' }} />

      <div className="container">
        <div className="section-label">✦ BASIC INFO</div>
        <h2 className="section-title">基本信息</h2>
        <p className="section-desc" style={{ marginBottom: '72px' }}>
          深圳大学 · 公共管理 · 硕士研究生 · 2024 – 2027
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '72px', alignItems: 'start' }}>
          {/* LEFT */}
          <div>
            <div style={{
              width: '100%', aspectRatio: '3/4',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              overflow: 'hidden', marginBottom: '28px',
              transition: 'all 0.3s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              {!imgError ? (
                <img src="/images/avatar.jpg" alt="陈俊璇"
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', gap: '12px',
                }}>
                  <span style={{ fontSize: '40px' }}>👤</span>
                  <span style={{ fontSize: '12px' }}>avatar.jpg</span>
                </div>
              )}
            </div>

            {/* Contact */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              padding: '24px 28px',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: 'var(--purple-light)', letterSpacing: '1.5px',
                textTransform: 'uppercase', marginBottom: '20px',
              }}>
                ✦ 联系方式
              </h4>
              {[
                { label: '邮箱', value: '18664245328@163.com' },
                { label: '微信', value: '18664245328' },
                { label: '手机', value: '18664245328' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3 style={{ fontSize: '40px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-1px' }}>
              陈俊璇
              <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '14px' }}>
                （卷卷）
              </span>
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--orange)', marginBottom: '40px', fontWeight: 500 }}>
              新媒体运营 · 深圳
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '56px' }}>
              {STATS.map((s) => (
                <div key={s.label} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  padding: '20px 16px', textAlign: 'center',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--purple)'
                    e.currentTarget.style.boxShadow = '0 0 24px var(--purple-dim)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ fontSize: '30px', fontWeight: 700, color: 'var(--purple-light)', letterSpacing: '-1px' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div style={{ marginBottom: '44px' }}>
              <div style={{
                display: 'inline-block', padding: '4px 14px',
                background: 'var(--purple-dim)', color: 'var(--purple-light)',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                fontWeight: 600, letterSpacing: '1.5px', marginBottom: '16px',
              }}>
                ✦ 教育背景
              </div>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                padding: '22px 28px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--purple-dim)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>深圳大学</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    公共管理 · 硕士研究生
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>2024 – 2027</span>
              </div>
            </div>

            {/* Internship */}
            <div>
              <div style={{
                display: 'inline-block', padding: '4px 14px',
                background: 'var(--orange-dim)', color: 'var(--orange)',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                fontWeight: 600, letterSpacing: '1.5px', marginBottom: '16px',
              }}>
                ✦ 实习经历
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {INTERNSHIPS.map((intern, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    padding: '22px 28px', transition: 'all 0.25s',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--purple)'
                      e.currentTarget.style.background = 'var(--bg-card-hover)'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.background = 'var(--bg-card)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {intern.company}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '16px' }}>
                        {intern.period}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--purple-light)', marginBottom: '10px', fontWeight: 500 }}>
                      {intern.role}
                    </p>
                    <ul style={{ paddingLeft: '16px' }}>
                      {intern.details.map((d, i) => (
                        <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4px' }}>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
