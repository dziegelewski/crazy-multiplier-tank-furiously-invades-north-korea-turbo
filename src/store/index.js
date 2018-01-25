import Vue from 'vue';
import Vuex from 'vuex';
import Challenge from '@/classes/Challenge';

Vue.use(Vuex);
export default new Vuex.Store({

	state: {
		challenge: new Challenge(),
	},

	mutations: {
		userInput(state, number) {
			state.challenge.input(number);
		},

		userUndo(state) {
			state.challenge.undo();
		}
	},

	getters: {
		userAnswer(state) {
			return state.challenge.userInput;
		},

		solution(state) {
			return state.challenge.solution;
		},

		blanks(state) {
			return state.challenge.blanks;
		},
	}

})