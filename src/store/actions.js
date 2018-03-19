import Province from '@/classes/Province';
import { wait } from '@/utils/functions';
import animate from '@/utils/animate';
import { playSound, startMusic, stopMusic } from '@/utils/audio';
import { oneSecond, tinyMoment, moment, longMoment,  } from '@/utils/waiting';
import perks from '@/data/perks';
import sample from 'lodash/sample';
import { putInGear} from '@/utils/gear';
import { willPerkBeFound, doubleShooterPerk, foresightPerk } from '@/store/helpers';

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

    if (willPerkBeFound()) {
      await dispatch('getPerk');
    }

    dispatch('enterNextProvince');
  },

  async getPerk(context, perk = sample(perks)) {
    const { commit, dispatch } = context;
    putInGear(1);
    commit('updateIncomingPerk', perk);
    await animate.getPerk(perk);
    commit('updateIncomingPerk', null);
    playSound('bonus');

    if (perk.effect) {
      perk.effect(context)
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
    })

  },

  // -------

  throwChallenge({ state, commit, dispatch }) {
    if (!state.foe) return;

    const challenge = state.foe.throwChallenge();

    if (state.hero.hasPerk('foresight')) {
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
        dispatch('foeShots');
        dispatch('foeRushes');
        commit('resetTimeout');
      }
      dispatch('countSecondForChallenge', targetChallengeId);
    }

  },

  async challengeBeated({ state, commit, dispatch }) {
    commit('updateSummary', { hits: 1 })
    await dispatch('heroShots');
    // if (state.hero.hasPerk('doubleShooter')) {
    //   await wait(250);
    //   console.log('heroShots again!')
    //   dispatch('heroShots');
    // }
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

  async foeAttacks({ state, dispatch }) {
    switch(state.foe.attack) {
      case 'shot':
        await dispatch('foeShots');
        break;
      case 'rush':
        await dispatch('foeRushes');
        break;
      case 'nuke':
        await dispatch('foeNukes');
        break;
    };
  },

  async foeShots({ state, dispatch }) {
    if (state.hero.isDefeated) return;
    await animate.foeShots();
    dispatch('heroHit');
  },

  async foeRushes({ state, dispatch }) {
    if (state.hero.isDefeated) return;
    await animate.foeRushes();
    dispatch('heroHit');
    dispatch('foeDefeated');
  },

  async foeNukes() {
    // todo
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

	async beginGame({ state, commit, dispatch }) {
    commit('resetState');
    commit('changeMode', 'play');
    commit('addGame');
    await wait(moment);
    startMusic();
    dispatch('enterProvince', state.startingProvince);
  },

  async gameOver({ commit, state, mutation, dispatch }) {
    await animate.heroExplodes();
    stopMusic();
    if (state.score > state.highscore) {
      commit('updateHighscore', state.score);
    }
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
    commit('updateSummary', { foesKilled: 1 });
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
          commit('updateSummary', { shots: 1 })
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
