import Foe from "@/classes/Foe";

describe('Foe', () => {
	describe('constructor', () => {
		it('should has a kind declared during creating', () => {
			const kind = 'tank1';
			const foe = new Foe({ kind });
			expect(foe.kind).to.be.equal(kind);
		})
	})
	describe('#challenge', () => {
		it('should return a challenge based on Foe\'s level', () => {

			const foeLevel = 4;
			const foe = new Foe({ level: foeLevel });
			const challenge = foe.challenge();

			expect(challenge.level).to.be.equal(foeLevel);
		})
	})
})