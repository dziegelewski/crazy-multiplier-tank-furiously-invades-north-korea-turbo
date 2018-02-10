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

  nextProvince(state) {
    return state.visitedProvince + 1;
  },
};
