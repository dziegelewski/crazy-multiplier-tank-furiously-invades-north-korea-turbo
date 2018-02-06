import Challenge from "@/classes/Challenge";
import times from "lodash/times";
import sinon from "sinon";

function easyChallenge() {
	return new Challenge({
		factors: [5, 5]
	})
}

function hardChallenge() {
		return new Challenge({
		factors: [10, 100, 10]
	})
}


describe("Challenge", () => {
	describe("#factors", () => {
		const factors = new Challenge().factors;

		it("should be an array containing at least two items", () => {
			expect(factors).to.be.an("array");
			expect(factors).to.be.lengthOf.at.least(2);
		});

		it("should contains only integers", () => {
			expect(factors.every(item => Number.isInteger(item))).to.be.true;
		});
	});

	describe("#solution", () => {
		it("should return a result of multiplying of all factors", () => {
			const challenge = new Challenge();

			const tests = [
				{ factors: [5, 10], solution: 50 },
				{ factors: [5, 0], solution: 0 },
				{ factors: [5, 5, 5], solution: 125 },
				{ factors: [1, 1, 1, 1], solution: 1 }
			];

			tests.forEach(test => {
				challenge.factors = test.factors;
				expect(challenge.solution).to.be.equal(test.solution);
			});
		});
	});

	describe("#blanks", () => {
		it("should return correct number of blanks depending on the soultion's number of digits", () => {
			const challenge = easyChallenge();

			const tests = [
				{ factors: [1, 1], blanks: 1 },
				{ factors: [1, 10], blanks: 2 },
				{ factors: [1, 100], blanks: 3 },
				{ factors: [5, 30], blanks: 3 }
			];
			tests.forEach(test => {
				challenge.factors = test.factors;
				expect(challenge.blanks).to.be.equal(test.blanks);
			});
		});
	});

	describe("#input()", () => {
		it("should add user input to playerInput array", () => {
			const challenge = easyChallenge();
			const input = 9
			challenge.input(input);
			expect(challenge.userInput[0]).to.be.equal(input);
		});

		it('incorrect input value should throw an error', () => {
			const challenge = hardChallenge();

			const tests = [-1, 10, 'b', Math.PI, 100];
			tests.forEach(incorrectValue => {
				const pushIncorrectValue = challenge.input.bind(challenge, incorrectValue);
				expect(pushIncorrectValue).to.throw();
			});

		})
	});

	describe("#onInputReady", () => {
		it('should clean userInput', () => {
			const challenge = hardChallenge();
			challenge.input(1);
			challenge.input(1);
			challenge.input(1);
		})
	});

	describe("#convertInput()", () => {
		it("should return an integer made out of array's items", () => {
			const tests = [
				{ inputs: [1, 0], result: 10 },
				{ inputs: [1, 9], result: 19 },
				{ inputs: [5, 3], result: 53 },
				{ inputs: [7, 3, 1], result: 731 }
			];
			tests.forEach(test => {
				expect(Challenge.prototype.convertInput(test.inputs)).to.be.equal(
					test.result
				);
			});
		});
	});
});
