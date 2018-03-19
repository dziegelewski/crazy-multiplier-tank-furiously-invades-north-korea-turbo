import Foe from '@/classes/Foe';
import provincesNames from '@/data/north-korea-provinces';
import provinceFoe from '@/data/foes-in-provinces';
import sample from "lodash/sample";
import { nonNegative } from '@/utils/functions';


class Province {
  constructor(number) {
    if (!number) throw Error('province number must be equal at least 1');

    this.number = number;
    this.name = provincesNames[number - 1];
    this.defenders = Math.floor(number * 1.5) + 2;
  }

  sendFoe() {
    if (this.isCleared) return null;
    return new Foe({
      power: this.number,
      kind: provinceFoe(this.number),
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
