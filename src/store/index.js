import Vue from 'vue';
import Vuex from 'vuex';
import Challenge from '@/classes/Challenge';
Vue.use(Vuex);

export default new Vuex.Store({

	state: {

		score: 0,
		difficultyLevel: 1, 
		challenge: null,
	},

	mutations: {
		updateAnswer(state, number) {
			state.challenge ?
			state.challenge.input(number)
			: [];
		},

		userUndo(state) {
			state.challenge &&
			state.challenge.undo();
		},

		scored(state, score) {
			state.score += score;
		},

		nextChallenge(state) {
			state.challenge = new Challenge({ level: state.difficultyLevel });
		},


		makeItHarder(state) {
			state.difficultyLevel ++;
		},

		restartChallenge(state) {
			state.challenge &&
			state.challenge.restart();
		},
	},

	getters: {
		inputLetters(state, getters) {
			return getters.userAnswer.join('').padEnd(getters.blanks, '_').split('');
		},

		userAnswer(state) {
		return state.challenge ?
			state.challenge.userInput
			: [];
		},


		solution(state) {
			return state.challenge ?
			state.challenge.solution
			: null;
		},

		blanks(state) {
			return state.challenge ?
			state.challenge.blanks
			: 0;
		},

		factors(state) {
			return state.challenge ?
			state.challenge.factors
			: []
		}
	},

	actions: {
		userInput({ state, commit, getters, dispatch }, number) {
			const { challenge } = state;
			if (challenge) {
				commit('updateAnswer', number);

				if (challenge.inputFull) {
					challenge.attempt() ? dispatch('wonChallenge') : dispatch('retryChallenge');	
				}
			}
		},

		wonChallenge({ state, commit }) {
			const score = state.challenge.prize;
			commit('scored', score)
			commit('makeItHarder');
			commit('nextChallenge');
		},

		retryChallenge({ commit }) {
			commit('restartChallenge')
		}
	}

})