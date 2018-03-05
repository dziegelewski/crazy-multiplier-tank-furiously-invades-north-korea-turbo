/* eslint no-unused-expressions: 0 */
import Vue from 'vue';
import { nonNegative } from '@/utils/functions';
import { storeOption } from '@/utils/retrieve';
import { generateInitialState } from '@/store/state';

export default {
  resetState(state) {
    const omittedKeys = [
      'audioEnabled',
      'musicEnabled',
    ];
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
    state.hero.hurt();
  },

  heroGotPerk(state, perk) {
    state.hero.getPerk(perk);
  },

  heroLoosesPerks(state) {
    state.hero.loosePerks();
  },

  updateIncomingPerk(state, perk) {
    state.incomingPerk = perk;
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

  toggleOption(state, optionName) {
    const valueAfterChange = !state[optionName];
    storeOption(optionName, valueAfterChange)
    state[optionName] = valueAfterChange
  },
};
