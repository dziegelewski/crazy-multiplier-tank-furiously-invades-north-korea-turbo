import eventBus from '@/utils/eventBus';
import { wait, getElementCenter } from '@/utils/functions';

let bullets = 0;

function emitScore(subject, score) {
	eventBus.$emit(`${subject}-score`, score);
}

async function emitShot(subject) {
	const bulletId = bullets++;
	eventBus.$emit(`${subject}-shots`, bulletId);
	await waitForBullet(bulletId);
}

function waitForBullet(bulletId) {
	return new Promise((resolve) => {
		eventBus.$on('gotcha', (bulletThatHit) => {
			if (bulletId === bulletThatHit) resolve();
		});
	});
}

function explode(selector) {
	const position = getElementCenter(selector);
	const explosionSize = 80;
	const marker = `
		<div
			class="explosion"
			style="
				width: ${explosionSize}px;
				height: ${explosionSize}px;
				left: ${position.left - explosionSize/2}px;
				top: ${position.top - explosionSize/2}px;
			"
			onanimationend="this.parentNode.removeChild(this)"
		/>
		</div>
	`;
	document.querySelector('body').insertAdjacentHTML('beforeend', marker);
};

export default {
	async heroShots() {
		await emitShot('hero');
	},

	async foeShots() {
		await emitShot('foe');
	},

	async foeRushes() {
		eventBus.$emit('foe-rushes');
		await new Promise(resolve => eventBus.$on('impact', resolve));
	},

	async getPerk() {
		return new Promise((resolve/* , reject */) => {
			eventBus.$on('catched', resolve);
			// setTimeout(reject, 5000);
		});
	},

	async foeExplodes() {
		explode('#foe-vehicle');
		await wait(100);
	},

	async heroExplodes() {
		explode('#hero-vehicle');
		await wait(100);
	},


};

window.explode = explode;
