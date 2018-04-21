import Vehicle from "@/classes/Vehicle";

class Hero extends Vehicle {
	constructor({ hearts, maxHearts }) {
   super({ name: 'hero', hearts, maxHearts });

   this.isHero = true;
   this.perks = [];
	}

	getPerk(perk) {
  	this.perks.push(perk);
  }

  hasPerk(searchedPerk) {
    return this.perks.some(perk => perk.shortName === searchedPerk);
  }

  loosePerks() {
  	this.perks = [];
  }

}

export default Hero;
