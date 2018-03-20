export default time => {
	return new Promise(resolve => {
		if (window.HASTE_MODE_ENABLED) {

			if (time > 1000) {
				time *= 0.1;
			}
		}

		if (window.FOE_FAST_SHOT) {
			if (time === 1000) {
				time = 250;
			}
		}

		if (window.FOE_WONT_SHOT) {
			if (time === 1000) {
				time = 24 * 3600 * 1000;
			}
		}
		
		setTimeout(resolve, time);
	})
};
