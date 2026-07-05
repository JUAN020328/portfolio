/* ============================================================
   home.js — 首页（霓虹标题、档案卡片、进度条、模块入口）
   ============================================================ */

import { render, animateNumber, isMobile } from '../utils/helpers.js';
import { data } from '../data.js';

export class HomePage {
  constructor(containerId, appData) {
    this.container = document.querySelector(containerId);
    this.data = appData;
    this._handlers = [];
    this._observer = null;
  }

  mount() {
    this.render();
    this.bindEvents();
    this.initProgressBars();
    this.initCountAnimations();
    return Promise.resolve();
  }

  unmount() {
    this._handlers.forEach(fn => fn());
    this._handlers = [];
    if (this._observer) this._observer.disconnect();
  }

  render() {
    const { profile, capabilities, modules } = this.data;
    const toolsHTML = profile.tools.map(t => `
      <div class="tool-icon">
        <span class="tool-icon__emoji">${t.icon}</span>
        <span class="tool-icon__name">${t.name}</span>
        <span class="tool-icon__level">${t.level}</span>
      </div>
    `).join('');

    const capabilitiesHTML = capabilities.map((cap, i) => `
      <div class="capability-item anim-fade-up anim-delay-${Math.min(i + 1, 5)}">
        <div class="capability-header">
          <span class="capability-name">${cap.name}</span>
          <span class="capability-value" data-count="${cap.level}" data-count-format="percent">${cap.level}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar__fill progress-bar__fill--${cap.theme}"
               style="--target-width:${cap.level}%"></div>
        </div>
      </div>
    `).join('');

    const modulesHTML = modules.map((mod, i) => {
      const targetRoute = mod.id === 'data' ? '#data' : `#content/${mod.id}`;
      return `
        <a href="${targetRoute}" class="module-card card card--glow anim-fade-up anim-delay-${Math.min(i + 1, 5)}"
           data-route="${mod.id === 'data' ? 'data' : 'content'}">
          <span class="module-card__icon">${mod.icon}</span>
          <h3 class="module-card__title">${mod.title}</h3>
          <span class="module-card__subtitle">${mod.subtitle}</span>
          <p class="module-card__desc">${mod.desc}</p>
          <div class="module-card__tags">
            ${mod.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="module-card__glow" style="--glow-color:var(--${mod.color})"></div>
        </a>
      `;
    }).join('');

    render(this.container, `
      <div class="page-container home-page">

        <!-- 英雄标题区 -->
        <section class="hero-section">
          <div class="hero-badge anim-fade-up">
            <span class="hero-badge__dot"></span>
            SYSTEM ONLINE · PORTFOLIO v3.0
          </div>
          <h1 class="hero-title anim-fade-up anim-delay-1">
            <span class="hero-title__main" data-text="CONTENT GROWTH LAB">CONTENT GROWTH LAB</span>
            <span class="hero-title__cn">新媒体增长实验室</span>
          </h1>
          <p class="hero-subtitle anim-fade-up anim-delay-2">
            ${profile.title}  <span class="hero-divider">|</span>  ${profile.titleCN}
          </p>
          <div class="hero-line anim-fade-up anim-delay-3"></div>
        </section>

        <!-- 运营档案卡片 -->
        <section class="profile-section anim-fade-up anim-delay-2">
          <div class="hud-panel profile-card">
            <div class="profile-header">
              <div class="profile-avatar-wrap">
                <img class="profile-avatar" src="${profile.avatar}" alt="${profile.name}" loading="lazy">
              </div>
              <div class="profile-meta">
                <h2 class="profile-name">${profile.name}</h2>
                <p class="profile-role">${profile.title}</p>
                <p class="profile-school">${profile.school} · ${profile.degree}</p>
              </div>
            </div>
            <div class="profile-info-grid">
              ${profile.items.map(item => `
                <div class="profile-info-cell">
                  <span class="profile-info-label">${item.label}</span>
                  <span class="profile-info-value">${item.value}</span>
                </div>
              `).join('')}
            </div>
            <p class="profile-intro">${profile.intro}</p>

            <!-- 核心能力 -->
            <div class="profile-capabilities">
              <h3 class="profile-section-title">
                <span class="profile-section-title__icon">⚙️</span>
                运营核心能力
              </h3>
              <div class="capability-grid">
                ${profile.capabilities.map(cap => `
                  <div class="capability-card">
                    <span class="capability-card__icon">${cap.icon}</span>
                    <strong class="capability-card__name">${cap.name}</strong>
                    <p class="capability-card__desc">${cap.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 工具能力 -->
            <div class="profile-tools">
              <h3 class="profile-section-title">
                <span class="profile-section-title__icon">🛠️</span>
                工具栈
              </h3>
              <div class="tool-icons">
                ${toolsHTML}
              </div>
            </div>
          </div>
        </section>

        <!-- 增长能力可视化条形图 -->
        <section class="capabilities-section">
          <h2 class="section-title">增长能力矩阵</h2>
          <span class="section-subtitle">Growth Capability Matrix</span>
          <div class="hud-panel">
            ${capabilitiesHTML}
          </div>
        </section>

        <!-- 四大模块入口 -->
        <section class="modules-section">
          <h2 class="section-title">内容增长实验舱</h2>
          <span class="section-subtitle">Content Growth Laboratory</span>
          <div class="modules-grid">
            ${modulesHTML}
          </div>
        </section>

      </div>
    `);
  }

  bindEvents() {
    // 卡片鼠标追踪发光效果
    const glowCards = this.container.querySelectorAll('.card--glow');
    glowCards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      };
      card.addEventListener('mousemove', onMove);
      this._handlers.push(() => card.removeEventListener('mousemove', onMove));
    });
  }

  initProgressBars() {
    // 使用 IntersectionObserver 进入视图时触发动画
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.progress-bar__fill');
          bars.forEach(bar => {
            const w = bar.style.getPropertyValue('--target-width');
            if (w) bar.style.width = w;
          });
          this._observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const panel = this.container.querySelector('.capabilities-section .hud-panel');
    if (panel) this._observer.observe(panel);
  }

  initCountAnimations() {
    this._observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.capability-value[data-count]').forEach(el => {
            animateNumber(el, parseInt(el.dataset.count), 1200);
          });
          this._observer2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const panel = this.container.querySelector('.capabilities-section .hud-panel');
    if (panel) this._observer2.observe(panel);
  }
}
