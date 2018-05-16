import { imagesNeedsLoading, loadImages } from '@/utils/images';
import { audioNeedsLoading, loadAudio } from '@/utils/audio';
import { gameAudio, musicAudio } from '@/data/audioGroups';

export default async function loadAssets({ commit, rootState }) {
	const { audioEnabled, musicEnabled } = rootState;

	if (imagesNeedsLoading()) {
	  commit('changeMode', 'loading');
		await loadImages();
	}

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
};
