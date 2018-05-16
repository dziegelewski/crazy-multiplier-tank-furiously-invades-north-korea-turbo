import animate from '@/utils/animate';
import { randomPerk, tellAStory } from '@/store/helpers';
import loadAssets from '@/store/loadAssets';
import { menuAudio } from '@/data/audioGroups';
import { wait } from '@/utils/functions';
import { moment, longMoment } from '@/utils/waiting';
import { playSound, loadAudio, startMusic, stopMusic } from '@/utils/audio';

export default {
	actions: {
		startApp({ commit }) {
	    commit('putInGear');
	    loadAudio(menuAudio);
	  },

	  loadAssets,

		async beginGame({ rootState, commit, dispatch }) {
	    await dispatch('loadAssets');
	    commit('resetState');
	    commit('putInGear');
	    commit('changeMode', 'play');
	    commit('addGame');
	    await wait(moment);
	    startMusic();
	    dispatch('enterProvince', rootState.startingProvince);
	  },

	  async gameOver({ commit, rootState }) {
	    stopMusic();
	    if (rootState.score > rootState.highscore) {
	      commit('updateHighscore', rootState.score);
	    }
	    commit('changeMode', 'menu');
	    await wait(longMoment);
	  },

		 async getPerk(context, perk) {
	    const { state, commit, dispatch } = context;
	    perk = perk || randomPerk(state);
	    commit('putInGear');
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

	  async displayMessage({ commit, mutation }, message) {
	    const duration = message.duration || longMoment;
	    commit('changeMessage', message);
	    await wait(duration);
	    commit('changeMessage', null);
	  },

		async heroWonGame({ commit, dispatch }) {
	    commit('putInGear');
	    await wait(longMoment);
	    await tellAStory(dispatch, [
	      'Well done.',
	      'You did it.',
	      'Congratulations.',
	      'Evil troops | are defeated',
	      'And world is | a better place now',
	      'Thanks to you.',
	      'Now is the time',
	      'For well-deserved rest.',
	      3000,
	      'Math | can be cool',
	      'Don\'t you think?',
	      '"Minimalism wasn\'t | a real idea -',
	      'it ended | before it started". | Sol LeWitt',
	      3000,
	      'Drive safely',
	      'Maybe one day',
	      'We will need again',
	      'A real hero.',
	    ]);
	    await wait(longMoment);
	    dispatch('gameOver');
	  },
	},
};
