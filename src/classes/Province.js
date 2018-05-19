import Foe from '@/classes/Foe';
import { getProvinceName, finalProvinceNumber } from '@/data/provinces';
import provinceFoe from '@/data/foes-in-provinces';
import { nonNegative } from '@/utils/functions';

class Province {
  constructor(number) {
    if (isNaN(number)) throw Error('Incorrect province number');

    this.number = number;
    this.name = getProvinceName(number);
    this.defenders = this.getNumberOfDefenders();
  }

  sendFoe() {
    if (this.isCleared || !this.number) return null;
    return new Foe({
      power: this.number,
      ...provinceFoe(this.number),
    });
  }

  looseDefender() {
    this.defenders = nonNegative(this.defenders - 1);
  }

  getNumberOfDefenders() {
    return this.isFinalProvince
    ? 1
    : Math.floor(this.number / 2) + 4;
  }

  get isFinalProvince() {
    return this.number === finalProvinceNumber;
  }

  get isCleared() {
    return !this.defenders;
  }
}

export default Province;
