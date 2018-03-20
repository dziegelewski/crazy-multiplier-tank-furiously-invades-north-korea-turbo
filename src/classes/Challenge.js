import random from 'lodash/random';
import times from 'lodash/times';
import { nonNegative } from "@/utils/functions";
let challengeId = 0;

class Challenge {
  constructor({ level = 1, numberOfFactors = 2, time = 5, factors, toThePowerOf, specials } = {}) {
    this.id = challengeId ++;
    this.level = level;
    this.numberOfFactors = numberOfFactors;
    this.maxTimeout = time;
    this.leftTimeout = time;

    this.specials = specials;
    this.factors = factors || this.generateFactors();
    this.toThePowerOf = toThePowerOf;
    this.isActive = true;
    this.userInput = [];
  }

  generateFactors() {
    return [...times(this.numberOfFactors, (factorNumber) => this.generateSingleFactor(factorNumber))];
  }

  generateSingleFactor(factorNumber) {
    const level = this.level + 3;

    const factorMin = Math.floor(level / 2);
    const factorMax = Math.ceil(level * 1.5);

    let factor = random(factorMin, factorMax);

    if (this.specials.includes('hammerFist')) {
      factor = factorNumber === 0 ? 2 : (factor * random(20, 70)); 
    }

    return factor;
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

  addHint() {
    const solutionNumbers = this.solution.toString().split('');
    const hintIndex = random(0, solutionNumbers.length - 1);
    this.hint = {
      index: hintIndex,
      value: parseInt(solutionNumbers[hintIndex], 10),
    }; 
  }

  get fields() {
    let result = Array.from(this.userInput);
    result.length = this.blanks;
    result.fill(null, this.userInput.length);
    return result;
  }

  get solution() {
    return this.factors.reduce((total, factor) => total * factor, 1) ** this.toThePowerOf;
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
