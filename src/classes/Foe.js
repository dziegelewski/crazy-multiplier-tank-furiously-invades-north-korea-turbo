import Vehicle from "@/classes/Vehicle";
import Challenge from "@/classes/Challenge";

class Foe extends Vehicle {
  constructor({
    power,
    name,
    hearts,
    attackType,
    toThePowerOf = 1,
    numberOfFactors = 2,
    factorsModifiers,
    time = 5,
    score,
  }) {
    super({ name, hearts });

    this.power = power;
    this.attackType = attackType;
    this.numberOfFactors = numberOfFactors;
    this.factorsModifiers = factorsModifiers;
    this.toThePowerOf = toThePowerOf;
    this.time = time;
    this.score = score;
  }

  throwChallenge() {
    return new Challenge({
      level: this.power,
      ...this,
    });
  }

  get needsWarning() {
    return this.attackType === 'nuke';
  }
}

export default Foe;
