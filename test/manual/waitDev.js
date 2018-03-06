export default time => {
	return new Promise(resolve => {
		if (window.HASTE) {

			if (time > 1000) {
				time *= window.HASTE || 1;
			}
			
		}
		setTimeout(resolve, time);
	})
};
