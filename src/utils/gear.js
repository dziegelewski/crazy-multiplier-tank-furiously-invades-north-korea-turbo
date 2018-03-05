import { cssVariableSetter, getCssVariable, intervally } from '@/utils/functions';

const getCurrentSpeed = () => parseFloat(getCssVariable('speed'));
const updateSpeed = cssVariableSetter('speed', 'ms');
const speedMutation = 0.05;

function speedUp(currentSpeed, demandedSpeed) {
	return intervally(
		() => {
			currentSpeed *= (1 + speedMutation);
			updateSpeed(currentSpeed);
		},
		() => currentSpeed > demandedSpeed
	)
}

function slowDown(currentSpeed, demandedSpeed) {
	return intervally(
		() => {
			currentSpeed *= (1 - speedMutation);
			updateSpeed(currentSpeed);
		},
		() => currentSpeed < demandedSpeed
	)
}

function transitionSpeed(demandedSpeed) {
	const currentSpeed = getCurrentSpeed();

	if (demandedSpeed > currentSpeed) {
		return speedUp(currentSpeed, demandedSpeed);
	} else if (demandedSpeed < currentSpeed) {
		return slowDown(currentSpeed, demandedSpeed)
	} else {
		return Promise.resolve();
	}
}

export function putInGear(gear) {
	const demandedSpeed = Math.max(12 - gear, 2) * 500;
	return transitionSpeed(demandedSpeed);
}
