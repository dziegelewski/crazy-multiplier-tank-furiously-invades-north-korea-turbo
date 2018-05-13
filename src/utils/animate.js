import eventBus from '@/utils/eventBus';
import { wait, getElementCenter, createElementFromHTMLString, removeThis, getElementScorePositon, appendToBody } from '@/utils/functions';

let bullets = 0;

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
	const explosion = createElementFromHTMLString(`
		<div
			class="explosion"
			style="
				width: ${explosionSize}px;
				height: ${explosionSize}px;
				left: ${position.left - explosionSize / 2}px;
				top: ${position.top - explosionSize / 2}px;
			"
		/>
		</div>
	`);

	explosion.addEventListener('animationend', removeThis);
	appendToBody(explosion);
}

function displayScoresCounter(scores, target) {
	const position = getElementScorePositon(target);
	const counterId = `counter${new Date().getTime()}`;
	const counter = createElementFromHTMLString(`
		<div
			class="score"
			id="${counterId}"
			style="
				position: absolute;
				left: ${position.left}px;
				top: ${position.top}px;
			"
		>
			${scores}
		</div>
	`);

	counter.addEventListener('animationend', removeThis);
	appendToBody(counter);
}

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
			eventBus.$on('perk-catched', resolve);
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

	displayScoresCounter,

};
