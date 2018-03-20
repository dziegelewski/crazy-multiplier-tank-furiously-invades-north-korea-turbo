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
    time = 5,
    specials = [],
    score,
  }) {
    super({ name, hearts });

    this.power = power;
    this.attackType = attackType;
    this.numberOfFactors = numberOfFactors;
    this.toThePowerOf = toThePowerOf;
    this.specials = specials;
    this.time = time;
    this.score = score;
  }

  throwChallenge() {
    return new Challenge({
      level: this.power,
      numberOfFactors: this.numberOfFactors,
      toThePowerOf: this.toThePowerOf,
      time: this.time,
      specials: this.specials,   
    });
  }

  get needsWarning() {
    return this.attackType === 'nuke';
  }
}

export default Foe;
