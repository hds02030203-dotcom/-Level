/**
 * LoadingScreen Component (js/components/LoadingScreen.js)
 * Renders the calculating/analyzing loading screen based on prd.md Section 3.3 & design.md Section 6.
 */
export class LoadingScreenComponent {
  constructor(containerId) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="glass-card loading-view">
        <div class="spinner" aria-label="내공 측정 로더"></div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: #FFFFFF; margin-top: 10px;">
          내 태권도 내공 측정 중...
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-sub); line-height: 1.5;">
          국기원 품·단 통계 데이터 및 무도 정신 항목을<br>
          기준으로 종합 분석하고 있습니다.
        </p>
      </div>
    `;
  }
}
