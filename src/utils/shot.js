import audio from '@/utils/audio';
export default function shot({ shooter, target, bullet, diretion, onHit, onMiss }) {

	if (!shooter || !target || !bullet) return;

	const oppositeDirection = diretion === 'right' ? 'left' : 'right';
	audio('shot');
	function getBulletPosition() {
		return bullet.getBoundingClientRect().left;
	}

	function getTargetPosition() {
		return target.getBoundingClientRect()[oppositeDirection];
	}

	function comparePositions() {
		if (diretion === 'right') {
			return getBulletPosition() > getTargetPosition();
		} else if (diretion === 'left') {
			return getBulletPosition() < getTargetPosition();
		}
	}

	function withDirection(value, diretion) {
		return value * (diretion === 'right' ? 1 : -1)
	}

	const bulletStartingPosition = 0;
	let bulletPosition = bulletStartingPosition;
	moveBullet(bulletPosition);
	bullet.style.display = 'block';
	const bulletSpeed = 15 * (diretion === 'right' ? 1 : -1);

	if (diretion === 'right') {
		bullet.style.left = '125px';
		bullet.style.right = 'auto';
	} else {
		bullet.style.left = 'auto';
		bullet.style.right = '125px';
	}

	function moveBullet(position) {
		bullet.style.transform = `translateX(${position}px)`;
	}

	function bulletGotTarget() {
		moveBullet(bulletPosition = bulletStartingPosition);
		bullet.style.display = 'none';
		audio('hit');
		onHit();
	}

	function bulletMissesTarget() {
		onMiss();
	}

	(function loop() {
		moveBullet(bulletPosition += bulletSpeed);
		if (comparePositions()) {
			bulletGotTarget();
		} else {
			setTimeout(loop, 10);
		}
	})()

};
