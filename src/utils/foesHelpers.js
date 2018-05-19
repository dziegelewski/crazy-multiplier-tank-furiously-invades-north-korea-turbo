import random from 'lodash/random';

export const more = difference => val => val + difference;

export const less = difference => val => val - difference;

export const multiply = multiplier => val => Math.ceil(val * multiplier);

export const always = val => () => val;

export const randomModifier = (downTo, upTo) => val => val + random(downTo, upTo);

export const multiplyRandomly = (from, to) => val => val * random(from, to);

export const jokerShot = () => {
  switch (random(0, 10)) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 10:
      return 10;
    default:
      return random(2, 4);
  }
};
