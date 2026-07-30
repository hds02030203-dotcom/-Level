/**
 * Header Component
 * Renders the clean top brand logo bar.
 */
export class HeaderComponent {
  constructor(containerId) {
    this.containerId = containerId;
    this._container = null;
  }

  get container() {
    if (this._container) return this._container;
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  set container(val) {
    this._container = val;
  }

  render() {
    const targetNode = this.container;
    if (!targetNode) return;

    targetNode.innerHTML = `
      <header class="site-header">
        <a href="#" class="brand-logo" id="headerLogoBtn">
          <span>🥋 태권도 LEVEL</span>
          <span class="brand-badge">TEST</span>
        </a>
      </header>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const targetNode = this.container;
    if (!targetNode) return;

    const logoBtn = targetNode.querySelector('#headerLogoBtn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
      });
    }
  }
}
