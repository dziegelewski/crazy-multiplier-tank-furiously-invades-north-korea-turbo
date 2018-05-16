import Province from '@/classes/Province';
import { finalProvinceNumber } from '@/data/provinces';
import { wait } from '@/utils/functions';
import { moment } from '@/utils/waiting';
import { willPerkBeFound } from '@/store/helpers';
import { stopMusic } from '@/utils/audio';

export default {
	actions: {
		enterNextProvince({ rootState, dispatch }) {
	    dispatch('enterProvince', rootState.lastEnteredProvince + 1);
	  },

	  async enterProvince({ commit, dispatch }, provinceNumber) {
	    if (provinceNumber > finalProvinceNumber) {
	      dispatch('heroWonGame');
	      return;
	    }

	    if (provinceNumber === finalProvinceNumber) {
	      stopMusic();
	    }

	    commit('putInGear', provinceNumber);

	    const province = new Province(provinceNumber);
	    commit('changeProvince', province);

	    await dispatch('displayMessage', {
	      text: `Stage ${province.number}. | ${province.name}`,
	    });

	    await wait(moment);
	    commit('currentProvinceVisibility', true);
	    dispatch('sendFoe');
	  },

	  async provinceCleared({ rootState, commit, dispatch }) {
	    if (rootState.hero.isDefeated) return;
	    commit('currentProvinceVisibility', false);
	    await wait(moment);
	    commit('heroLoosesPerks');
	    await dispatch('displayMessage', {
	      text: `${rootState.province.name} | cleared`,
	    });

	    if (willPerkBeFound(rootState)) {
	      await dispatch('getPerk');
	    }

	    dispatch('enterNextProvince');
	  },

		 async sendFoe({ rootState, commit, dispatch }) {
			if (!rootState.province || rootState.hero.isDefeated) return;

			const foe = rootState.province.sendFoe();
	    if (foe.needsWarning) {
	      await dispatch('displayMessage', {
	        text: '!',
	        duration: 3000,
	        style: 'alert-big',
	      });
	    }

			commit("looseDefender");
			commit("changeFoe", foe);
			dispatch("throwChallenge");
		},
	},
};
