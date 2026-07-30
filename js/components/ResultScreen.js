/**
 * ResultScreen Component (js/components/ResultScreen.js)
 * Encapsulates the entire result view with certificate card, share action buttons, and level distribution chart.
 */
import { ResultCardComponent } from './ResultCard.js';
import { ShareSectionComponent } from './ShareSection.js';
import { DistributionChartComponent } from './DistributionChart.js';

export class ResultScreenComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.onRestart = options.onRestart || (() => {});

    this.resultCard = new ResultCardComponent('resultCardContainer');
    this.shareSection = new ShareSectionComponent('shareContainer', {
      onRestart: () => this.onRestart()
    });
    this.distributionChart = new DistributionChartComponent('distributionChartContainer');
  }

  get container() {
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  render(resultData) {
    if (!this.container || !resultData) return;

    this.container.innerHTML = `
      <div class="result-view">
        <div id="resultCardContainer"></div>
        <div id="shareContainer"></div>
        <div id="distributionChartContainer"></div>
      </div>
    `;

    this.resultCard.container = document.getElementById('resultCardContainer');
    this.resultCard.render(resultData);

    this.shareSection.container = document.getElementById('shareContainer');
    this.shareSection.render(resultData);

    this.distributionChart.container = document.getElementById('distributionChartContainer');
    this.distributionChart.render(resultData);
  }
}
