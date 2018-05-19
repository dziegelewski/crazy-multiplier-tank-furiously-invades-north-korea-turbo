import sample from 'lodash/sample';
import { wait, chances } from '@/utils/functions';
import * as perks from '@/data/perks';

export function willPerkBeFound(state) {
	if (state.province.isFinalProvince) return false;
  const { number: provinceNumber } = state.province;
  if (provinceNumber <= 5) {
    return chances(1 / 3);
  }
    return chances(1 / 2);
}

export async function tellAStory(dispatch, story) {
  for (let i = 0; i < story.length; i++) {
  	const segment = story[i];
  	if (typeof segment === 'number') {
  		await wait(segment);
  	} else {
	    await dispatch('displayMessage', { text: segment });
  	}
  }
}

export const randomPerk = (state) => {
  const provinceNumber = state ? state.province.number : 1;
  const allPerks = Object.values(perks);
  const fluke = chances(1 / 15);
  // eslint-disable-next-line
  const availablePerks = fluke
  ? allPerks
  : allPerks.filter(perk => !perk.minProvince || (provinceNumber >= perk.minProvince));
  return sample(availablePerks);
};

const hasPerkHelper = perkName => state => state.hero.hasPerk(perkName);

export const doubleShooter = hasPerkHelper('doubleShooter');
export const foresight = hasPerkHelper('foresight');
export const extraTime = hasPerkHelper('extraTime');
export const swiftReload = hasPerkHelper('swiftReload');
export const fury = hasPerkHelper('fury');
// export const xxx = hasPerkHelper('xxx');
