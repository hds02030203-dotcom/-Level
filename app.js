/**
 * Main Application Entry Point & State Machine (app.js)
 * Modular component orchestration for Taekwondo Level Test.
 */
import { QUESTIONS } from './js/data/questions.js';
import { RESULT_TYPES } from './js/data/results.js';

import { HeaderComponent } from './js/components/Header.js';
import { StartScreenComponent } from './js/components/StartScreen.js';
import { ProgressBarComponent } from './js/components/ProgressBar.js';
import { QuestionCardComponent } from './js/components/QuestionCard.js';
import { ResultCardComponent } from './js/components/ResultCard.js';
import { ShareSectionComponent } from './js/components/ShareSection.js';

class App {
  constructor() {
    this.state = 'START'; // 'START' | 'QUIZ' | 'LOADING' | 'RESULT'
    this.currentStep = 0;
    this.answers = [];
    this.scores = {};
    this.finalResult = null;

    this.initComponents();
    this.render();
  }

  initComponents() {
    this.header = new HeaderComponent('headerContainer', {
      onSoundToggle: (isMuted) => {
        console.log('Sound toggled. Muted:', isMuted);
      }
    });

    this.startScreen = new StartScreenComponent('mainContainer', {
      onStart: () => {
        this.state = 'QUIZ';
        this.currentStep = 0;
        this.answers = [];
        this.scores = {};
        this.render();
      }
    });

    this.progressBar = new ProgressBarComponent('progressContainer');

    this.questionCard = new QuestionCardComponent('quizContainer', {
      onSelectOption: (question, optionIndex) => this.handleOptionSelect(question, optionIndex),
      onPrevStep: () => this.handlePrevStep()
    });

    this.resultCard = new ResultCardComponent('resultCardContainer');

    this.shareSection = new ShareSectionComponent('shareContainer', {
      onRestart: () => this.handleRestart()
    });
  }

  render() {
    this.header.render();

    const mainContainer = document.getElementById('mainContainer');

    if (this.state === 'START') {
      document.getElementById('progressContainer').innerHTML = '';
      this.startScreen.container = mainContainer;
      this.startScreen.render();

    } else if (this.state === 'QUIZ') {
      const question = QUESTIONS[this.currentStep];
      this.progressBar.render(this.currentStep + 1, QUESTIONS.length);

      mainContainer.innerHTML = `<div id="quizContainer"></div>`;
      this.questionCard.container = document.getElementById('quizContainer');
      const previousSelectedIndex = this.answers[this.currentStep] !== undefined 
        ? this.answers[this.currentStep] 
        : null;

      this.questionCard.render(question, this.currentStep + 1, previousSelectedIndex);

    } else if (this.state === 'LOADING') {
      document.getElementById('progressContainer').innerHTML = '';
      mainContainer.innerHTML = `
        <div class="glass-card loading-view">
          <div class="spinner"></div>
          <h2 style="font-size: 1.3rem; font-weight: 800; color: #fff;">내 태권도 내공 측정 중...</h2>
          <p style="font-size: 0.9rem; color: var(--text-sub);">국기원 품·단 통계 데이터를 기준으로 분석하고 있습니다.</p>
        </div>
      `;

      setTimeout(() => {
        this.calculateResult();
        this.state = 'RESULT';
        this.render();
      }, 1500);

    } else if (this.state === 'RESULT') {
      document.getElementById('progressContainer').innerHTML = '';
      mainContainer.innerHTML = `
        <div class="result-view">
          <div id="resultCardContainer"></div>
          <div id="shareContainer"></div>
        </div>
      `;

      this.resultCard.container = document.getElementById('resultCardContainer');
      this.resultCard.render(this.finalResult);

      this.shareSection.container = document.getElementById('shareContainer');
      this.shareSection.render(this.finalResult);
    }
  }

  handleOptionSelect(question, optionIndex) {
    const selectedOption = question.options[optionIndex];
    this.answers[this.currentStep] = optionIndex;

    const targetType = selectedOption.target;
    this.scores[targetType] = (this.scores[targetType] || 0) + 1;

    if (this.currentStep < QUESTIONS.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.state = 'LOADING';
      this.render();
    }
  }

  handlePrevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  handleRestart() {
    this.state = 'START';
    this.currentStep = 0;
    this.answers = [];
    this.scores = {};
    this.finalResult = null;
    this.render();
  }

  calculateResult() {
    let topCategory = 'WHITE_BELT';
    let maxScore = -1;

    for (const [type, score] of Object.entries(this.scores)) {
      if (score > maxScore) {
        maxScore = score;
        topCategory = type;
      }
    }

    this.finalResult = RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT;
  }
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
