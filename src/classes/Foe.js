import Challenge from "@/classes/Challenge";
import { nonNegative } from "@/utils/functions";
import sample from "lodash/sample";

class Foe {
	constructor({ level = 1, kind = randomKind() } = {}) {
		this.level = level;
		this.hearts = kind.hearts;
		this.name = kind.name;
	}

	throwChallenge() {
		const { level } = this;
		return new Challenge({
			level
		});
	}

	hurt(damage = 1) {
		this.hearts = nonNegative(this.hearts - damage);
	}

	get isDefeated() {
		return this.hearts === 0;
	}
}

const randomKind = () => {
	return sample([
		{
			name: "Destro",
			hearts: 2
		},
		{
			name: "Nixxo",
			hearts: 1
		},
		{
			name: "Huffer",
			hearts: 1
		},
		{
			name: "Tanqo",
			hearts: 1
		},
		{
			name: "Flyer",
			hearts: 1
		},
		{
			name: "Joomper",
			hearts: 1
		}
	]);
};

export default Foe;
