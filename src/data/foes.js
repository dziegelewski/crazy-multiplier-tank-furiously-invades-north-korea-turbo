import random from 'lodash/random';

export const van1 = {
  name: "van1",
  hearts: 1,
  attackType: 'rush',
  score: 100,
};

export const van2 = {
  name: "van2",
  hearts: 4,
  attackType: 'rush',
  specials: [
    'noTimeRecover',
  ],
  score: 500,
};

export const tank1 = {
  name: "tank1",
  hearts: 1,
  attackType: 'shot',
  score: 100,
};

export const tank2 = {
  name: "tank2",
  hearts: 3,
  attackType: 'shot',
  score: 300,
};

export const tank3 = {
  name: "tank3",
  hearts: 4,
  attackType: 'shot',
  score: 500,
};

export const missle1 = {
  name: "missle1",
  hearts: 1,
  numberOfFactors: 1,
  toThePowerOf: 2,
  factorsModifiers: value => Math.ceil(value * 0.8),
  attackType: 'rush',
  score: 200,
};

export const missle2 = {
  ...missle1,
  name: "missle2",
  score: 500,
};

export const atom1 = {
  name: "atom1",
  hearts: 2,
  attackType: 'nuke',
  score: 200,
};


export const atom2 = {
  ...atom1,
  name: "atom2",
  score: 600,
};

export const cosmic1 = {
  name: "cosmic1",
  hearts: 1,
  numberOfFactors: 3,
  factorsModifiers: value => Math.ceil(value * 0.5),
  attackType: 'shot',
  score: 300,
};


export const cosmic2 = {
  ...cosmic1,
  name: "cosmic2",
  hearts: 2,
  score: 700,
};

export const hammer1 = {
  name: "hammer1",
  hearts: 1,
  attackType: 'rush',
  factorsModifiers: {
    0: () => 2,
    1: value => value * random(20, 70),
  },
  score: 200,
};

export const chairman1 = {
 name: 'chairman1',
 hearts: 9,
 score: 10000,
};
