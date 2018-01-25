import Foe from "@/classes/Foe";

class Battlefield {
	constructor({
		stage = 1
	} = {}) {
		this.stage = stage;
	}

	sendFoe() {
		const { stage } = this; 
		return new Foe({
			level: stage
		})
	}

}

export default Battlefield;

