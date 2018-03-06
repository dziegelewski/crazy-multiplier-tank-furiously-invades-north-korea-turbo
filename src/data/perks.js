export const doubleShooter = 'doubleShooter';
export const extraLife = 'extraLife';
export const extraScore = 'extraScore';
export const extraTime = 'extraTime';
export const foresight = 'foresight';

const perks = [
	{
		shortName: doubleShooter,
		longName: 'Double-Shooter',
	},
	{
		shortName: extraLife,
		longName: 'Extra Life',
		duration: 0,
	},
	{
		shortName: extraScore,
		longName: 'Extra Score',
		duration: 0,
	},
	{
		shortName: extraTime,
		longName: 'Extra Time',
	},
	{
		shortName: foresight,
		longName: 'Foresight',
	},
];

export default perks;

export function findPerk(searchedName) {
	return perks.find(perk => perk.shortName === searchedName)
}
