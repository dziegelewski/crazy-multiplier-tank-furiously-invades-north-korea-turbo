import Province from "@/classes/Province";

describe('Province', () => {
	describe('sendFoe()', () => {
		it('should create a Foe with level based on it\'s stage', () => {
			const province = new Province(1);
			const foe = province.sendFoe();
			console.log(foe)
			expect(foe.level).to.be.equal(province.stage);
		})
	})
})