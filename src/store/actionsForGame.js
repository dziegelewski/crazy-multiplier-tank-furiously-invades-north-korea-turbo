/* elint disable: import/no-named-as-default-member */
import animate from '@/utils/animate';

export default {
	beginGame({ commit, dispatch }) {
    commit('changeMode', 'play');
    dispatch('enterProvince', 1);
  },

  gameOver() {
		animate.heroExplodes();
  },
};
