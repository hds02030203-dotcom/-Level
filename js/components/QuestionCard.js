/**
 * QuestionCard Component
 * Renders the quiz question text, options group with press effect, and fluid question transitions.
 */
export class QuestionCardComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this._container = null;
    this.onSelectOption = options.onSelectOption || (() => {});
    this.onPrevStep = options.onPrevStep || (() => {});
    this.lastDirection = 'next';
  }

  get container() {
    if (this._container) return this._container;
    return typeof this.containerId === 'string' ? document.getElementById(this.containerId) : this.containerId;
  }

  set container(val) {
    this._container = val;
  }

  render(questionData, currentStep, selectedOptionIndex = null) {
    const targetNode = this.container;
    if (!targetNode || !questionData) return;

    const optionsHtml = questionData.options.map((opt, idx) => `
      <button class="option-card ${selectedOptionIndex === idx ? 'selected' : ''}" data-index="${idx}">
        <span class="option-index">${idx + 1}</span>
        <span class="option-text">${opt.text}</span>
      </button>
    `).join('');

    const backButtonHtml = currentStep > 1 
      ? `<button class="btn-back" id="prevQuestionBtn">← 이전 질문으로</button>` 
      : `<span></span>`;

    const animClass = this.lastDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';

    targetNode.innerHTML = `
      <div class="glass-card quiz-view ${animClass}">
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
    const targetNode = this.container;
    if (!targetNode) return;

    const quizView = targetNode.querySelector('.quiz-view');
    const optionBtns = targetNode.querySelectorAll('.option-card');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Immediate press feedback
        btn.classList.add('clicking');
        btn.classList.add('selected');

        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.lastDirection = 'next';

        if (quizView) {
          quizView.classList.remove('slide-in-right', 'slide-in-left');
          quizView.classList.add('slide-out-left');
        }

        setTimeout(() => {
          this.onSelectOption(questionData, index);
        }, 180);
      });
    });

    const prevBtn = targetNode.querySelector('#prevQuestionBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.lastDirection = 'prev';

        if (quizView) {
          quizView.classList.remove('slide-in-right', 'slide-in-left');
          quizView.classList.add('slide-out-right');
        }

        setTimeout(() => {
          this.onPrevStep();
        }, 180);
      });
    }
  }
}
