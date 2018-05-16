import * as foes from '@/data/foes';
import values from 'lodash/values';

const foesNames = values(foes).map(foe => foe.name);
const imagesToLoad = ['hero', ...foesNames];

export function imagesNeedsLoading() {
	return imagesToLoad.length > 0;
}

export function loadImages() {
	return new Promise((resolve) => {
		const attemptToResolve = () => !imagesToLoad.length && resolve();
		attemptToResolve();

		imagesToLoad.forEach((imageName) => {
			const image = new Image();
			image.src = require(`../assets/images/vehicles/${imageName}.png`);
			image.onload = () => {
				deleteFromArray(imagesToLoad, imageName);
				attemptToResolve();
			};
		});
	});
}

function deleteFromArray(array, item) {
	const itemPosition = array.indexOf(item);
	if (itemPosition !== -1) {
		array.splice(itemPosition, 1);
	}
}
