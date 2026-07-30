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
    this.header = new HeaderComponent('headerContainer');

    this.userInfo = { userName: '', userDojang: '' };

    this.startScreen = new StartScreenComponent('mainContainer', {
      onStart: (userInfo = {}) => {
        this.userInfo = userInfo;
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

    // Special scoring for Q16 Certification Question
    if (question.id === 16) {
      if (optionIndex === 0) {
        // 2개 다 소유: 최고 가점 (+3)
        this.scores['GWANJANG'] = (this.scores['GWANJANG'] || 0) + 3;
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 3;
      } else if (optionIndex === 1) {
        // 둘 중 1개 소유: 높은 가점 (+2)
        this.scores['SABEOM'] = (this.scores['SABEOM'] || 0) + 2;
        this.scores['DAN_4'] = (this.scores['DAN_4'] || 0) + 2;
      } else if (optionIndex === 2) {
        // 품/단증 보유: 기본 점수 (+1)
        this.scores['DAN_1'] = (this.scores['DAN_1'] || 0) + 1;
      } else {
        // 자격증 없음: 노란 띠 (+1)
        this.scores['YELLOW_BELT'] = (this.scores['YELLOW_BELT'] || 0) + 1;
      }
    } else {
      const targetType = selectedOption.target;
      this.scores[targetType] = (this.scores[targetType] || 0) + 1;
    }

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

    // Check Q16 Certification Answer (index for Q16)
    const q16Index = QUESTIONS.findIndex(q => q.id === 16);
    const q16AnswerIndex = q16Index !== -1 ? this.answers[q16Index] : undefined;

    const hasBothCerts = (q16AnswerIndex === 0);
    const hasOneCert = (q16AnswerIndex === 0 || q16AnswerIndex === 1);

    // Business Rule Enforcement:
    // 1. 관장님(GWANJANG): 반드시 2개 다 소유해야 가능! (미소유 시 사범님/5단으로 조정)
    if (topCategory === 'GWANJANG' && !hasBothCerts) {
      topCategory = hasOneCert ? 'SABEOM' : 'DAN_5';
    }

    // 2. 사범님(SABEOM): 자격증 1개 이상 소유 시 가능! (미소유 시 4단으로 조정)
    if (topCategory === 'SABEOM' && !hasOneCert) {
      topCategory = 'DAN_4';
    }

    this.finalResult = {
      ...(RESULT_TYPES[topCategory] || RESULT_TYPES.WHITE_BELT),
      userName: this.userInfo.userName || '',
      userDojang: this.userInfo.userDojang || ''
    };
  }
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
