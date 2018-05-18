/* eslint-disable */
export default function(store) {
	document.addEventListener('keydown', e => {
		switch(e.key) {
			case 'a':
				shot();
				break;
			break;
			case 'b':
				foeShot()
				break;
			case 's':
				changeGear();

				break;
			case 'p':
				getPerk();
				changeGear();
				break;
		}
	})

	function shot() {
		store.dispatch('heroShots');
	}

	function foeShot() {
		store.dispatch('foeShots');
	}

	function changeGear() {
		const userGear = parseInt(prompt('Insert gear number'), 10);
		if (userGear) {
			store.dispatch('putInGear', userGear);
			console.log('speed: ', store.state.speed);
		}
	}

	function getPerk() {
		store.dispatch('getPerk');
	}
	
}
