import Province from '@/classes/Province';
import { wait } from '@/utils/functions';
import animate from '@/utils/animate';
import audio from '@/utils/audio';

let menuInputInterval;

export default {
  enterNextProvince({ state, dispatch }) {
    dispatch('enterProvince', state.lastEnteredProvince + 1);
  },

  async enterProvince({ commit, dispatch }, provinceNumber) {
    const province = new Province(provinceNumber);
    commit('changeProvince', province);

    await dispatch('displayMessage', {
      text: `Stage ${province.number}.<br>  ${province.name}`,
    });

    await wait(1000);
    dispatch('sendFoe');
  },

  async provinceCleared({ state, dispatch }) {
		// commit('changeProvince', null);
    await wait(1000);

    await dispatch('displayMessage', {
      text: `${state.province.name}<br> cleared.`,
    });

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

  async foeShots({ dispatch, getters }) {
    if (getters.isHeroDead) return;
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

	async beginGame({ commit, dispatch }) {
    commit('changeMode', 'play');
    await wait(1000);
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
    commit('resetState');
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

  async badAnswer({ commit, dispatch }) {
    commit('lockTyping');
    commit('restartChallenge');

    await dispatch('displayMessage', {
      text: 'Misfire!',
      duration: 3000,
      style: 'alert',
    }) 

    commit('unlockTyping');
  },

	userInput({ state, commit, getters, dispatch }, number) {
    if (state.typingLocked) return;

    if (getters.isMenuMode) {
      dispatch('menuInput', number);
      audio('keydown');
      return;
    }
    audio('keydown');

    const { challenge } = state;
    if (challenge) {
      commit('updateAnswer', number);

      if (challenge.inputFull) {
        challenge.attempt() ? dispatch('challengeBeated') : dispatch('badAnswer');
      }
    }
  },

  userUndo({ state, commit }) {
    if (state.typingLocked) return;
    audio('keydown');
    if (!state.challenge.inputFull) {
      commit('undoAnswer');
    }
  },

  async menuInput({ commit, dispatch }, number) {
    clearInterval(menuInputInterval)
    commit('updateMenuInput', number);

    switch(number) {
      case 1:
        commit('toggleAudio');
        break;
      case 4:
        await wait(500);
        dispatch('beginGame');
        break;
      case 9:
        commit('toggleMusic');
        break;
    }

    menuInputInterval = setInterval(() => {
      commit('resetMenuInput');
    }, 300);  
  },

  async displayMessage({ commit, mutation }, message) {
    const duration = message.duration || 3000;
    commit('changeMessage', message);
    await wait(duration);
    commit('changeMessage', null);
  },

};
