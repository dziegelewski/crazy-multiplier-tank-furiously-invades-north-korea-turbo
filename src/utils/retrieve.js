export default function retrieve(dataName, params) {
	const { default: _default } = params;
	let dataValue;
	const savedValue = getSaved(dataName);

	if (savedValue !== null) {
		dataValue = savedValue;
	} else {
		dataValue = _default;
	}

	saveData(dataName, dataValue);
	return dataValue;
}

export function saveData(dataName, dataValue) {
	localStorage.setItem(dataName, dataValue);
}

function getSaved(dataName) {
	const savedData = localStorage.getItem(dataName);
	switch (savedData) {
		case 'true':
			return true;
		case 'false':
			return false;
		default:
			return savedData;
		}
}
