/**
 * DistributionChart Component (js/components/DistributionChart.js)
 * Renders the visual level distribution chart strictly based on official Kukkiwon (국기원 12,392,213명) data.
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
      { id: 'GWANJANG', icon: '👑', label: '관장님 (국기원 9단 마스터)', pct: '상위 0.01% (1,612명)', barWidth: '100%', color: '#F59E0B' },
      { id: 'SABEOM', icon: '🥋', label: '사범님 (지도자 자격 소지자)', pct: '상위 0.7% (82,961명)', barWidth: '94%', color: '#10B981' },
      { id: 'PLAYER', icon: '🥊', label: '선수 (엘리트 선수 현황)', pct: '상위 1.5%', barWidth: '86%', color: '#2563EB' },
      { id: 'DAN', icon: '🥋', label: '유단자 (1~5단 총 5,648,833명)', pct: '상위 3.5%~45.6%', barWidth: '76%', color: '#F59E0B', group: ['DAN_1', 'DAN_2', 'DAN_3', 'DAN_4', 'DAN_5'] },
      { id: 'POOM', icon: '🏅', label: '유품자 (1~4품 총 6,743,380명)', pct: '상위 10.0%~54.4%', barWidth: '64%', color: '#EF4444', group: ['POOM_1', 'POOM_2', 'POOM_3', 'POOM_4'] },
      { id: 'RED_BELT', icon: '❤️', label: '빨간 띠 (예비 유품단자)', pct: '상위 65.0%', barWidth: '50%', color: '#EF4444' },
      { id: 'BLUE_BELT', icon: '💙', label: '파란 띠 (중급 수련생)', pct: '상위 78.0%', barWidth: '40%', color: '#3B82F6' },
      { id: 'YELLOW_BELT', icon: '💛', label: '노란 띠 (기초 수련생)', pct: '상위 88.0%', barWidth: '30%', color: '#EAB308' },
      { id: 'WHITE_BELT', icon: '🤍', label: '흰 띠 (태권도 입문자)', pct: '상위 100.0%', barWidth: '20%', color: '#E2E8F0' }
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
          <div class="chart-title">📊 국내·해외 국기원 공식 유품단자 통계 현황</div>
          <div class="chart-subtag">국기원 1,239만 명 통계 기반</div>
        </div>
        <div class="chart-list">
          ${rowsHtml}
        </div>
      </div>
    `;
  }
}
