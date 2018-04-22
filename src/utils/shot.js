import { playSound } from '@/utils/audio';
import eventBus from '@/utils/eventBus';
import { byDirection, doUntil, createElementFromHTMLString, getElementCannonPosition, getElementDirection } from '@/utils/functions';
import { collisionDetector, elementTranslate } from '@/utils/collision';

const BULLET_STARTING_POSITION = 0;

export default function shot({ bulletId, shooter, target }) {
	if (!shooter) return;

	const diretion = getElementDirection(shooter);
	const bullet = createBullet(shooter);
	const bulletSpeed = byDirection(15, diretion);
	const moveBullet = elementTranslate(bullet, BULLET_STARTING_POSITION);
	const detectCollision = collisionDetector(bullet, target, diretion);

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
	bullet.parentNode.removeChild(bullet);
	playSound('hit');
	eventBus.$emit('gotcha', bulletId);
}

function createBullet(shooter) {
	const position = getElementCannonPosition(shooter);
	const bulltetSize = 10;
	const bullet = `
		<div
			class="bullet"
			style="
				width: ${bulltetSize}px;
				height: ${bulltetSize}px;
				left: ${position.left - bulltetSize / 2}px;
				top: ${position.top - bulltetSize / 2}px;
			"
		/>
		</div>
	`;
	const element = createElementFromHTMLString(bullet);
	document.querySelector('body').insertAdjacentElement('beforeend', element);
	return element;
}
