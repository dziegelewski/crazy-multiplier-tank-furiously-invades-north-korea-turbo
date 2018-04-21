import { playSound } from '@/utils/audio';
import eventBus from '@/utils/eventBus';
import { byDirection, showElement, hideElement, doUntil } from '@/utils/functions';
import { collisionDetector, elementTranslate } from '@/utils/collision';

const BULLET_STARTING_POSITION = 0;

export default function shot({ bulletId, shooter, target, bullet, diretion }) {
	if (!shooter || !target || !bullet) return;

	const bulletSpeed = byDirection(15, diretion);
	const moveBullet = elementTranslate(bullet, BULLET_STARTING_POSITION);
	const detectCollision = collisionDetector(bullet, target, diretion);

	showElement(bullet);
	playSound('shot');

	doUntil({
		do: () => moveBullet(bulletSpeed),
		until: () => detectCollision(),
		interval: 10,
		timeout: 5000,
	})
		.then(() => shotSuccess(bullet, bulletId))
		.then(() => moveBullet(BULLET_STARTING_POSITION));
}

function shotSuccess(bullet, bulletId) {
	hideElement(bullet);
	playSound('hit');
	eventBus.$emit('gotcha', bulletId);
}
