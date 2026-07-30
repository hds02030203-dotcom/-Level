/**
 * ResultScreen Component (js/components/ResultScreen.js)
 * Encapsulates the result view with certificate card and share action buttons.
 */
import { ResultCardComponent } from './ResultCard.js';
import { ShareSectionComponent } from './ShareSection.js';

export class ResultScreenComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this._container = null;
    this.onRestart = options.onRestart || (() => {});

    this.resultCard = new ResultCardComponent('resultCardContainer');
    this.shareSection = new ShareSectionComponent('shareContainer', {
      onRestart: () => this.onRestart()
    });
  }

  get container() {
    if (this._container) return this._container;
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  set container(val) {
    this._container = val;
  }

  render(resultData) {
    const targetNode = this.container;
    if (!targetNode || !resultData) return;

    targetNode.innerHTML = `
      <div class="result-view">
        <div id="resultCardContainer"></div>
        <div id="shareContainer"></div>
      </div>
    `;

    this.resultCard.container = targetNode.querySelector('#resultCardContainer');
    this.resultCard.render(resultData);

    this.shareSection.container = targetNode.querySelector('#shareContainer');
    this.shareSection.render(resultData);
  }
}
