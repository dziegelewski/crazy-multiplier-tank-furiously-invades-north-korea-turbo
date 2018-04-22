import waitDevelopmentVersion from '../../test/manual/waitDev';

export const wait = process.env.NODE_ENV === 'production'
	?	time => new Promise(resolve => setTimeout(resolve, time))
	: waitDevelopmentVersion;

export const nonNegative = value => Math.max(0, value);

export const oppositeDirection = direction => direction === 'right' ? 'left' : 'right';

export const byDirection = (value, direction) => value * (direction === 'right' ? 1 : -1);

export const showElement = element => element.style.display = 'block';

export const hideElement = element => element.style.display = 'none';

export const isDeviceBig = () => screen.width > 700;

export const getCssVariable = variable => window.getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);

export const cssVariableSetter = (variable, unit = '') => value => document.documentElement.style.setProperty(`--${variable}`, value + unit);

export const fullHundreads = value => Math.floor(value / 100) * 100;

export const doUntil = (config) => {
	const {
		do: _do,
		until,
		testFirst = false,
		interval = 100,
		timeout,
	} = config;
	return new Promise((resolve, reject) => {
		if (testFirst && until()) {
			resolve();
			return;
		}

		const intervalId = setInterval(() => {
			_do();
			if (until()) {
				clearInterval(intervalId);
				resolve();
			}
		}, interval);

		if (timeout) {
			setTimeout(() => {
				clearInterval(intervalId);
				reject('timeout');
			}, timeout);
		}
	});
};

export const getElementDirection = (element) => {
	const direction = element.getAttribute('data-direction');
	if (!direction) {
		throw new Error('Element has an undefined direction');
	}
	return direction;
};

export const smartQuerySelector = target => target instanceof HTMLElement	? target
	: document.querySelector(target);

export const getElementCenter = (target) => {
	const element = smartQuerySelector(target);
	const rect = element.getBoundingClientRect();

	const width = element.offsetWidth;
	const height = element.offsetHeight;

	return {
		left: rect.left + width / 2,
		top: rect.top + height / 2,
	};
};

export const getElementCannonPosition = (target) => {
	const element = smartQuerySelector(target);
	const rect = element.getBoundingClientRect();

	// const width = element.offsetWidth;
	const height = element.offsetHeight;
	const direction = getElementDirection(element);

	const fromGroundToCannon = height / 5;

	return {
		left: rect[direction],
		top: rect.top + fromGroundToCannon + height / 2,
	};
};


export function createElementFromHTMLString(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
