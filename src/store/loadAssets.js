import { audioNeedsLoading, loadAudio } from '@/utils/audio';
import { gameAudio, musicAudio } from '@/data/audioGroups';

export default async function loadAssets({ commit, rootState }) {
	const { audioEnabled, musicEnabled } = rootState;

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
