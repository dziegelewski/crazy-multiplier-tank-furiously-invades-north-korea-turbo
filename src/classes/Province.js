import Foe from '@/classes/Foe';
import provincesNames from '@/data/north-korea-provinces';
import foesKinds from '@/data/foes-kinds';
import sample from "lodash/sample";
import { nonNegative } from '@/utils/functions';


class Province {
  constructor(number) {
    if (!number) throw Error('province number must be equal at least 1');

    this.number = number;
    this.name = provincesNames[number - 1];
    this.defenders = Math.floor(number * 1.5) + 4;
  }

  sendFoe() {
    if (this.isCleared) return null;
    return new Foe({
      power: this.number,
      kind: this.chooseDefenderKind(),
    });
  }

  looseDefender() {
    this.defenders = nonNegative(this.defenders - 1);
  }


  chooseDefenderKind() {
    return sample(this.availableDefenders);
  }

  get availableDefenders() {
    const strongestDefender = Math.floor(this.number / 2) + 2;
    return foesKinds.slice(0, strongestDefender);
  }

  get isCleared() {
    return !this.defenders;
  }
}

export default Province;
