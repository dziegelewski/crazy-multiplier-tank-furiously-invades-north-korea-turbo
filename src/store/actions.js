import Province from '@/classes/Province';
import { wait } from '@/utils/functions';

export default {
	userInput({ state, commit, getters, dispatch }, number) {
		const { challenge } = state;
		if (challenge) {
			commit('updateAnswer', number);

			if (challenge.inputFull) {
				challenge.attempt() ? dispatch('challengeBeated') : dispatch('challengeFailed');	
			}
		}
	},

	beginGame({ dispatch }) {
		dispatch('enterProvince', 1);
	},

	enterNextProvince({ state, dispatch }) {
		dispatch('enterProvince', state.lastEnteredProvince + 1);
	},

	enterProvince({ commit, dispatch }, provinceNumber) {
		const province = new Province(provinceNumber);
		commit('changeProvince', province);
		dispatch('sendFoe');
	},

	sendFoe({ state, commit, dispatch }) {
		if (!state.province) return;

		const foe = state.province.sendFoe();
		commit('looseGuardian');
		commit('changeFoe', foe);
		dispatch('throwChallenge');
	},

	throwChallenge({ state, commit }) {
		if (!state.foe) return;

		const challenge = state.foe.throwChallenge();
		commit('changeChallenge', challenge);
	},

	async challengeBeated({ state, commit, dispatch }) {
		const score = state.challenge.prize;
		commit('scored', score);
		commit('hitFoe');

		commit('changeChallenge', null);

		await wait(200);

		if (state.foe.isDefeated) {
			dispatch('foeDefeated');
		} else {
			dispatch('throwChallenge');
		}
	},

	foeDefeated({ state, commit, dispatch }) {
		commit('changeFoe', null);

		if (state.province.isCleared) {
			dispatch('provinceCleared');
		} else {
			dispatch('sendFoe');
		}
	},

	provinceCleared({ dispatch, commit }) {
		// commit('changeProvince', null);

		// Good opportunity for optional prize
		dispatch('enterNextProvince');
	},

	challengeFailed({ state, commit, dispatch }) {
		// LOOSING HEARTS TEMPORALY TURNED OFF
		// commit('looseHeart'); 

		if (state.heroHearts) {
			commit('restartChallenge');
		} else {
			dispatch('gameOver');
		}
	},

	gameOver() {
		alert('Game over');
	}
}
