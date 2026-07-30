/**
 * Header Component
 * Renders the top logo brand bar and background sound toggle.
 */
export class HeaderComponent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.isMuted = true;
    this.onSoundToggle = options.onSoundToggle || (() => {});
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <header class="site-header">
        <a href="#" class="brand-logo" id="headerLogoBtn">
          <span>🥋 태권도 Level-test</span>
        </a>
        <button class="sound-toggle-btn" id="soundToggleBtn" title="사운드 켜기/끄기">
          ${this.isMuted ? '🔇' : '🔊'}
        </button>
      </header>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const soundBtn = this.container.querySelector('#soundToggleBtn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        soundBtn.innerHTML = this.isMuted ? '🔇' : '🔊';
        this.onSoundToggle(this.isMuted);
      });
    }

    const logoBtn = this.container.querySelector('#headerLogoBtn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
      });
    }
  }
}
