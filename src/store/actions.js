import Province from '@/classes/Province';
import { wait } from '@/utils/functions';
import animate from '@/utils/animate';
import audio from '@/utils/audio';

export default {
  enterNextProvince({ state, dispatch }) {
    dispatch('enterProvince', state.lastEnteredProvince + 1);
  },

  async enterProvince({ commit, dispatch }, provinceNumber) {
    const province = new Province(provinceNumber);
    commit('changeProvince', province);
    await wait(1000);
    dispatch('sendFoe');
  },

  async provinceCleared({ dispatch }) {
		// commit('changeProvince', null);
    await wait(3000);

		// Good opportunity for optional prize
    dispatch('enterNextProvince');
  },

  // -------


  throwChallenge({ state, commit, dispatch }) {
    if (!state.foe) return;

    const challenge = state.foe.throwChallenge();
    commit('changeChallenge', challenge);
    dispatch('countSecondForChallenge', challenge.id);
  },

  async countSecondForChallenge({ state, commit, dispatch }, challengeId) {
    await wait(1000);
    const { challenge } = state;
    if (!challenge) return;
    if (challenge.id === challengeId) {
      commit('secondPassed');
      if (challenge.timeOver) {
        dispatch('foeShots');
        commit('resetTimeout');
      }
        dispatch('countSecondForChallenge', challengeId);
    }

  },

  challengeBeated({ dispatch }) {
    dispatch('heroShots');
  },

  async heroShots({ state, dispatch }) {
    await animate.heroShots();
    if (state.foe) {
      dispatch('foeHit');
    }
  },

  async challengeFailed({ dispatch }) {
  	dispatch('foeShots')
  },

  async foeShots({ dispatch }) {
    await animate.foeShots();
    dispatch('heroHit');
  },

  heroHit({ state, commit, dispatch }) {
    commit('heroLoosesHeart');
    if (state.heroHearts) {
      commit('restartChallenge');
    } else {
      dispatch('gameOver');
    }
  },


  // -------

	beginGame({ commit, dispatch }) {
    commit('changeMode', 'play');
    dispatch('enterProvince', 1);
  },

  async gameOver({ commit, dispatch }) {
		await animate.heroExplodes();
    commit('changeMode', 'menu');
    await wait(1000);
    // eslint-disable-next-line
    if (confirm('Restart?')) {
      dispatch('restartGame');
    }
  },

  restartGame({ commit, dispatch }) {
    commit('setStartingState');
    dispatch('beginGame');
  },

  async sendFoe({ state, commit, dispatch }) {
		if (!state.province) return;

		const foe = state.province.sendFoe();
		commit("looseDefender");
		commit("changeFoe", foe);
		dispatch("throwChallenge");
	},

	foeHit({ state, commit, dispatch }) {
		commit("foeLoosesHeart");
		commit("changeChallenge", null);

		if (state.foe.isDefeated) {
			dispatch("foeDefeated");
		} else {
			dispatch("throwChallenge");
		}
	},

	async foeDefeated({ state, commit, dispatch }) {
		const receivedScores = state.foe.score;
		commit('scored', receivedScores);
		await animate.foeExplodes(receivedScores);

		commit("changeFoe", null);
    await wait(1000);

		if (state.province.isCleared) {
			dispatch("provinceCleared");
		} else {
			dispatch("sendFoe");
		}
	},

	userInput({ state, commit, getters, dispatch }, number) {
    audio('keydown');
    const { challenge } = state;
    if (challenge) {
      commit('updateAnswer', number);

      if (challenge.inputFull) {
        challenge.attempt() ? dispatch('challengeBeated') : dispatch('challengeFailed');
      }
    }
  },

  userUndo({ state, commit }) {
    audio('keydown');
    if (!state.challenge.inputFull) {
      commit('undoAnswer');
    }
  },

};
