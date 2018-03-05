import Province from '@/classes/Province';
import { wait } from '@/utils/functions';
import animate from '@/utils/animate';
import { playSound, startMusic, stopMusic } from '@/utils/audio';
import { tinyMoment, moment, longMoment,  } from '@/utils/waiting';
import perks from '@/data/perks';
import sample from 'lodash/sample';
import random from 'lodash/random';
import { putInGear} from '@/utils/gear';

const shuffledPerk = () => {
  return random(0, 1) === 0;
}

export default {
  enterNextProvince({ state, dispatch }) {
    dispatch('enterProvince', state.lastEnteredProvince + 1);
  },

  async enterProvince({ commit, dispatch }, provinceNumber) {

    putInGear(provinceNumber + 3);
    
    const province = new Province(provinceNumber);
    commit('changeProvince', province);

    await dispatch('displayMessage', {
      text: [
        `Stage ${province.number}.`,
        province.name
      ],
    });

    await wait(moment);
    dispatch('sendFoe');
  },

  async provinceCleared({ state, commit, dispatch }) {
		// commit('changeProvince', null);
    await wait(moment);
    commit('heroLoosesPerks');
    await dispatch('displayMessage', {
      text: [
        state.province.name,
        'cleared'
      ],
    });

    if (shuffledPerk()) {
      await dispatch('getPerk');
    }

    dispatch('enterNextProvince');
  },

  async getPerk({ commit, dispatch }) {
    putInGear(1);
    const perk = sample(perks);
    commit('updateIncomingPerk', perk);
    await animate.getPerk(perk);
    commit('updateIncomingPerk', null);
    commit('heroGotPerk', perk);
    playSound('bonus');
    await dispatch('displayMessage', {
      text: [
        'One-stage',
        perk.longName,
      ],
      duration: 3000,
    })

  },

  // -------


  throwChallenge({ state, commit, dispatch }) {
    if (!state.foe) return;

    const challenge = state.foe.throwChallenge();
    commit('changeChallenge', challenge);
    dispatch('countSecondForChallenge', challenge.id);
  },

  async countSecondForChallenge({ state, commit, dispatch }, targetChallengeId) {
    await wait(1000);
    const { challenge } = state;
    if (challenge && challenge.id === targetChallengeId) {
      commit('secondPassed');
      if (challenge.timeOver) {
        // dispatch('foeShots');
        commit('resetTimeout');
      }
        dispatch('countSecondForChallenge', targetChallengeId);
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

  async foeShots({ state, dispatch, getters }) {
    if (state.hero.isDefeated) return;
    await animate.foeShots();
    dispatch('heroHit');
  },

  heroHit({ state, commit, dispatch }) {
    commit('heroLoosesHeart');
    if (state.hero.isDefeated) {
      dispatch('gameOver');
    } else {
      commit('restartChallenge');
    }
  },


  // -------

	async beginGame({ commit, dispatch }) {
    commit('resetState');
    commit('changeMode', 'play');
    await wait(moment);
    startMusic();
    dispatch('enterProvince', 1);
  },

  async gameOver({ commit, dispatch }) {
    await animate.heroExplodes();
    stopMusic();
    commit('changeMode', 'menu');
    await wait(longMoment);
  },

  async sendFoe({ state, commit, dispatch }) {
		if (!state.province) return;

		const foe = state.province.sendFoe();
    if (foe.needsWarning) {
      await dispatch('displayMessage', {
        text: '!',
        duration: 3000,
        style: 'alert',
      }) 
    }

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
    await wait(moment);

		if (state.province.isCleared) {
			dispatch("provinceCleared");
		} else {
			dispatch("sendFoe");
		}
	},

  async incorrectAnswer({ commit, dispatch }) {
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
    }
    else {
      const { challenge } = state;
      if (challenge) {
        commit('updateAnswer', number);

        if (challenge.inputFull) {
          challenge.attempt() ? dispatch('challengeBeated') : dispatch('incorrectAnswer');
        }
      }
    }
    playSound('keydown');
  },

  userUndo({ state, commit }) {
    if (state.typingLocked) return;
    playSound('keydown');
    if (!state.challenge.inputFull) {
      commit('undoAnswer');
    }
  },

  async menuInput({ commit, dispatch }, number) {
    clearTimeout(window.menuInputTimeout)
    commit('updateMenuInput', number);

    switch(number) {
      case 1:
        dispatch('toggleAudio');
        break;
      case 4:
        await wait(tinyMoment);
        dispatch('beginGame');
        break;
      case 9:
        dispatch('toggleMusic');
        break;
    }
    window.menuInputTimeout = setTimeout(() => {
      commit('resetMenuInput');
    }, 300);  
  },

  toggleAudio({ commit }) {
    commit('toggleOption', 'audioEnabled');
  },

  toggleMusic({ commit }) {
    commit('toggleOption', 'musicEnabled');
  },

  async displayMessage({ commit, mutation }, message) {
    const duration = message.duration || longMoment;
    commit('changeMessage', message);
    await wait(duration);
    commit('changeMessage', null);
  },

};
