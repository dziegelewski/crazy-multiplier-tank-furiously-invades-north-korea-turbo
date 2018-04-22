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

export const swiftReload = {
	shortName: 'swiftReload',
	longName: 'Swift Reload',
};
