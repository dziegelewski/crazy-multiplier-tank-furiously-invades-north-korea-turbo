import Foe from "@/classes/Foe";
import { nonNegative } from '@/utils/functions';


class Province {
	constructor(number) {
		if (!number) throw 'province number must be equal at least 1';

		this.number = number;
		this.name = northKoreaProvinces[number - 1];
		this.guardians = Math.floor(number * 1.5 + 4);
		this.guardians = 1;
	}

	sendFoe() {
		if (this.isCleared) return null;
		return new Foe({
			level: this.number
		})
	}

	looseGuardian() {
		this.guardians = nonNegative(this.guardians - 1);
	}

	get isCleared() {
		return !this.guardians;
	}

}

const northKoreaProvinces = [
	'Bijjong',
	'Kong-Pa',
	'Hjiomn',
	'Skyyl',
]

export default Province;

