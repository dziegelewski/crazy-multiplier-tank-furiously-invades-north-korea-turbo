import eventBus from '@/utils/eventBus';
import { byDirection, oppositeDirection, getElementDirection } from '@/utils/functions';


const createPositionGetter = (element, diretion) => () => element.getBoundingClientRect()[diretion];

export function collisionDetector(firstElement, secondElement, diretion) {
	if (!diretion) throw new Error('Direction is obligatory');
	if (!firstElement || !secondElement) return () => false;

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
				}	else {
					checkFrame();
				}
			});
		};

		checkFrame();
	});
}

export function elementTranslate(element, initialPosition = 0) {
	let translation = initialPosition;

	return (translationModifier) => {
		translation += translationModifier;
		element.style.transform = `translateX(${translation}px)`;
	};
}

export function clash({ aggresor, target, speed = 30 }) {
	const diretion = getElementDirection(aggresor);
	const moveAggresor = elementTranslate(aggresor);
	const aggresorMovementDistance = byDirection(speed);

	const clashingInterval = setInterval(() => {
		moveAggresor(aggresorMovementDistance);
	}, 10);

	detectCollision(aggresor,	target, diretion)
	.then(() => {
		clearInterval(clashingInterval);
		eventBus.$emit('impact');
	});
}
