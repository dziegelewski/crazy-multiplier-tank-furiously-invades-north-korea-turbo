import Vehicle from "@/classes/Vehicle";
import Challenge from "@/classes/Challenge";

class Foe extends Vehicle {
  constructor({ power, kind } = {}) {
    super({ name: kind.name, hearts: kind.hearts });
    const {
        factors = 2,
        nuke = false,
        power: kindPower = 1,
        toThePowerOf = 1,
    } = kind;

    this.power = power * kindPower;
    this.numberOfFactors = factors;
    this.nuke = nuke;
    this.toThePowerOf = toThePowerOf;

  }

  throwChallenge() {
    return new Challenge({
      level: this.power,
      numberOfFactors: this.numberOfFactors,
      toThePowerOf: this.toThePowerOf,   
    });
  }

  get needsWarning() {
    return this.nuke;
  }

  get score() {
    return this.power * this.maxHearts * 100;
  }

}

export default Foe;
