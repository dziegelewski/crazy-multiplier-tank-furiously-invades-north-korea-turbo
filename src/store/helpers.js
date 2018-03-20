import random from 'lodash/random';
import { doubleShooter, foresight } from '@/data/perks'
import { wait } from '@/utils/functions';


export function willPerkBeFound(state) {
	if (state.province.isFinalProvince) return false;
  return random(0, 1) === 0;
}

export async function tellAStory(dispatch, story) {
  for (let i = 0; i < story.length; i++) {
  	const segment = story[i];
  	if (typeof segment === 'number') {
  		await wait(segment)
  	} else {
	    const lines = segment.split('|'); 
	    await dispatch('displayMessage', { text: [...lines], duration: 3000 })
  	}
  }
}