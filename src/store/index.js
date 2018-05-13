import Vue from 'vue';
import Vuex from 'vuex';

import inputModule from '@/store/modules/input';
import challengesModule from '@/store/modules/challenges';
import attacksModule from '@/store/modules/attacks';
import provincesModule from '@/store/modules/provinces';
import gameModule from '@/store/modules/game';
import scoresModule from '@/store/modules/scores';

import state from '@/store/state';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		inputModule,
		attacksModule,
		provincesModule,
		challengesModule,
		scoresModule,
		gameModule,
	},

  state,
  mutations,
  getters,
});

export default store;
