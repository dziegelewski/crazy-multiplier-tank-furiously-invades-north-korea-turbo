import Foe from '@/classes/Foe';
import provinces, { finalProvinceNumber } from '@/data/provinces';
import provinceFoe from '@/data/foes-in-provinces';
import sample from "lodash/sample";
import { nonNegative } from '@/utils/functions';


class Province {
  constructor(number) {
    if (!number) throw Error('province number must be equal at least 1');

    this.number = number;
    this.name = provinces[number - 1];
    this.defenders = this.getNumberOfDefenders();
  }

  sendFoe() {
    if (this.isCleared) return null;
    return new Foe({
      power: this.number,
      ...provinceFoe(this.number),
    });
  }

  looseDefender() {
    this.defenders = nonNegative(this.defenders - 1);
  }

  getNumberOfDefenders() {
    return  this.isFinalProvince
    ? 1
    : Math.floor(this.number * 1.5) + 2;
  }

  get isFinalProvince() {
    return this.number === finalProvinceNumber;
  }

  get isCleared() {
    return !this.defenders;
  }
}

export default Province;
