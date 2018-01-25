import Challenge from '@/classes/Challenge';

class Foe {
	constructor({ level = 1, kind } = {}) {
		this.level = level;
		this.kind = kind;
	}

	challenge() {
		const { level } = this;
		return new Challenge({
			level
		})
	}


}

export default Foe;