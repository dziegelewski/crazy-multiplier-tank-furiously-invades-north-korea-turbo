import animate from '@/utils/animate';

export default {
	actions: {
	  async getScores({ rootState, commit, dispatch }, { scores, target }) {
	    commit('scored', scores);
	    animate.displayScoresCounter(scores, `#${target}-vehicle`);
	    if (rootState.score > rootState.highscore) {
	      await dispatch('newHighscore');
	    }
	  },

	  async newHighscore({ rootState, commit, dispatch }) {
	   commit('updateSummary', { isHighscore: 1 });
	      if (rootState.highscore > 0) {
	        await dispatch('displayMessage', {
	          text: 'New | highscore!',
	          style: 'score',
	        });
	      }
	  },
	},
};
