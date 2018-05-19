import { wait } from "@/utils/functions";
import { playSound } from '@/utils/audio';
import {
  swiftReload,
  doubleShooter,
  extraTime,
  foresight,
} from '@/store/helpers';
import { oneSecond } from '@/utils/waiting';

export default {
		throwChallenge({ state, commit, dispatch }) {
	    if (!state.foe) return;

	    const challenge = state.foe.throwChallenge({
	      extraTime: extraTime(state) ? 2 : 0,
	    });

	    if (foresight(state)) {
	      challenge.addHint();
	    }

	    commit('changeChallenge', challenge);
	    dispatch('challengeCountdown', challenge.id);
	  },

	  async challengeCountdown({ state, commit, dispatch }, targetChallengeId) {
	    await wait(oneSecond);
	    const { challenge } = state;
	    if (challenge && challenge.id === targetChallengeId) {
	      commit('challengeCountdown');
	      if (challenge.timeOver) {
	        dispatch('foeAttacks');
	        commit('resetTimeout');
	      }
	      dispatch('challengeCountdown', targetChallengeId);
	    }
	  },

	  async challengeBeated({ commit, dispatch, state }) {
	    commit('updateSummary', { hits: 1 });
	    await dispatch('heroShots');
	    if (doubleShooter(state)) {
	      await wait(150);
	      dispatch('heroShots');
	    }
	  },

	  async incorrectAnswer({ state, commit, dispatch }) {
	    commit('lockTyping');
	    commit('restartChallenge');

	    playSound('misfire');

	    if (swiftReload(state)) {
	      await dispatch('displayMessage', {
	        text: 'Swift Reload!',
	        duration: 1000,
	      });
	    } else {
	      await dispatch('displayMessage', {
	        text: 'Misfire!',
	        duration: 3000,
	        style: 'alert',
	      });
	    }

	    commit('unlockTyping');
	  },

    async challengeFailed({ dispatch }) {
	  	dispatch('foeShots');
	  },


};
