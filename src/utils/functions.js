export const nonNegative = value => Math.max(0, value);

export const wait = time => new Promise(resolve => setTimeout(resolve, time));

export const oppositeDirection = (direction) => direction === 'right' ? 'left' : 'right';

export const byDirection = (value, direction) => value * (direction === 'right' ? 1 : -1);

export const showElement = element => element.style.display = 'block';

export const hideElement = element => element.style.display = 'none';