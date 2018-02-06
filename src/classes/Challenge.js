import random from "lodash/random";
import times from "lodash/times";

class Challenge {
	constructor({ level = 1, numberOfFactors = 2, timeout = 5000, factors, prize } = {}) {

		this.level = level;
		this.numberOfFactors = numberOfFactors;
		this.timeout = timeout;

		this.factors = factors || this.generateFactors();
		this.prize = prize || this.calculatePrize();
		this.isActive = true;
		this.userInput = [];
	}

	generateFactors() {
		return [...times(this.numberOfFactors, () => this.generateSingleFactor() )];
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
		} else {
			throw new TypeError(`User input ${value} is not a single digit`);
		}
	}

	convertInput(arrayOfNumbers) {
		return parseInt(arrayOfNumbers.join(""));
	}


	attempt() {
		const userAnswer = this.convertInput(this.userInput);
		return userAnswer === this.solution;
	}

	restart() {
		this.userInput = [];
	}

	get solution() {
		return this.factors.reduce((total, factor) => {
			return total * factor;
		}, 1);
	}

	get blanks() {
		return this.solution.toString().length;
	}

	get inputFull() {
		return this.userInput.length === this.blanks;
	}
}

export default Challenge;
