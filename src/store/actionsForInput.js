export default {
	userInput({ state, commit, getters, dispatch }, number) {
    const { challenge } = state;
    if (challenge) {
      commit('updateAnswer', number);

      if (challenge.inputFull) {
        challenge.attempt() ? dispatch('challengeBeated') : dispatch('challengeFailed');
      }
    }
  },

  userUndo({ state, commit }) {
    if (!state.challenge.inputFull) {
      commit('undoAnswer');
    }
  },
};
