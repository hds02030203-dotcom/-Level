/**
 * ResultCard Component
 * Renders the official Taekwondo level certificate result card.
 */
export class ResultCardComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(resultData) {
    if (!this.container || !resultData) return;

    this.container.innerHTML = `
      <div class="certificate-card" id="certificateCardNode">
        <div class="top-percent-tag">🔥 국기원 통계 ${resultData.topPercent}</div>
        <div class="belt-badge-icon">${resultData.icon}</div>
        <h2 class="result-belt-title">${resultData.type}</h2>
        <div class="result-subtitle">부칭호: ${resultData.subTitle}</div>
        
        <p class="result-desc">${resultData.description}</p>
        <p style="font-style: italic; color: var(--gold-glow); font-size: 0.85rem; margin-bottom: 16px;">
          ${resultData.quote}
        </p>

        <div class="chemistry-box">
          <div class="chem-card chem-best">
            <div class="chem-title">💖 환상의 짝꿍</div>
            <div class="chem-value">${resultData.bestMatch}</div>
          </div>
          <div class="chem-card chem-worst">
            <div class="chem-title">💔 환장의 짝꿍</div>
            <div class="chem-value">${resultData.worstMatch}</div>
          </div>
        </div>
      </div>
    `;
  }
}
