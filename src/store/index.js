import Vue from 'vue';
import Vuex from 'vuex';

import state from '@/store/state';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import actions from '@/store/actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

export default store;

window.isAudioEnabled = function() {
	return store.state.audioEnabled;
}

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
	document.addEventListener('keydown', e => {
		switch(e.key) {
			case 'a':
				store.dispatch('heroShots');
				break;
			break;
			case 'b':
				store.dispatch('foeShots');

				break;
		}
	})
}
