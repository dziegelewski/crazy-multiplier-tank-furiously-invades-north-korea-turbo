const SPEED_CHANGE_UNIT = 0.25;
const toSpeedUnits = value => Math.floor(value / SPEED_CHANGE_UNIT) * SPEED_CHANGE_UNIT;

let desiredSpeed;
let changingSpeedInterval;

export default {
	driveSlowly({ dispatch }) {
		dispatch('putInGear', 0);
	},

	putInGear({ state, commit }, gear) {
		clearInterval(changingSpeedInterval);
		desiredSpeed = gear + state.baseSpeed;

		changingSpeedInterval = setInterval(() => {
			const speedDifference = desiredSpeed - state.speed;
			let newSpeed;

			if (!speedDifference) {
				return clearInterval(changingSpeedInterval);
			}

			if (speedDifference > 0) {
				newSpeed = state.speed + 15 * SPEED_CHANGE_UNIT;
			} else {
				newSpeed = state.speed - Math.max(
					SPEED_CHANGE_UNIT,
					toSpeedUnits(-speedDifference / 4),
				);
			}

			return commit('setSpeed', newSpeed);
		}, 100);
	},
};

