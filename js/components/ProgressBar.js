/**
 * ProgressBar Component
 * Renders animated progress bar and counter for quiz steps.
 */
export class ProgressBarComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(currentStep, totalSteps) {
    if (!this.container) return;

    const percentage = Math.round((currentStep / totalSteps) * 100);

    this.container.innerHTML = `
      <div class="progress-container">
        <div class="progress-header">
          <span>진행률</span>
          <span class="progress-counter">Q. ${String(currentStep).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${percentage}%;"></div>
        </div>
      </div>
    `;
  }
}
