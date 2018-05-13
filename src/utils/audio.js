import { musicName } from '@/data/audioGroups';
import store from '@/store';
import { nonNegative } from '@/utils/functions';

const player = {};

export async function loadAudio(soundsNames = []) {
	const soundsToLoad = soundsNames.map(soundName => new Promise((resolve) => {
		if (soundAlreadyLoaded(soundName)) resolve();
		const sound = new Audio(require(`../assets/sounds/${soundName}.mp3`));

		function onComplete() {
			player[soundName] = sound;
			this.removeEventListener('canplaythrough', onComplete);
			this.removeEventListener('error', onComplete);
			resolve();
		}

		sound.load();
		sound.addEventListener('canplaythrough', onComplete);
		sound.addEventListener('error', onComplete);
	}));

	return Promise.all(soundsToLoad);
}

export function audioNeedsLoading(soundNames = []) {
	return !soundNames.every(soundAlreadyLoaded);
}

function soundAlreadyLoaded(soundName) {
	return player[soundName] && player[soundName].readyState === 4;
}

function isAudioEnabled() {
	return store.state.audioEnabled;
}

function isMusicEnabled() {
	return store.state.musicEnabled;
}

function rewindAndPlay(soundName) {
	player[soundName].currentTime = 0;
	player[soundName].play();
}

export function playSound(soundName) {
	if (isAudioEnabled()) {
		rewindAndPlay(soundName);
	}
}

export function startMusic() {
	if (isMusicEnabled()) {
		player[musicName].volume = 1;
		player[musicName].loop = true;
		rewindAndPlay(musicName);
	}
}

export function stopMusic() {
	if (isMusicEnabled()) {
		fadeSound(musicName)
			.then(() => pauseSound(musicName));
	}
}

function pauseSound(soundName) {
	player[soundName].pause();
}

function fadeSound(soundName) {
	let fadingInterval;

	return new Promise((resolve) => {
		fadingInterval = setInterval(() => {
			const soundVolume = player[soundName].volume;
			const soundLowerVolume = nonNegative(soundVolume - 0.1);
			player[soundName].volume = soundLowerVolume;

			if (!soundLowerVolume) {
				clearInterval(fadingInterval);
				resolve();
			}
		}, 100);
	});
}
