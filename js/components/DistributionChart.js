/**
 * DistributionChart Component (js/components/DistributionChart.js)
 * Renders the visual level distribution chart highlighting the user's tier.
 */
export class DistributionChartComponent {
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

  render(userResult) {
    const targetNode = this.container;
    if (!targetNode || !userResult) return;

    const userCategoryId = userResult.id;

    const tierData = [
      { id: 'GWANJANG', icon: '👑', label: '관장님 (마스터)', pct: '0.001%', barWidth: '100%', color: '#F59E0B' },
      { id: 'SABEOM', icon: '🥋', label: '사범님 (솔선수범 리더)', pct: '0.1%', barWidth: '95%', color: '#10B981' },
      { id: 'PLAYER', icon: '🥊', label: '선수 (승부사의 기상)', pct: '1.0%', barWidth: '88%', color: '#2563EB' },
      { id: 'DAN', icon: '🥋', label: '유단자 (1~5단)', pct: '12.0%', barWidth: '72%', color: '#F59E0B', group: ['DAN_1', 'DAN_2', 'DAN_3', 'DAN_4', 'DAN_5'] },
      { id: 'POOM', icon: '🏅', label: '유품자 (1~4품)', pct: '25.0%', barWidth: '60%', color: '#EF4444', group: ['POOM_1', 'POOM_2', 'POOM_3', 'POOM_4'] },
      { id: 'RED_BELT', icon: '❤️', label: '빨간 띠 (열정의 수련생)', pct: '18.0%', barWidth: '50%', color: '#EF4444' },
      { id: 'BLUE_BELT', icon: '💙', label: '파란 띠 (푸른 자신감)', pct: '17.0%', barWidth: '42%', color: '#3B82F6' },
      { id: 'YELLOW_BELT', icon: '💛', label: '노란 띠 (기초의 새싹)', pct: '15.0%', barWidth: '35%', color: '#EAB308' },
      { id: 'WHITE_BELT', icon: '🤍', label: '흰 띠 (태권도 첫걸음)', pct: '11.9%', barWidth: '28%', color: '#E2E8F0' }
    ];

    const rowsHtml = tierData.map(tier => {
      const isUserTier = (tier.id === userCategoryId) || (tier.group && tier.group.includes(userCategoryId));
      const badgeHtml = isUserTier ? `<span style="background: var(--gold-accent); color: #0F172A; padding: 2px 6px; border-radius: 99px; font-size: 0.7rem; font-weight: 900; margin-left: 4px;">👈 내 위치</span>` : '';

      return `
        <div class="chart-row ${isUserTier ? 'is-user-tier' : ''}">
          <div class="chart-row-meta">
            <span class="chart-label">${tier.icon} ${tier.label} ${badgeHtml}</span>
            <span class="chart-val">${tier.pct}</span>
          </div>
          <div class="chart-bar-bg">
            <div class="chart-bar-fill" style="width: ${tier.barWidth}; background: ${tier.color};"></div>
          </div>
        </div>
      `;
    }).join('');

    targetNode.innerHTML = `
      <div class="chart-container-card">
        <div class="chart-header">
          <div class="chart-title">📊 전체 수련생 레벨 분포도</div>
          <div class="chart-subtag">국기원 실시간 집계</div>
        </div>
        <div class="chart-list">
          ${rowsHtml}
        </div>
      </div>
    `;
  }
}
