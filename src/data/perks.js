export const doubleShooter = 'doubleShooter';
export const extraLife = 'extraLife';
export const extraScore = 'extraScore';
export const extraTime = 'extraTime';
export const foresight = 'foresight';

const perks = [
	{
		shortName: extraLife,
		longName: 'Extra Life',
		effect({ commit }) {
      commit('heroGetHeart');
		},
	},
	{
		shortName: extraScore,
		longName: 'Extra Score',
		effect({ commit }) {
      commit('scored', 3000);
		},
	},
	{
		shortName: extraTime,
		longName: 'Extra Time',
	},
	{
		shortName: foresight,
		longName: 'Foresight',
	// {
	// 	shortName: doubleShooter,
	// 	longName: 'Double-Shooter',
	// },
	},
];

export default perks;

export function findPerk(searchedName) {
	return perks.find(perk => perk.shortName === searchedName)
}
