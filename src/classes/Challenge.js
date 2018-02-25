import random from 'lodash/random';
import times from 'lodash/times';
import { nonNegative } from "@/utils/functions";
let challengeId = 0;

class Challenge {
  constructor({ level = 1, numberOfFactors = 2, timeout = 5, factors, prize } = {}) {
    this.id = challengeId ++;
    this.level = level;
    this.numberOfFactors = numberOfFactors;
    this.maxTimeout = timeout;
    this.leftTimeout = timeout;

    this.factors = factors || this.generateFactors();
    this.prize = prize || this.calculatePrize();
    this.isActive = true;
    this.userInput = [];
  }

  generateFactors() {
    return [...times(this.numberOfFactors, () => this.generateSingleFactor())];
  }

  generateSingleFactor() {
    const level = this.level + 3;

    const factorMin = Math.floor(level / 2);
    const factorMax = Math.ceil(level * 1.5);
    return random(factorMin, factorMax);
  }

  calculatePrize() {
    return this.level * 100;
  }

  input(value) {
    if (this.validateInput(value) && !this.inputFull) {
      this.userInput.push(value);
    }
  }

  undo() {
    this.userInput.pop();
  }

  validateInput(value) {
    if (Number.isInteger(value) && value >= 0 && value <= 9) {
      return true;
    }
    throw new TypeError(`User input ${value} is not a single digit`);
  }

  convertInput(arrayOfNumbers) {
    return parseInt(arrayOfNumbers.join(''), 10);
  }


  attempt() {
    const userAnswer = this.convertInput(this.userInput);
    return userAnswer === this.solution;
  }

  resetTimeout() {
    this.leftTimeout = this.maxTimeout;
  }

  restart() {
    this.userInput = [];
  }

  secondPassed() {
    this.leftTimeout = nonNegative(this.leftTimeout - 1);
  }

  get solution() {
    return this.factors.reduce((total, factor) => total * factor, 1);
  }

  get blanks() {
    return this.solution.toString().length;
  }

  get inputFull() {
    return this.userInput.length === this.blanks;
  }

  get timeOver() {
    return !this.leftTimeout;
  }
}

export default Challenge;
