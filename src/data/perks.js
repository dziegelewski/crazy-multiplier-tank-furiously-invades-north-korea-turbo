import sample from 'lodash/sample';

export const extraLife = {
	shortName: 'extraLife',
	longName: 'Extra Life',
	effect({ commit }) {
    commit('heroGetHeart');
	},
};

export const extraScore = {
	shortName: 'extraScore',
	longName: 'Extra Score',
	effect({ commit }) {
    commit('scored', 3000);
	},
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
};

// export const counterStrike = {
// 	shortName: 'counterStrike',
// 	longName: 'Counter Strike',
// };



// export const fastReload = {
// 	shortName: 'fastReload',
// 	longName: 'Fast Reload',
// };

const perks = [
	extraLife,
	extraScore,
	extraTime,
	foresight,
	doubleShooter,
	// counterStrike,
];

export const randomPerk = () => sample(perks);

export default perks;
