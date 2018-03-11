export default time => {
	return new Promise(resolve => {
		if (window.HASTE_MODE_ENABLED) {

			if (time > 1000) {
				time *= 0.1;
			}
			
		}
		setTimeout(resolve, time);
	})
};
