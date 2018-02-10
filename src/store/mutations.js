/* eslint no-unused-expressions: 0 */
import { nonNegative } from '@/utils/functions';

export default {
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

  hitFoe(state) {
    state.foe.hurt();
  },


  restartChallenge(state) {
    state.challenge &&
		state.challenge.restart();
  },

  looseHeart(state) {
    state.heroHearts = nonNegative(state.heroHearts - 1);
  },

	//

  looseGuardian(state) {
    state.province.looseGuardian();
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
};
