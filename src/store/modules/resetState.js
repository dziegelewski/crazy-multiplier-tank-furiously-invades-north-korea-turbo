import Vue from 'vue';
import { generateInitialState } from '@/store/state';

export default {
	mutations: {
	  resetState(state) {
	    const dontResetThese = [
	      'audioEnabled',
	      'musicEnabled',
	      'highscore',
	      'games',
	    ];
	    const startingState = generateInitialState();

	    for (const key in state) {
	      if (!dontResetThese.includes(key)) {
	        Vue.set(state, key, startingState[key]);
	      }
	    }
	  },
	},
};
