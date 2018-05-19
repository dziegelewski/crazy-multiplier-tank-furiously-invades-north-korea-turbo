import { tellAStory } from '@/store/helpers';
import { menuAudio } from '@/data/audioGroups';
import { wait } from '@/utils/functions';
import { moment, longMoment } from '@/utils/waiting';
import { loadAudio, startMusic, stopMusic } from '@/utils/audio';

export default {
		async startApp({ dispatch }) {
	    await dispatch('preloadImages');
	    loadAudio(menuAudio);
	  },

		async beginGame({ commit, dispatch }) {
	    await dispatch('preloadAudio');
	    commit('resetState');
	    commit('addGame');
	    commit('changeMode', 'play');
	    dispatch('measureDrivenDistance');
	    await wait(moment);
	    startMusic();
	    dispatch('enterStartingProvince');
	  },

	  async gameOver({ dispatch, commit, state }) {
	    stopMusic();
	    dispatch('driveSlowly');
	    if (state.score > state.highscore) {
	      commit('updateHighscore', state.score);
	    }
	    commit('changeMode', 'menu');
	    await wait(longMoment);
	  },

		async heroWonGame({ dispatch }) {
	    dispatch('driveSlowly');
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
};
