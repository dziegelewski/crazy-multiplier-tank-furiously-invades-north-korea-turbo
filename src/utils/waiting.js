const impatience = 1;
const impatientDev = process.env.NODE_ENV !== 'production' ? impatience : 0;

export const tinyMoment = impatientDev || 500; 
export const moment = impatientDev || 1000; 
export const longMoment = impatientDev || 3000; 