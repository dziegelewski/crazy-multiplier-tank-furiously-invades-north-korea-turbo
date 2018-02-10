import Challenge from "@/classes/Challenge";
import { nonNegative } from "@/utils/functions";
import sample from "lodash/sample";

class Foe {
  constructor({ level = 1, kind = randomKind() } = {}) {
    this.level = level;
    this.hearts = kind.hearts;
    this.type = kind.type;
  }

  throwChallenge() {
    const { level } = this;
    return new Challenge({
      level,
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
      type: "van2",
      hearts: 1,
    },
    {
      type: "tank1",
      hearts: 1,
    },
    {
      type: "tank2",
      hearts: 3,
    },
    {
      type: "tank3",
      hearts: 4,
    },
    {
      type: "missle1",
      hearts: 1,
    },
    {
      type: "missle2",
      hearts: 1,
    },
    {
      type: "atom1",
      hearts: 1,
    },
    {
      type: "atom2",
      hearts: 1,
    },
    {
      type: "cosmic1",
      hearts: 1,
    },
    {
      type: "cosmic2",
      hearts: 1,
    },
    {
      type: "hammer1",
      hearts: 1,
    },
    // {
    //  type: 'chairman1',
    //  hearts: 9,
    // }
  ]);
}

export default Foe;
