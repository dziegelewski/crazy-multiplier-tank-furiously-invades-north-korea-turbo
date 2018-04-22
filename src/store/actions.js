import Province from '@/classes/Province';
import { finalProvinceNumber } from '@/data/provinces';
import { wait } from '@/utils/functions';
import animate from '@/utils/animate';
import { playSound, startMusic, stopMusic } from '@/utils/audio';
import { oneSecond, tinyMoment, moment, longMoment } from '@/utils/waiting';
import { putInGear } from '@/utils/gear';
import {
  tellAStory,
  willPerkBeFound,
  randomPerk,
  doubleShooter,
  foresight,
  extraTime,
  swiftReload,
} from '@/store/helpers';

export default {

  enterNextProvince({ state, dispatch }) {
    dispatch('enterProvince', state.lastEnteredProvince + 1);
  },

  async enterProvince({ commit, dispatch }, provinceNumber) {
    if (provinceNumber > finalProvinceNumber) {
      dispatch('heroWonGame');
      return;
    }

    if (provinceNumber === finalProvinceNumber) {
      stopMusic();
    }

    putInGear(provinceNumber + 3);

    const province = new Province(provinceNumber);
    commit('changeProvince', province);

    await dispatch('displayMessage', {
      text: [
        `Stage ${province.number}.`,
        province.name,
      ],
    });

    await wait(moment);
    commit('currentProvinceVisibility', true);
    dispatch('sendFoe');
  },

  async provinceCleared({ state, commit, dispatch }) {
    if (state.hero.isDefeated) return;
    commit('currentProvinceVisibility', false);
		// commit('changeProvince', null);
    await wait(moment);
    commit('heroLoosesPerks');
    await dispatch('displayMessage', {
      text: [
        state.province.name,
        'cleared',
      ],
    });

    if (willPerkBeFound(state)) {
      await dispatch('getPerk');
    }

    dispatch('enterNextProvince');
  },

  async getPerk(context, perk) {
    const { state, commit, dispatch } = context;
    perk = perk || randomPerk(state);
    putInGear(1);
    commit('updateIncomingPerk', perk);
    await animate.getPerk(perk);
    commit('updateIncomingPerk', null);
    playSound('bonus');

    if (perk.effect) {
      perk.effect(context);
    } else {
      commit('heroGotPerk', perk);
    }

    commit('updateSummary', { perks: 1 });
    await dispatch('displayMessage', {
      text: [
        ...(!perk.effect ? ['One-stage'] : []),
        perk.longName,
      ],
      duration: 3000,
    });
  },

  // -------

  throwChallenge({ state, commit, dispatch }) {
    if (!state.foe) return;

    const challenge = state.foe.throwChallenge({
      extraTime: extraTime(state) ? 2 : 0,
    });

    if (foresight(state)) {
      challenge.addHint();
    }

    commit('changeChallenge', challenge);
    dispatch('countSecondForChallenge', challenge.id);
  },

  async countSecondForChallenge({ state, commit, dispatch }, targetChallengeId) {
    await wait(oneSecond);
    const { challenge } = state;
    if (challenge && challenge.id === targetChallengeId) {
      commit('secondPassed');
      if (challenge.timeOver) {
        dispatch('foeAttacks');
        commit('resetTimeout');
      }
      dispatch('countSecondForChallenge', targetChallengeId);
    }
  },

  async challengeBeated({ commit, dispatch, state }) {
    commit('updateSummary', { hits: 1 });
    await dispatch('heroShots');
    if (doubleShooter(state)) {
      await wait(150);
      dispatch('heroShots');
    }
  },

  async heroShots({ state, dispatch }) {
    await animate.heroShots();
    if (state.foe) {
      dispatch('foeHit');
    }
  },

  async challengeFailed({ dispatch }) {
  	dispatch('foeShots');
  },

  async foeAttacks({ state, dispatch }) {
    if (state.hero.isDefeated) return;
    switch (state.foe.attackType) {
      case 'shot':
        await dispatch('foeShots');
        break;
      case 'rush':
        await dispatch('foeRushes');
        break;
      case 'nuke':
        await dispatch('foeNukes');
        break;
      default:
    }
  },

  async foeShots({ dispatch }) {
    await animate.foeShots();
    dispatch('heroHit');
  },

  async foeRushes({ dispatch }) {
    await animate.foeRushes();
    playSound('impact');
    dispatch('foeHit', 9);
    dispatch('heroHit');
  },

  async foeNukes({ dispatch, commit }) {
    playSound('nuke');
    commit('changeMode', 'nuke');
    commit('heroLoosesHeart', 9);
    animate.heroExplodes();
    dispatch('foeDefeated');
    await wait(5000);
    dispatch('gameOver');
  },

  async heroHit({ state, commit, dispatch }, damage) {
    commit('heroLoosesHeart', damage);
    if (state.hero.isDefeated) {
      playSound('destroy');
      animate.heroExplodes();
      dispatch('gameOver');
    } else {
      commit('restartChallenge');
    }
  },


  // -------

	async beginGame({ state, commit, dispatch }) {
    commit('resetState');
    commit('changeMode', 'play');
    commit('addGame');
    await wait(moment);
    startMusic();
    dispatch('enterProvince', state.startingProvince);
  },

  async gameOver({ commit, state }) {
    stopMusic();
    if (state.score > state.highscore) {
      commit('updateHighscore', state.score);
    }
    commit('changeMode', 'menu');
    await wait(longMoment);
  },

  async sendFoe({ state, commit, dispatch }) {
		if (!state.province || state.hero.isDefeated) return;

		const foe = state.province.sendFoe();
    if (foe.needsWarning) {
      await dispatch('displayMessage', {
        text: '!',
        duration: 3000,
        style: 'alert',
      });
    }

		commit("looseDefender");
		commit("changeFoe", foe);
		dispatch("throwChallenge");
	},

	foeHit({ state, commit, dispatch }, damage = 1) {
		commit("foeLoosesHeart", damage);
		commit("changeChallenge", null);

		if (state.foe.isDefeated) {
			dispatch("foeDefeated");
		} else {
			dispatch("throwChallenge");
		}
	},

	async foeDefeated({ state, commit, dispatch }) {
    playSound('destroy');
    commit('updateSummary', { foesKilled: 1 });
		const receivedScores = state.foe.score;
		commit('scored', receivedScores);

    if (state.score > state.highscore) {
      commit('updateSummary', { isHighscore: 1 });
    }

    animate.foeExplodes(receivedScores);

		commit("changeFoe", null);
    await wait(moment);

		if (state.province.isCleared) {
			dispatch("provinceCleared");
		} else {
			dispatch("sendFoe");
		}
	},

  async incorrectAnswer({ state, commit, dispatch }) {
    commit('lockTyping');
    commit('restartChallenge');

    playSound('misfire');

    if (swiftReload(state)) {
      await dispatch('displayMessage', {
        text: 'Swift Reload!',
        duration: 1000,
      });
    } else {
      await dispatch('displayMessage', {
        text: 'Misfire!',
        duration: 3000,
        style: 'alert',
      });
    }

    commit('unlockTyping');
  },

	userInput({ state, commit, getters, dispatch }, number) {
    if (state.typingLocked) return;

    if (getters.isMenuMode) {
      dispatch('menuInput', number);
    } else {
      const { challenge } = state;
      if (challenge) {
        commit('updateAnswer', number);

        if (challenge.inputFull) {
          commit('updateSummary', { shots: 1 });
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
    clearTimeout(window.menuInputTimeout);
    commit('updateMenuInput', number);

    switch (number) {
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
      default:
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

  async heroWonGame({ dispatch }) {
    putInGear(3);
    await wait(longMoment);
    await tellAStory(dispatch, [
      'Well done.',
      'You did it.',
      'Congratulations.',
      'Evil troops | are defeated',
      'And world is | a better place now',
      'Thanks to you.',
      'Now is the time',
      'For well-deserved rest.',
      3000,
      'Math | can be cool',
      'Don\'t you think?',
      '"Minimalism wasn\'t | a real idea -',
      'it ended | before it started". | Sol LeWitt',
      3000,
      'Drive safely',
      'Maybe one day',
      'We will need again',
      'A real hero.',
    ]);
    await wait(longMoment);
    dispatch('gameOver');
  },

};
