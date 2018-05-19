import random from "lodash/random";
import times from "lodash/times";
import { nonNegative } from "@/utils/functions";

let challengeId = 0;

class Challenge {
  constructor({
    level = 1,
    numberOfFactors = 2,
    time = 5,
    extraTime = 0,
    factors,
    toThePowerOf,
    factorsModifiers,
    specials = [],
  } = {}) {
    this.id = challengeId++;
    this.level = level;
    this.specials = specials;
    this.numberOfFactors = numberOfFactors;

    time += extraTime;
    this.extraTime = extraTime;
    this.maxTimeout = time;
    this.leftTimeout = time;
    this.secretTimeout = this.specials.includes('secretTimeout');


    this.factorsModifiers = factorsModifiers;
    this.factors = factors || this.generateFactors();
    this.toThePowerOf = toThePowerOf;
    this.userInput = [];
  }

  generateFactors() {
    return [
      ...times(this.numberOfFactors, factorIndex =>
        this.generateSingleFactor(factorIndex),
      ),
    ];
  }

  generateSingleFactor(factorIndex) {
    let factor = random(this.minFactorValue, this.maxFactorValue);
    factor = this.modifiedFactor(factor, factorIndex);
    return factor;
  }

  get minFactorValue() {
    return Math.floor(this.level / 3) + 1;
  }

  get maxFactorValue() {
    return Math.ceil(this.level * 1.25) + 2;
  }

  modifiedFactor(factor, factorIndex) {
    const modifiers = this.factorsModifiers;
    if (modifiers) {
      if (typeof modifiers === "function") {
        factor = modifiers(factor);
      } else if (modifiers.hasOwnProperty(factorIndex)) {
        factor = modifiers[factorIndex](factor);
      }
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
    return parseInt(arrayOfNumbers.join(""), 10);
  }

  attempt() {
    const userAnswer = this.convertInput(this.userInput);
    return userAnswer === this.solution;
  }

  resetTimeout() {
    if (!this.specials.includes('noTimeRecover')) {
      this.leftTimeout = this.maxTimeout;
    }
  }

  restart() {
    this.userInput = [];
  }

  countdown() {
    this.leftTimeout = nonNegative(this.leftTimeout - 1);
  }

  addHint() {
    const solutionNumbers = this.solution.toString().split("");
    const hintIndex = random(0, solutionNumbers.length - 1);
    this.hint = {
      index: hintIndex,
      value: parseInt(solutionNumbers[hintIndex], 10),
    };
  }

  get fields() {
    const result = Array.from(this.userInput);
    result.length = this.blanks;
    result.fill(null, this.userInput.length);
    return result;
  }

  get solution() {
    return (
      this.factors.reduce((total, factor) => total * factor, 1) **
      this.toThePowerOf
    );
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
