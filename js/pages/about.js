/* ============================================================
   about.js — 关于页（个人档案 + 联系方式）
   ============================================================ */

import { render } from '../utils/helpers.js';
import { data } from '../data.js';

export class AboutPage {
  constructor(containerId, appData) {
    this.container = document.querySelector(containerId);
    this.data = appData;
    this._handlers = [];
  }

  mount() {
    this.render();
    return Promise.resolve();
  }

  unmount() {
    this._handlers.forEach(fn => fn());
    this._handlers = [];
  }

  render() {
    const { profile, social, capabilities } = this.data;

    const itemsHTML = profile.items.map(item => `
      <div class="about-info-cell">
        <span class="about-info-label">${item.label}</span>
        <span class="about-info-value">${item.value}</span>
      </div>
    `).join('');

    const capsHTML = capabilities.map((cap, i) => `
      <div class="about-skill-item anim-fade-up anim-delay-${Math.min(i+1, 5)}">
        <div class="about-skill-header">
          <span class="about-skill-name">${cap.name}</span>
          <span class="about-skill-value">${cap.level}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar__fill progress-bar__fill--${cap.theme}"
               style="width:${cap.level}%"></div>
        </div>
      </div>
    `).join('');

    const toolsHTML = profile.tools.map(t => `
      <div class="tool-icon">
        <span class="tool-icon__emoji">${t.icon}</span>
        <span class="tool-icon__name">${t.name}</span>
      </div>
    `).join('');

    render(this.container, `
      <div class="page-container about-page">

        <!-- 个人头部 -->
        <section class="about-hero anim-fade-up">
          <div class="about-avatar-wrap">
            <img src="${profile.avatar}" alt="${profile.name}" class="about-avatar">
          </div>
          <h1 class="about-name">${profile.name}</h1>
          <p class="about-title">${profile.title}</p>
          <p class="about-school">${profile.school} · ${profile.degree} · ${profile.age}岁</p>
        </section>

        <!-- 个人资料 -->
        <section class="about-section anim-fade-up">
          <h2 class="section-title">个人资料</h2>
          <div class="hud-panel">
            <div class="about-info-grid">
              ${itemsHTML}
            </div>
            <p class="about-intro">${profile.intro}</p>
          </div>
        </section>

        <!-- 增长能力 -->
        <section class="about-section anim-fade-up">
          <h2 class="section-title">增长能力</h2>
          <div class="hud-panel">
            ${capsHTML}
          </div>
        </section>

        <!-- 工具栈 -->
        <section class="about-section anim-fade-up">
          <h2 class="section-title">工具栈</h2>
          <div class="hud-panel">
            <div class="tool-icons">
              ${toolsHTML}
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section class="about-section anim-fade-up">
          <h2 class="section-title">联系方式</h2>
          <div class="hud-panel">
            <div class="contact-grid">
              <div class="contact-item">
                <span class="contact-icon">💬</span>
                <div>
                  <span class="contact-label">微信</span>
                  <span class="contact-value">${social.wechat}</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <div>
                  <span class="contact-label">邮箱</span>
                  <span class="contact-value">${social.email}</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📕</span>
                <div>
                  <span class="contact-label">小红书</span>
                  <span class="contact-value">${social.xhs}</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">🎥</span>
                <div>
                  <span class="contact-label">视频号</span>
                  <span class="contact-value">${social.sph}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="content-nav">
          <a href="#home" class="btn btn--ghost">← 返回首页</a>
          <a href="#gallery" class="btn btn--neon">查看作品集 →</a>
        </div>

      </div>
    `);
  }
}
