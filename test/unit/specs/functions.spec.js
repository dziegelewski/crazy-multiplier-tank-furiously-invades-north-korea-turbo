import { nonNegative } from '@/utils/functions';

describe('nonNegative()', () => {
	it('returns 3 when gets 3', () => {
		expect(nonNegative(3)).to.be.equal(3)
	})

	it('returns 0 when gets -3', () => {
		expect(nonNegative(-3)).to.be.equal(0)
	})

	it('returns 0 when gets -0', () => {
		expect(nonNegative(0)).to.be.equal(0)
	})
})