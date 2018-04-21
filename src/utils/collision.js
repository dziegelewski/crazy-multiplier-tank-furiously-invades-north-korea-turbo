import { oppositeDirection } from '@/utils/functions';

const createPositionGetter = (element, diretion) => () => element.getBoundingClientRect()[diretion];

export function collisionDetector(firstElement, secondElement, diretion) {
	if (!diretion) throw new Error('Direction is obligatory');
	const getFirstElementPosition = createPositionGetter(firstElement, diretion);
	const getSecondElementPosition = createPositionGetter(secondElement, oppositeDirection(diretion));

	return () => {
		const firstElementPosition = getFirstElementPosition();
		const secondElementPosition = getSecondElementPosition();

		if (diretion === 'right') {
			return firstElementPosition > secondElementPosition;
		}
			return firstElementPosition < secondElementPosition;
	};
}

export function detectCollision(firstElement, secondElement, diretion) {
	const detect = collisionDetector(firstElement, secondElement, diretion);

	return new Promise((resolve) => {
		const checkFrame = () => {
			requestAnimationFrame(() => {
				if (detect()) {
					resolve();
				}				else {
					checkFrame();
				}
			});
		};

		checkFrame();
	});
}

export function elementTranslate(element, initialPosition) {
	let translation = initialPosition;

	return (translationModifier) => {
		translation += translationModifier;
		element.style.transform = `translateX(${translation}px)`;
	};
}
