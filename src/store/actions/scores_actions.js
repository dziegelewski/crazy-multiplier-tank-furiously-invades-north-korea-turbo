import animate from '@/utils/animate';

export default {
	  async getScores({ state, commit, dispatch }, { scores, target }) {
	    commit('scored', scores);
	    animate.displayScoresCounter(scores, `#${target}-vehicle`);
	    if (state.score > state.highscore) {
	      await dispatch('announceNewHighscore');
	    }
	  },

	  async announceNewHighscore({ state, commit, dispatch }) {
	   if (state.summary.isHighscore) return;
	   commit('updateSummary', { isHighscore: 1 });
	      if (state.highscore > 0) {
	        await dispatch('displayMessage', {
	          text: 'New | highscore!',
	          style: 'score',
	        });
	      }
	  },
};
