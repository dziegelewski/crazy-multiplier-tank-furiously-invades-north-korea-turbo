import { wait } from '@/utils/functions';
import { tinyMoment } from '@/utils/waiting';
import { playSound } from '@/utils/audio';

export default {
		userInput({ state, commit, getters, dispatch }, number) {
	    if (state.typingLocked) return;

	    if (getters.isMenuMode) {
	      dispatch('menuInput', number);
	    } else {
	      const { challenge } = state;
	      if (challenge) {
	        commit('updateAnswer', number);

	        if (challenge.inputFull) {
	          commit('updateSummary', { shots: 1 });
	          challenge.attempt() ? dispatch('challengeBeated') : dispatch('incorrectAnswer');
	        }
	      }
	    }
	    playSound('keydown');
	  },

	  userUndo({ state, commit }) {
	    if (state.typingLocked) return;
	    playSound('keydown');
	    if (!state.challenge.inputFull) {
	      commit('undoAnswer');
	    }
	  },

		async menuInput({ commit, dispatch }, number) {
	    clearTimeout(window.menuInputTimeout);
	    commit('updateMenuInput', number);

	    switch (number) {
	      case 1:
	        dispatch('toggleAudio');
	        break;
	      case 4:
	        await wait(tinyMoment);
	        dispatch('beginGame');
	        break;
	      case 9:
	        dispatch('toggleMusic');
	        break;
	      default:
	    }

	    window.menuInputTimeout = setTimeout(() => {
	      commit('resetMenuInput');
	    }, 300);
	  },

		toggleAudio({ commit }) {
	    commit('toggleOption', 'audioEnabled');
	  },

	  toggleMusic({ commit }) {
	    commit('toggleOption', 'musicEnabled');
	  },
};
