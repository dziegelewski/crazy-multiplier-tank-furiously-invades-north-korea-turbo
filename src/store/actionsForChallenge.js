import { wait } from '@/utils/functions';
// import { animateHeroShot } from '@/utils/animations';

export default {
  throwChallenge({ state, commit }) {
    if (!state.foe) return;

    const challenge = state.foe.throwChallenge();
    commit('changeChallenge', challenge);
  },

  challengeBeated({ dispatch }) {
    dispatch('heroShots');
  },

  async heroShots({ state, dispatch }) {
    // await animateHeroShot();
    if (state.foe) {
      dispatch('foeHit');
    }
  },

  async challengeFailed({ state, commit, dispatch }) {
    // LOOSING HEARTS TEMPORALY TURNED OFF
    commit('heroLoosesHeart');

    await wait(1000);

    if (state.heroHearts) {
      commit('restartChallenge');
    } else {
      dispatch('gameOver');
    }
  },
};
