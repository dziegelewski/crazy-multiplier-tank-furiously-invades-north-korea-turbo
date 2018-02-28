/* eslint no-unused-expressions: 0 */
import Vue from 'vue';
import { nonNegative } from '@/utils/functions';
import { generateInitialState } from '@/store/state';

export default {
  resetState(state) {
    const omittedKeys = [];
    const startingState = generateInitialState();

    for (let key in state) {
      if (omittedKeys.includes(key)) continue;
      Vue.set(state, key, startingState[key])
    }
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

  changeMessage(state, data) {
    state.message = data;
  },

  lockTyping(state) {
    state.typingLocked = true;
  },

  unlockTyping(state) {
    state.typingLocked = false;
  },

  updateMenuInput(state, value) {
    state.menuInput = [value];
  },

  resetMenuInput(state) {
    state.menuInput = [];
  },

  toggleAudio(state) {
    return state.audioEnabled = !state.audioEnabled;
  },

  toggleMusic(state) {
    return state.musicEnabled = !state.musicEnabled;
  },
};
