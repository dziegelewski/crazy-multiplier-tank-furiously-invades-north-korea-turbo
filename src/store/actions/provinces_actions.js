import Province from '@/classes/Province';
import { finalProvinceNumber } from '@/data/provinces';
import { wait } from '@/utils/functions';
import { moment, longMoment } from '@/utils/waiting';
import { willPerkBeFound } from '@/store/helpers';
import { stopMusic } from '@/utils/audio';

export default {
		enterStartingProvince({ state, dispatch }) {
	    dispatch('enterProvince', state.startingProvince);
		},

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

	    dispatch('putInGear', provinceNumber);

	    const province = new Province(provinceNumber);
	    commit('changeProvince', province);

	    await dispatch('displayMessage', {
	      text: `Stage ${province.number}. | ${province.name}`,
	    });

	    await wait(moment);
	    commit('currentProvinceVisibility', true);
	    dispatch('sendFoe');
	  },

	  async provinceCleared({ state, commit, dispatch }) {
	    if (state.hero.isDefeated) return;
	    commit('heroLoosesPerks');
	    commit('currentProvinceVisibility', false);
	    await wait(longMoment);
	    await dispatch('displayMessage', {
	      text: `${state.province.name} | cleared`,
	    });

	    if (willPerkBeFound(state)) {
	      await dispatch('getPerk');
	    }

	    dispatch('enterNextProvince');
	  },

		 async sendFoe({ state, commit, dispatch }) {
			if (!state.province || state.hero.isDefeated) return;

			const foe = state.province.sendFoe();
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
};
