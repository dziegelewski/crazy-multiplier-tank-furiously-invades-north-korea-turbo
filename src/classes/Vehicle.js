import { nonNegative } from "@/utils/functions";

class Vehicle {
	constructor({ name, hearts, maxHearts }) {
		this.name = name;
		this.maxHearts = maxHearts || hearts;
		this.hearts = hearts;
		this.displayHearts = this.maxHearts > 1;
    this.isHero = false;
	}

  hurt(damage = 1) {
    this.hearts = nonNegative(this.hearts - damage);
  }

  get isDefeated() {
    return this.hearts === 0;
  }
}

export default Vehicle;