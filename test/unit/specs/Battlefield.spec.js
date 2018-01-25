import Battlefield from "@/classes/Battlefield";

describe('Battlefield', () => {
	describe('sendFoe()', () => {
		it('should create a Foe with level based on it\'s stage', () => {
			const battlefield = new Battlefield();
			const foe = battlefield.sendFoe();
			console.log(foe)
			expect(foe.level).to.be.equal(battlefield.stage);
		})
	})


})