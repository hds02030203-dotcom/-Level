/**
 * QuizScreen Component (js/components/QuizScreen.js)
 * Encapsulates the entire test progress view based on prd.md Section 3.2 & design.md Section 4.2.
 */
import { ProgressBarComponent } from './ProgressBar.js';
import { QuestionCardComponent } from './QuestionCard.js';

export class QuizScreenComponent {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.onSelectOption = options.onSelectOption || (() => {});
    this.onPrevStep = options.onPrevStep || (() => {});

    this.progressBar = new ProgressBarComponent('progressContainer');
    this.questionCard = new QuestionCardComponent('quizContainer', {
      onSelectOption: (question, index) => this.onSelectOption(question, index),
      onPrevStep: () => this.onPrevStep()
    });
  }

  render(questionData, currentStep, totalSteps, selectedOptionIndex = null) {
    if (!this.container || !questionData) return;

    // 1. Render progress bar top component
    this.progressBar.render(currentStep, totalSteps);

    // 2. Prepare container layout for question card
    this.container.innerHTML = `<div id="quizContainer"></div>`;
    this.questionCard.container = document.getElementById('quizContainer');

    // 3. Render question card component
    this.questionCard.render(questionData, currentStep, selectedOptionIndex);
  }
}
