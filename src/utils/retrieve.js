import { isDeviceBig } from '@/utils/functions';

export default function retrieve(optionName) {
	let optionValue;
	const storedValue = getFromStorage(optionName);

	if (storedValue !== null) {
		optionValue = storedValue;
	} else {
		optionValue = isDeviceBig();
	}

	storeOption(optionName, optionValue);
	return optionValue;
}

export function storeOption(optionName, optionValue) {
	localStorage.setItem(optionName, optionValue);
}

function getFromStorage(optionName) {
	switch(localStorage.getItem(optionName)) {
		case 'true':
			return true;
		case 'false':
			return false;
		default:
			return null;
		}
}
