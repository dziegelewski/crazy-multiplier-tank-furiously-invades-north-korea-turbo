import Province from '@/classes/Province';
import { wait } from '@/utils/functions';

export default {
	enterNextProvince({ state, dispatch }) {
    dispatch('enterProvince', state.lastEnteredProvince + 1);
  },

  enterProvince({ commit, dispatch }, provinceNumber) {
    const province = new Province(provinceNumber);
    commit('changeProvince', province);
    dispatch('sendFoe');
  },

   async provinceCleared({ dispatch }) {
		// commit('changeProvince', null);
    await wait(3000);

		// Good opportunity for optional prize
    dispatch('enterNextProvince');
  },
};
