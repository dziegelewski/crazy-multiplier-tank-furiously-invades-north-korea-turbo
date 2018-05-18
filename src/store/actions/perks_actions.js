import animate from '@/utils/animate';
import { randomPerk } from '@/store/helpers';
import { playSound } from '@/utils/audio';

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
};
