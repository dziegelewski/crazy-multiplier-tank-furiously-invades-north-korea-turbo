import { audioNeedsLoading, loadAudio } from '@/utils/audio';
import { gameAudio, musicAudio } from '@/data/audioGroups';

export default async function loadAssets({ commit, state }) {
	const { audioEnabled, musicEnabled } = state;

	const assetsToLoad = [];

	if (audioEnabled) {
		assetsToLoad.push(...gameAudio);
	}

	if (musicEnabled) {
		assetsToLoad.push(...musicAudio);
	}

	if (audioNeedsLoading(assetsToLoad)) {
	  commit('changeMode', 'loading');
		await loadAudio(assetsToLoad);
	}
};
