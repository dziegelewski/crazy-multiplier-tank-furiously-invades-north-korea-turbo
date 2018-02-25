/* eslint no-unused-expressions: 0 */
import { nonNegative } from '@/utils/functions';

export default {
  setStartingState(state) {
    state.speed = 0;

    state.score = 0;
    state.heroHearts = 3;
    state.lastEnteredProvince = null;

    state.province = null;
    state.foe = null;
    state.challenge = null;
  },

  updateAnswer(state, number) {
    state.challenge ?
		state.challenge.input(number)
		: [];
  },

  undoAnswer(state) {
    state.challenge &&
		state.challenge.undo();
  },

  scored(state, score) {
    state.score += score;
  },

  foeLoosesHeart(state) {
    state.foe.hurt();
  },

  secondPassed(state) {
    state.challenge &&
    state.challenge.secondPassed();
  },

  resetTimeout(state) {
    state.challenge &&
    state.challenge.resetTimeout();
  },

  restartChallenge(state) {
    state.challenge &&
		state.challenge.restart();
  },

  heroLoosesHeart(state) {
    state.heroHearts = nonNegative(state.heroHearts - 1);
  },

	//

  looseDefender(state) {
    state.province.looseDefender();
  },

  changeProvince(state, province) {
    state.province = province;
    state.lastEnteredProvince = province.number;
  },

  changeChallenge(state, challenge) {
    state.challenge = challenge;
  },

  changeFoe(state, foe) {
    state.foe = foe;
  },

  changeMode(state, mode) {
    state.mode = mode;
  },
};
