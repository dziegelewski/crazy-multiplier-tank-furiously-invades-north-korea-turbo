import { audioNeedsLoading, loadAudio } from '@/utils/audio';
import { gameAudio, musicAudio } from '@/data/audioGroups';
import { wait } from '@/utils/functions';

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
		let loadingInProgress = true;

		wait(300)
			.then(() => {
				if (loadingInProgress) {
				  commit('changeMode', 'loading');
				}
			});

		await loadAudio(assetsToLoad);
		loadingInProgress = false;
	}
};
