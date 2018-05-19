import Vehicle from "@/classes/Vehicle";
import Challenge from "@/classes/Challenge";
import { identity } from "@/utils/functions";

const BASE_CHALLENGE_TIME = 5;

class Foe extends Vehicle {
  constructor({
    power,
    name,
    hearts,
    attackType,
    toThePowerOf = 1,
    numberOfFactors = 2,
    factorsModifiers,
    timeModifier = identity,
    score,
    specials = [],
  }) {
    super({ name, hearts });

    this.power = power;
    this.attackType = attackType;
    this.numberOfFactors = numberOfFactors;
    this.factorsModifiers = factorsModifiers;
    this.toThePowerOf = toThePowerOf;
    this.time = timeModifier(BASE_CHALLENGE_TIME);
    this.specials = specials;
    this.score = score;
  }

  throwChallenge({ extraTime }) {
    return new Challenge({
      level: this.power,
      extraTime,
      ...this,
    });
  }

  get needsWarning() {
    return this.attackType === 'nuke';
  }
}

export default Foe;
