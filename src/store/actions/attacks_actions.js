import animate from '@/utils/animate';
import { playSound } from '@/utils/audio';
import { wait } from '@/utils/functions';
import { moment } from '@/utils/waiting';
import { fury } from '@/store/helpers';

export default {

		async heroShots({ state, dispatch }) {
	    await animate.heroShots();
	    if (state.foe) {
	      dispatch('foeHit');
	    }
	  },

	  async foeAttacks({ state, dispatch }) {
	    if (state.hero.isDefeated) return;
	    switch (state.foe.attackType) {
	      case 'shot':
	        await dispatch('foeShots');
	        break;
	      case 'clash':
	        await dispatch('foeClashes');
	        break;
	      case 'nuke':
	        await dispatch('foeNukes');
	        break;
	      default:
	    }
	  },

	  async foeShots({ dispatch }) {
	    await animate.foeShots();
	    dispatch('heroHit');
	  },

	  async foeClashes({ dispatch }) {
	    await animate.foeClashes();
	    playSound('impact');
	    dispatch('foeHit', 9);
	    dispatch('heroHit');
	  },

	  async foeNukes({ dispatch, commit }) {
	    playSound('nuke');
	    commit('changeMode', 'nuke');
	    commit('heroLoosesHeart', 9);
	    animate.heroExplodes();
	    dispatch('foeDefeated');
	    await animate.nuke();
	    dispatch('gameOver');
	  },

	  async heroHit({ state, commit, dispatch }, damage) {
	    commit('heroLoosesHeart', damage);
	    if (state.hero.isDefeated) {
	      playSound('destroy');
	      animate.heroExplodes();
	      dispatch('gameOver');
	    } else {
	      commit('restartChallenge');
	    }

	    if (fury(state)) {
	    	dispatch('fury');
	    }
	  },

		foeHit({ state, commit, dispatch }, damage = 1) {
			commit("foeLoosesHeart", damage);
			commit("changeChallenge", null);

			if (state.foe.isDefeated) {
				dispatch("foeDefeated");
			} else {
				dispatch("throwChallenge");
			}
		},

		async foeDefeated({ state, commit, dispatch }) {
	    playSound('destroy');
	    commit('updateSummary', { foesKilled: 1 });

			const scoresToGet = state.foe.score;
	    animate.foeExplodes();

			commit("changeFoe", null);

	    await dispatch('getScores', { scores: scoresToGet, target: 'foe' });

			if (state.province.isCleared) {
				dispatch("provinceCleared");
			} else {
		    await wait(moment);
				dispatch("sendFoe");
			}
		},

};
