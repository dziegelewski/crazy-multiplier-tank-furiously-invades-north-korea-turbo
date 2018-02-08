export const nonNegative = value => Math.max(0, value);

export const wait = time => new Promise(resolve => setTimeout(resolve, time));
