import random from "lodash/random";
import times from "lodash/times";

class Challenge {
	constructor({ level, numberOfFactors = 2 } = {}) {
		this.numberOfFactors = numberOfFactors;
		this.userInput = [];
		this.factors = this.generateFactors();

		this.maxTime = 5;
		this.time = this.maxTime;

		this.isActive = true;
	}

	generateFactors() {
		return [...times(this.numberOfFactors, () => random(1, 5))];
	}

	input(value) {
		if (this.validateInput(value)) {
			this.userInput.push(value);
			if (this.inputReady) this.onInputReady();
		}
	}

	validateInput(value) {
		if (Number.isInteger(value) && value >= 0 && value <= 9) {
			return true;
		} else {
			throw new TypeError(`User input ${value} is not a single digit`);
		}
	}

	onInputReady() {
		const userAnswer = this.convertInput(this.userInput);
		this.userInput = [];
		this.attempt(userAnswer);
	}

	attempt(answer) {
		if (answer === this.solution) {
		}
	}

	convertInput(arrayOfNumbers) {
		return parseInt(arrayOfNumbers.join(""));
	}

	get solution() {
		return this.factors.reduce((total, factor) => {
			return total * factor;
		}, 1);
	}

	get blanks() {
		return this.solution.toString().length;
	}

	get inputReady() {
		return this.userInput.length === this.blanks;
	}
}

export default Challenge;
