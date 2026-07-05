/* ============================================================
   bgm.js — 背景音乐控制器
   ============================================================ */

const BGM_URL = 'https://music.163.com/song/media/outer/url?id=1427725543.mp3';

class BGMManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isLoaded = false;
    this._boundToggle = this.toggle.bind(this);
  }

  init() {
    // 创建 audio 元素
    this.audio = new Audio(BGM_URL);
    this.audio.loop = true;
    this.audio.volume = 0.25;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this._updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this._updateUI();
    });

    this.audio.addEventListener('error', () => {
      console.warn('BGM 加载失败，可能是网络问题或链接失效');
      this.isLoaded = false;
    });

    this.audio.addEventListener('canplaythrough', () => {
      this.isLoaded = true;
    });

    // 绑定按钮
    const btn = document.getElementById('bgm-toggle');
    if (btn) {
      btn.addEventListener('click', this._boundToggle);
    }

    // 首次用户交互后自动尝试播放
    const tryPlay = () => {
      if (!this.isPlaying && this.audio) {
        this.audio.play().catch(() => {
          // 浏览器可能拦截自动播放，这是正常的
        });
      }
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };

    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });

    this._updateUI();
  }

  toggle() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(() => {});
    }
  }

  _updateUI() {
    const btn = document.getElementById('bgm-toggle');
    if (!btn) return;

    const iconEl = btn.querySelector('.icon-bgm');
    if (iconEl) {
      iconEl.textContent = this.isPlaying ? '🔊' : '🔇';
    }
    btn.title = this.isPlaying ? '暂停背景音乐' : '播放背景音乐';

    if (this.isPlaying) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }

  destroy() {
    const btn = document.getElementById('bgm-toggle');
    if (btn) {
      btn.removeEventListener('click', this._boundToggle);
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}

export function initBGM() {
  const bgm = new BGMManager();
  bgm.init();
  return bgm;
}
