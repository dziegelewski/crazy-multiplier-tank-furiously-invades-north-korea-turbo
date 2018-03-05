export const wait = time => new Promise(resolve => setTimeout(resolve, time ));

export const nonNegative = value => Math.max(0, value);

export const oppositeDirection = (direction) => direction === 'right' ? 'left' : 'right';

export const byDirection = (value, direction) => value * (direction === 'right' ? 1 : -1);

export const showElement = element => element.style.display = 'block';

export const hideElement = element => element.style.display = 'none';

export const isDeviceBig = () => screen.width > 700;

export const getCssVariable = (variable) => window.getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`)

export const cssVariableSetter = (variable, unit = '') => value => document.documentElement.style.setProperty(`--${variable}`, value + unit);

export const fullHundreads = value => Math.floor(value / 100) * 100;

export const intervally = (action, breakTest, interval = 100) => {
	return new Promise(resolve => {

		if (breakTest()) {
			resolve();
			return;
		}

		let intervalId;
		intervalId = setInterval(() => {
			action();
			if (breakTest()) {
				clearInterval(intervalId);
				resolve();
			}
		}, interval)
	})
};