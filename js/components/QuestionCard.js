/**
 * QuestionCard Component
 * Renders the quiz question text, options group, and navigation buttons.
 */
export class QuestionCardComponent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSelectOption = options.onSelectOption || (() => {});
    this.onPrevStep = options.onPrevStep || (() => {});
  }

  render(questionData, currentStep, selectedOptionIndex = null) {
    if (!this.container || !questionData) return;

    const optionsHtml = questionData.options.map((opt, idx) => `
      <button class="option-card ${selectedOptionIndex === idx ? 'selected' : ''}" data-index="${idx}">
        <span class="option-index">${idx + 1}</span>
        <span class="option-text">${opt.text}</span>
      </button>
    `).join('');

    const backButtonHtml = currentStep > 1 
      ? `<button class="btn-back" id="prevQuestionBtn">← 이전 질문으로</button>` 
      : `<span></span>`;

    this.container.innerHTML = `
      <div class="glass-card quiz-view">
        <h2 class="question-text">${questionData.question}</h2>
        <div class="options-group">
          ${optionsHtml}
        </div>
        <div class="nav-buttons">
          ${backButtonHtml}
        </div>
      </div>
    `;

    this.bindEvents(questionData);
  }

  bindEvents(questionData) {
    const optionBtns = this.container.querySelectorAll('.option-card');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.onSelectOption(questionData, index);
      });
    });

    const prevBtn = this.container.querySelector('#prevQuestionBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.onPrevStep();
      });
    }
  }
}
