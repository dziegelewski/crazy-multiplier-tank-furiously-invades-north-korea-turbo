import sample from 'lodash/sample';
import {
	van1,
	tank1,
	tank2,
	missle1,
	atom1,
	cosmic1,
	van2,
	hammer1,
	tank3,
	missle2,
	atom2,
	cosmic2,
	chairman1,
} from '@/data/foes';


const defenders = {
  1: {
    often: [van1, tank1],
  },

  2: {
    often: [van1, tank1],
    rare: [tank2],
  },

  3: {
    often: [van1, tank1],
    rare: [tank2],
  },

  4: {
    often: [tank1],
    rare: [tank2, missle1],
  },

  5: {
    often: [van1, missle1],
  },

  6: {
    often: [tank1, missle1],
    rare: [tank2, atom1],
  },

  7: {
    often: [tank2, missle1, atom1],
  },

  8: {
    often: [tank1, van1],
    rare: [cosmic1],
  },

  9: {
    often: [tank1, missle1, cosmic1],
  },

  10: {
    often: [tank2, missle1],
    rare: [van2, cosmic1],
  },

  11: {
    often: [missle1],
    rare: [van2],

  },

  12: {
    rare: [hammer1],
  },

  13: {
    often: [van1, van2, hammer1],
  },

  14: {
    often: [tank1, tank2],
    rare: [tank3],
  },

  15: {
    often: [tank2, tank3, van2],
  },

  16: {
    often: [missle1, tank3],
    rare: [missle2],
  },

  17: {
    often: [missle2, tank2,],
    rare: [cosmic2],
  },

  18: {
    often: [atom1, cosmic2, hammer1],
  },

  19: {
    often: [tank3, cosmic2, missle2],
    rare: [atom2],
  },

  20: {
    only: chairman1,
  },
};

export default function(provinceNumber) {
	if (process.env.NODE_ENV === 'development') {
		if (window.TESTED_FOES) {
			return sample(window.TESTED_FOES);
		}
	}

  const available = defenders[provinceNumber]
  const only = available.only;
  const often = available.often || [];
  const rare = available.rare || [];
  return  only || sample([...often, ...often, ...often, ...rare])
}
