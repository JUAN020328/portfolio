/* ============================================================
   router.js — Hash-based SPA 路由器
   ============================================================ */

export class Router {
  constructor(appData) {
    this.routes = new Map();
    this.appData = appData;
    this.currentPage = null;
    this.currentRoute = null;
    this.transitionEl = document.getElementById('page-transition');
  }

  /* 注册路由 */
  register(name, factoryFn) {
    this.routes.set(name, factoryFn);
  }

  /* 解析 hash */
  parseHash(raw) {
    const hash = raw || location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    const page = parts[0];
    const params = {};

    if (page === 'content' && parts[1]) {
      params.type = parts[1];
    }
    if (page === 'gallery' && parts[1]) {
      params.subType = parts[1];
    }

    return { page, params };
  }

  /* 页面过渡 */
  async transition(callback) {
    return new Promise((resolve) => {
      // 显示过渡遮罩
      this.transitionEl.classList.add('active');

      setTimeout(async () => {
        await callback();
        // 隐藏过渡遮罩
        setTimeout(() => {
          this.transitionEl.classList.remove('active');
          resolve();
        }, 150);
      }, 200);
    });
  }

  /* 导航到指定路径 */
  async navigate(rawHash) {
    const { page, params } = this.parseHash(rawHash);

    // 如果路由未变，跳过
    const routeKey = page + JSON.stringify(params);
    if (routeKey === this.currentRoute) return;

    // 未注册的路由回退到 home
    const routeName = this.routes.has(page) ? page : 'home';
    const factory = this.routes.get(routeName);

    if (!factory) {
      console.warn(`Route "${page}" not found, redirecting to home`);
      location.hash = '#home';
      return;
    }

    await this.transition(async () => {
      // 卸载当前页面
      if (this.currentPage && typeof this.currentPage.unmount === 'function') {
        this.currentPage.unmount();
      }

      // 隐藏所有视图
      document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

      // 创建并挂载新页面
      const newPage = factory(params);
      if (newPage && typeof newPage.mount === 'function') {
        await newPage.mount();
      }

      this.currentPage = newPage;
      this.currentRoute = routeKey;

      // 更新导航高亮
      this.updateNavHighlight(routeName);

      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  /* 更新桌面端和移动端导航高亮 */
  updateNavHighlight(routeName) {
    document.querySelectorAll('[data-route]').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === routeName || (routeName === 'content' && linkRoute === 'content')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* 启动路由器 */
  start() {
    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
      this.navigate(location.hash);
    });

    // 初始导航
    this.navigate(location.hash);
  }

  /* 编程式导航 */
  go(path) {
    location.hash = path;
  }
}
