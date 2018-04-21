/* eslint no-unused-expressions: 0 */
import Vue from 'vue';
import { saveData } from '@/utils/retrieve';
import { generateInitialState } from '@/store/state';
import forOwn from 'lodash/forOwn';

export default {
  resetState(state) {
    const dontResetThese = [
      'audioEnabled',
      'musicEnabled',
      'highscore',
      'games',
    ];
    const startingState = generateInitialState();

    for (const key in state) {
      if (!dontResetThese.includes(key)) {
        Vue.set(state, key, startingState[key]);
      }
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

  updateHighscore(state, highscore) {
    state.highscore = highscore;
    saveData('highscore', highscore);
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

  heroGetHeart(state) {
    state.hero.recover();
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
    state.menuInput = [null];
  },

  toggleOption(state, optionName) {
    const valueAfterChange = !state[optionName];
    saveData(optionName, valueAfterChange);
    state[optionName] = valueAfterChange;
  },

  addGame(state) {
    state.games++;
  },

  updateSummary(state, values) {
    forOwn(values, (value, key) => {
      state.summary[key] += value;
    });
  },
};
