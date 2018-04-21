/* eslint-disable */
export default function(store) {
	document.addEventListener('keydown', e => {
		switch(e.key) {
			case 'a':
				store.dispatch('heroShots');
				break;
			break;
			case 'b':
				store.dispatch('foeShots');

				break;
		}
	})
}	