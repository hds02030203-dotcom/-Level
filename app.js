/**
 * Main Application Entry Point & State Machine (app.js)
 * Modular component orchestration for Taekwondo Level Test.
 */
import { QUESTIONS } from './js/data/questions.js';
import { RESULT_TYPES } from './js/data/results.js';

import { HeaderComponent } from './js/components/Header.js';
import { StartScreenComponent } from './js/components/StartScreen.js';
import { QuizScreenComponent } from './js/components/QuizScreen.js';
import { LoadingScreenComponent } from './js/components/LoadingScreen.js';
import { ResultScreenComponent } from './js/components/ResultScreen.js';

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

    this.quizScreen = new QuizScreenComponent('mainContainer', {
      onSelectOption: (question, optionIndex) => this.handleOptionSelect(question, optionIndex),
      onPrevStep: () => this.handlePrevStep()
    });

    this.loadingScreen = new LoadingScreenComponent('mainContainer');

    this.resultScreen = new ResultScreenComponent('mainContainer', {
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
      const previousSelectedIndex = this.answers[this.currentStep] !== undefined 
        ? this.answers[this.currentStep] 
        : null;

      this.quizScreen.container = mainContainer;
      this.quizScreen.render(question, this.currentStep + 1, QUESTIONS.length, previousSelectedIndex);

    } else if (this.state === 'LOADING') {
      document.getElementById('progressContainer').innerHTML = '';
      this.loadingScreen.container = mainContainer;
      this.loadingScreen.render();

      setTimeout(() => {
        this.calculateResult();
        this.state = 'RESULT';
        this.render();
      }, 1500);

    } else if (this.state === 'RESULT') {
      document.getElementById('progressContainer').innerHTML = '';
      this.resultScreen.container = mainContainer;
      this.resultScreen.render(this.finalResult);
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
