import animate from '@/utils/animate';
import { randomPerk } from '@/store/helpers';
import { playSound } from '@/utils/audio';
import { wait } from '@/utils/functions';

export default {
	 async getPerk(context, perk) {
    const { state, commit, dispatch } = context;
    perk = perk || randomPerk(state);
    dispatch('driveSlowly');
    commit('updateIncomingPerk', perk);

    await animate.getPerk(perk);

    commit('updateIncomingPerk', null);
    playSound('bonus');

    if (perk.effect) {
      perk.effect(context);
    } else {
      commit('heroGotPerk', perk);
    }

    commit('updateSummary', { perks: 1 });
    await dispatch('displayMessage', {
      text: perk.longName,
    });
  },

  async fury({ dispatch }) {
    dispatch('displayMessage', {
      text: 'Fury!',
      duration: 1500,
      style: 'alert',
    });

    for (let shots = 0; shots < 4; shots++) {
      dispatch('heroShots');
      await wait(250);
    }
  },

};
