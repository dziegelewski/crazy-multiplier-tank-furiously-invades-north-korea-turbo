import eventBus from '@/utils/eventBus';
import { wait } from '@/utils/functions';

async function foeExplodes() {
	eventBus.$emit('foe-explodes');
	await wait(300);
}

async function heroExplodes() {
	eventBus.$emit('hero-explodes');
	await wait(300);
}

export default {
	foeExplodes,
	heroExplodes,
};
