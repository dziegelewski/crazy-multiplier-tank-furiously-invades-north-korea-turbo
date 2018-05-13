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
	actions: {
		throwChallenge({ rootState, commit, dispatch }) {
	    if (!rootState.foe) return;

	    const challenge = rootState.foe.throwChallenge({
	      extraTime: extraTime(rootState) ? 2 : 0,
	    });

	    if (foresight(rootState)) {
	      challenge.addHint();
	    }

	    commit('changeChallenge', challenge);
	    dispatch('countSecondForChallenge', challenge.id);
	  },

	   async challengeBeated({ commit, dispatch, rootState }) {
	    commit('updateSummary', { hits: 1 });
	    await dispatch('heroShots');
	    if (doubleShooter(rootState)) {
	      await wait(150);
	      dispatch('heroShots');
	    }
	  },

	  async incorrectAnswer({ rootState, commit, dispatch }) {
	    commit('lockTyping');
	    commit('restartChallenge');

	    playSound('misfire');

	    if (swiftReload(rootState)) {
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

	  async countSecondForChallenge({ rootState, commit, dispatch }, targetChallengeId) {
	    await wait(oneSecond);
	    const { challenge } = rootState;
	    if (challenge && challenge.id === targetChallengeId) {
	      commit('secondPassed');
	      if (challenge.timeOver) {
	        dispatch('foeAttacks');
	        commit('resetTimeout');
	      }
	      dispatch('countSecondForChallenge', targetChallengeId);
	    }
	  },


	},
};
