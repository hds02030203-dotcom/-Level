/**
 * ResultScreen Component (js/components/ResultScreen.js)
 * Encapsulates the entire result view based on prd.md Section 3.4 & design.md Section 4.3.
 */
import { ResultCardComponent } from './ResultCard.js';
import { ShareSectionComponent } from './ShareSection.js';

export class ResultScreenComponent {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.onRestart = options.onRestart || (() => {});

    this.resultCard = new ResultCardComponent('resultCardContainer');
    this.shareSection = new ShareSectionComponent('shareContainer', {
      onRestart: () => this.onRestart()
    });
  }

  render(resultData) {
    if (!this.container || !resultData) return;

    this.container.innerHTML = `
      <div class="result-view">
        <div id="resultCardContainer"></div>
        <div id="shareContainer"></div>
      </div>
    `;

    this.resultCard.container = document.getElementById('resultCardContainer');
    this.resultCard.render(resultData);

    this.shareSection.container = document.getElementById('shareContainer');
    this.shareSection.render(resultData);
  }
}
