export default {
  inputLetters(state, getters) {
    return getters.userAnswer.join('').padEnd(getters.blanks, '_').split('');
  },

  userAnswer(state) {
    return state.challenge ?
		state.challenge.userInput
		: [];
  },


  solution(state) {
    return state.challenge ?
		state.challenge.solution
		: null;
  },

  blanks(state) {
    return state.challenge ?
		state.challenge.blanks
		: 0;
  },

  factors(state) {
    return state.challenge ?
		state.challenge.factors
		: [];
  },

  toThePowerOf(state) {
    return state.challenge &&
    state.challenge.toThePowerOf;
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
};
