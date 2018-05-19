import { imagesNeedsLoading, loadImages } from '@/utils/images';
import { audioNeedsLoading, loadAudio } from '@/utils/audio';
import { gameAudio, musicAudio } from '@/data/audioGroups';

export default {
	async preloadAudio({ commit, rootState }) {
		const { audioEnabled, musicEnabled } = rootState;


		const audioToLoad = [];

		if (audioEnabled) {
			audioToLoad.push(...gameAudio);
		}

		if (musicEnabled) {
			audioToLoad.push(...musicAudio);
		}

		if (audioNeedsLoading(audioToLoad)) {
		  commit('changeMode', 'loading');
			await loadAudio(audioToLoad);
		}
	},

	async preloadImages({ commit, getters }) {
		if (imagesNeedsLoading()) {
		  commit('changeMode', 'loading');
			await loadImages();
		  getters.isLoadingMode && commit('changeMode', 'menu');
		}
	},
};
