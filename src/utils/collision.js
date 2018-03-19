import { oppositeDirection } from '@/utils/functions';

const createPositionGetter = (element, diretion) => {
	return function() {
		return element.getBoundingClientRect()[diretion];
	}
};

export function collisionDetector(firstElement, secondElement, diretion) {

	const getFirstElementPosition = createPositionGetter(firstElement, diretion);
	const getSecondElementPosition = createPositionGetter(secondElement, oppositeDirection(diretion));

	return function() {
		const firstElementPosition = getFirstElementPosition();
		const secondElementPosition = getSecondElementPosition();

		if (diretion === 'right') {
			return firstElementPosition > secondElementPosition;
		}
		else if (diretion === 'left') {
			return firstElementPosition < secondElementPosition;
		}
	}
}

export function detectCollision(firstElement, secondElement, diretion) {
	const detect = collisionDetector(firstElement, secondElement, diretion);

	return new Promise(resolve => {
		const checkFrame = function() {
			requestAnimationFrame(() => {
				if (detect()) {
					resolve();
				}
				else {
					checkFrame();
				}
			})
		}

		checkFrame()
	})
}

export function elementTranslate(element, initialPosition) {

	let translation = initialPosition;

	return function(translationModifier) {
		translation += translationModifier;
		element.style.transform = `translateX(${translation}px)`;
	}
}