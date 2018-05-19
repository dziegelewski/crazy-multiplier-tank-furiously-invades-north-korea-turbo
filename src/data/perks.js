const scoreEffect = scores => ({ dispatch }) => dispatch('getScores', { scores, target: 'hero' });

// eslint-disable-next-line
const heartsEffect = heartsNumber => function({ commit }) {
	for (let i = 0; i < heartsNumber; i++) {
    commit('heroGetHeart');
	}
};

export const extraLife = {
	shortName: 'extraLife',
	longName: 'Extra Life',
	effect: heartsEffect(1),
};

export const extraScore = {
	shortName: 'extraScore',
	longName: 'Extra Score',
	effect: scoreEffect(1000),
};

export const extraTime = {
	shortName: 'extraTime',
	longName: 'Extra Time',
};

export const foresight = {
	shortName: 'foresight',
	longName: 'Foresight',
};

export const doubleShooter = {
	shortName: 'doubleShooter',
	longName: 'Double Shooter',
	minProvince: 3,
};

export const swiftReload = {
	shortName: 'swiftReload',
	longName: 'Swift Reload',
	minProvince: 7,
};

export const superExtraLife = {
	shortName: 'superExtraLife',
	longName: 'Super Extra Life',
	effect: heartsEffect(2),
	minProvince: 10,
};

export const fury = {
	shortName: 'fury',
	longName: 'Fury!',
	minProvince: 10,
};

export const superExtraScore = {
	shortName: 'superExtraScore',
	longName: 'Super Extra Score',
	effect: scoreEffect(3000),
	minProvince: 13,
};
