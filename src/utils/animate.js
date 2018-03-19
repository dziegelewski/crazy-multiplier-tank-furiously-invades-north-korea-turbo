import eventBus from '@/utils/eventBus';
import { wait } from '@/utils/functions';

export const explodingTime = 350;
let bullet = 0;

async function emitExplosion(subject) {
	eventBus.$emit(subject + '-explodes');
	await wait(explodingTime - 50);

	if (process.env.NODE_ENV === 'development' && window.LOOP_EXPLOSION) {
		async function loopExplosion() {
			eventBus.$emit(subject + '-explodes');
			await wait(1000);
			await loopExplosion();
		}
		await loopExplosion()
	}
}

function emitScore(subject, score) {
	eventBus.$emit(subject + '-score', score);
}

async function emitShot(subject) {
	const bulletId = bullet ++;
	eventBus.$emit(subject + '-shots', bulletId);
	await waitForBullet(bulletId);
}

function waitForBullet(bulletId) {
	return new Promise((resolve) => {
		eventBus.$on('gotcha', (bulletThatHit) => {
			if (bulletId === bulletThatHit) resolve();
		});
	});
};


export default {
	async heroExplodes() {
		await emitExplosion('hero');
	},

	async foeExplodes(score) {
		emitScore('foe', score);
		await emitExplosion('foe');
	},

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

	async getPerk(prize) {
		return new Promise((resolve, reject) => {
			eventBus.$on('catched', resolve);
			// setTimeout(reject, 5000);
		});
	},
};
