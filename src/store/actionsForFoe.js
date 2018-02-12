import { wait } from '@/utils/functions';
import animate from '@/utils/animate';

export default {
	async sendFoe({ state, commit, dispatch }) {
		if (!state.province) return;
		await wait(1000);

		const foe = state.province.sendFoe();
		commit("looseDefender");
		commit("changeFoe", foe);
		dispatch("throwChallenge");
	},

	foeHit({ state, commit, dispatch }) {
		commit("foeLoosesHeart");
		commit("changeChallenge", null);

		if (state.foe.isDefeated) {
			dispatch("foeDefeated");
		} else {
			dispatch("throwChallenge");
		}
	},

	async foeDefeated({ state, commit, dispatch }) {
		await animate.foeExplodes();

		commit("changeFoe", null);

		if (state.province.isCleared) {
			dispatch("provinceCleared");
		} else {
			dispatch("sendFoe");
		}
	},
};
