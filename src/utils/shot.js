import { playSound } from '@/utils/audio';
import eventBus from '@/utils/eventBus';
import { oppositeDirection, byDirection, showElement, hideElement } from '@/utils/functions';
import { collisionDetector, elementTranslate } from '@/utils/collision';

const BULLET_STARTING_POSITION = 0;
const DIRECTION_ATTR = 'data-direction';

export default function shot({ bulletId, shooter, target, bullet, diretion }) {
	if (!shooter || !target || !bullet) return;

	const bulletSpeed = byDirection(15, diretion);
	const moveBullet = elementTranslate(bullet, BULLET_STARTING_POSITION);
	const detectCollision = collisionDetector(bullet, target, diretion);

	showElement(bullet);
	playSound('shot');

	(function loop() {
		moveBullet(bulletSpeed);
		if (detectCollision()) {
			shotSuccess(bullet, bulletId);
		} else {
			setTimeout(loop, 10);
		}
	})()
}

function shotSuccess(bullet, bulletId) {
	hideElement(bullet);
	playSound('hit');
	eventBus.$emit('gotcha', bulletId);
}
