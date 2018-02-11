import Foe from '@/classes/Foe';
import { nonNegative } from '@/utils/functions';
import { northKoreaProvinces } from '@/utils/data';

class Province {
  constructor(number) {
    if (!number) throw Error('province number must be equal at least 1');

    this.number = number;
    this.name = northKoreaProvinces[number - 1];
    this.defenders = Math.floor(number * 1.5) + 4;
  }

  sendFoe() {
    if (this.isCleared) return null;
    return new Foe({
      level: this.number,
    });
  }

  looseDefender() {
    this.defenders = nonNegative(this.defenders - 1);
  }

  get isCleared() {
    return !this.defenders;
  }
}

export default Province;
