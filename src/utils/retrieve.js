import { isDeviceBig } from '@/utils/functions';

export default function retrieve(optionName) {
	let optionValue;
	const savedValue = getSaved(optionName);

	if (savedValue !== null) {
		optionValue = savedValue;
	} else {
		optionValue = isDeviceBig();
	}

	saveOption(optionName, optionValue);
	return optionValue;
}

export function saveOption(optionName, optionValue) {
	localStorage.setItem(optionName, optionValue);
}

function getSaved(optionName) {
	switch(localStorage.getItem(optionName)) {
		case 'true':
			return true;
		case 'false':
			return false;
		default:
			return null;
		}
}
