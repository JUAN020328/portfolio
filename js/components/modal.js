/* ============================================================
   modal.js — 图片灯箱组件
   ============================================================ */

class Lightbox {
  constructor() {
    this.modal = document.getElementById('lightbox-modal');
    this.image = document.getElementById('lightbox-image');
    this.images = [];
    this.currentIndex = 0;
    this._boundKeyHandler = this._onKeyDown.bind(this);
    this._boundClose = this.close.bind(this);
    this._boundPrev = this.prev.bind(this);
    this._boundNext = this.next.bind(this);

    this._buildUI();
    this._bindEvents();
  }

  _buildUI() {
    // 添加导航按钮和计数器
    const content = this.modal.querySelector('.modal-content');

    this.prevBtn = document.createElement('button');
    this.prevBtn.className = 'modal-nav modal-nav--prev';
    this.prevBtn.innerHTML = '◀';
    this.prevBtn.addEventListener('click', this._boundPrev);

    this.nextBtn = document.createElement('button');
    this.nextBtn.className = 'modal-nav modal-nav--next';
    this.nextBtn.innerHTML = '▶';
    this.nextBtn.addEventListener('click', this._boundNext);

    this.counter = document.createElement('span');
    this.counter.className = 'modal-counter';

    content.appendChild(this.prevBtn);
    content.appendChild(this.nextBtn);
    content.appendChild(this.counter);

    // 关闭按钮
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', this._boundClose);

    // 点击遮罩关闭
    this.modal.querySelector('.modal-overlay').addEventListener('click', this._boundClose);
  }

  _bindEvents() {
    // 全局图片点击委托
    document.getElementById('app').addEventListener('click', (e) => {
      const img = e.target.closest('.gallery-image, .content-image');
      if (!img) return;

      const src = img.getAttribute('data-full') || img.src;
      const group = img.getAttribute('data-group');

      // 收集同组图片
      if (group) {
        this.images = Array.from(document.querySelectorAll(`[data-group="${group}"]`))
          .map(el => el.getAttribute('data-full') || el.src);
        this.currentIndex = this.images.indexOf(src);
        if (this.currentIndex === -1) this.currentIndex = 0;
      } else {
        this.images = [src];
        this.currentIndex = 0;
      }

      this.open(this.currentIndex);
    });
  }

  open(index = 0) {
    this.currentIndex = index;
    this._updateImage();
    this._updateNav();
    this.modal.classList.remove('hidden');
    document.addEventListener('keydown', this._boundKeyHandler);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.add('hidden');
    document.removeEventListener('keydown', this._boundKeyHandler);
    document.body.style.overflow = '';
  }

  prev() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this._updateImage();
    this._updateNav();
  }

  next() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this._updateImage();
    this._updateNav();
  }

  _updateImage() {
    // 添加短暂过渡
    this.image.style.opacity = '0';
    setTimeout(() => {
      this.image.src = this.images[this.currentIndex];
      this.image.style.opacity = '1';
    }, 150);
    this.image.style.transition = 'opacity 0.15s ease';
  }

  _updateNav() {
    const hasMultiple = this.images.length > 1;
    this.prevBtn.style.display = hasMultiple ? 'flex' : 'none';
    this.nextBtn.style.display = hasMultiple ? 'flex' : 'none';
    this.counter.textContent = hasMultiple
      ? `${this.currentIndex + 1} / ${this.images.length}`
      : '';
  }

  _onKeyDown(e) {
    switch (e.key) {
      case 'Escape': this.close(); break;
      case 'ArrowLeft': this.prev(); break;
      case 'ArrowRight': this.next(); break;
    }
  }

  /* 销毁（清理） */
  destroy() {
    document.removeEventListener('keydown', this._boundKeyHandler);
    this.prevBtn.removeEventListener('click', this._boundPrev);
    this.nextBtn.removeEventListener('click', this._boundNext);
    this.modal.querySelector('.modal-close').removeEventListener('click', this._boundClose);
    this.modal.querySelector('.modal-overlay').removeEventListener('click', this._boundClose);
  }
}

export function initModal() {
  return new Lightbox();
}
