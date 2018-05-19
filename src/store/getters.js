export default {

  solution(state) {
    return state.challenge ?
		state.challenge.solution
		: null;
  },

  nextProvince(state) {
    return state.visitedProvince + 1;
  },

  isGameMode(state) {
    return state.mode === 'play';
  },

  isMenuMode(state) {
    return state.mode === 'menu';
  },

  isLoadingMode(state) {
    return state.mode === 'loading';
  },

  isFirstGame(state) {
    return state.games === 0;
  },
};
