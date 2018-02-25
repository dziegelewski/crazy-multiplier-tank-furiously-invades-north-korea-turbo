import Challenge from "@/classes/Challenge";
import { nonNegative } from "@/utils/functions";
import sample from "lodash/sample";

class Foe {
  constructor({ level = 1, kind = randomKind() } = {}) {
    const { hearts, type, numberOfFactors = 2 } = kind;
    this.level = level;
    this.hearts = hearts;
    this.type = type;
    this.displayHearts = hearts > 1;
    this.displayHearts = true;
    this.numberOfFactors = numberOfFactors;
    this.score = level * hearts * 100;
  }

  throwChallenge() {
    return new Challenge({
      level: this.level,
      numberOfFactors: this.numberOfFactors,
    });
  }

  hurt(damage = 1) {
    this.hearts = nonNegative(this.hearts - damage);
  }

  get isDefeated() {
    return this.hearts === 0;
  }
}

function randomKind() {
  return sample([
    {
      type: "van1",
      hearts: 1,
    },
    {
      type: "tank1",
      hearts: 1,
    },
    // {
    //   type: "van2",
    //   hearts: 1,
    // },
    // {
    //   type: "tank2",
    //   hearts: 3,
    // },
    // {
    //   type: "tank3",
    //   hearts: 4,
    // },
    // {
    //   type: "missle1",
    //   hearts: 1,
    // },
    // {
    //   type: "missle2",
    //   hearts: 1,
    // },
    // {
    //   type: "atom1",
    //   hearts: 2,
    //   isNuke: true,
    // },
    // {
    //   type: "atom2",
    //   hearts: 2,
    //   isNuke: true,
    // },
    // {
    //   type: "cosmic1",
    //   hearts: 1,
    //   numberOfFactors: 3,
    // },
    // {
    //   type: "cosmic2",
    //   hearts: 2,
    //   numberOfFactors: 3,
    // },
    // {
    //   type: "hammer1",
    //   hearts: 1,
    // },
    // {
    //  type: 'chairman1',
    //  hearts: 9,
    // }
  ]);
}

export default Foe;
