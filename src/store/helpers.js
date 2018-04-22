import random from 'lodash/random';
import sample from 'lodash/sample';
import { wait } from '@/utils/functions';
import * as perks from '@/data/perks';


export function willPerkBeFound(state) {
	if (state.province.isFinalProvince) return false;
  return random(0, 1) === 0;
}

export async function tellAStory(dispatch, story) {
  for (let i = 0; i < story.length; i++) {
  	const segment = story[i];
  	if (typeof segment === 'number') {
  		await wait(segment);
  	} else {
	    const lines = segment.split('|');
	    await dispatch('displayMessage', { text: [...lines], duration: 3000 });
  	}
  }
}

export const randomPerk = (state) => {
  const provinceNumber = state ? state.province.number : 1;
  // eslint-disable-next-line
  const availablePerks = Object.values(perks).filter((perk) => {
    return !perk.minProvince || provinceNumber >= perk.minProvince;
  });
  return sample(availablePerks);
};

const hasPerkHelper = perkName => state => state.hero.hasPerk(perkName);

export const doubleShooter = hasPerkHelper('doubleShooter');
export const foresight = hasPerkHelper('foresight');
export const extraTime = hasPerkHelper('extraTime');
export const swiftReload = hasPerkHelper('swiftReload');
// export const doubleShooter = hasPerkHelper('doubleShooter');
