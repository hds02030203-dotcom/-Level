/**
 * ResultCard Component
 * Renders the official Taekwondo level certificate result card linked with User Name & Dojang.
 */
export class ResultCardComponent {
  constructor(containerId) {
    this.containerId = containerId;
  }

  get container() {
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  render(resultData) {
    if (!this.container || !resultData) return;

    let certTitle = '태권도 레벨 공식 인증서';
    if (resultData.userName && resultData.userDojang) {
      certTitle = `[ ${resultData.userDojang} ] ${resultData.userName} 님의 레벨 인증서`;
    } else if (resultData.userName) {
      certTitle = `${resultData.userName} 님의 태권도 레벨 인증서`;
    } else if (resultData.userDojang) {
      certTitle = `[ ${resultData.userDojang} ] 수련생의 레벨 인증서`;
    }

    this.container.innerHTML = `
      <div class="certificate-card" id="certificateCardNode">
        <div style="font-size: 0.85rem; font-weight: 800; color: #94A3B8; margin-bottom: 8px; letter-spacing: -0.2px;">
          🥋 ${certTitle}
        </div>
        <div class="top-percent-tag">🔥 ${resultData.topPercent}</div>
        <div class="belt-badge-icon">${resultData.icon}</div>
        <h2 class="result-belt-title">${resultData.type}</h2>
        <div class="result-subtitle">부칭호: ${resultData.subTitle}</div>
        
        <p class="result-desc">${resultData.description}</p>
        <p style="font-style: italic; color: var(--gold-glow); font-size: 0.85rem; margin-bottom: 16px;">
          ${resultData.quote}
        </p>

        <div class="chemistry-box" style="grid-template-columns: 1fr;">
          <div class="chem-card chem-best">
            <div class="chem-title">💖 환상의 짝꿍</div>
            <div class="chem-value">${resultData.bestMatch}</div>
          </div>
        </div>
      </div>
    `;
  }
}
