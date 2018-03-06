import store from '@/store';
import { findPerk } from '@/data/perks';
import testKeyboard from './testKeyboard';
import { wait } from '@/utils/functions';

/*
	Uncomment scenarios to test them.
	testingOn is necessary for any senario to work. 
*/

const scenarios = [
	// 'testingOn',

	'haste',
	'mute',
	'testKeyboard',
	'autoBegin',
	// 'perks',

	// 'foeWontCome',
	'foeCantShot',
]

const use = (testedScenario = 'testingOn') => scenarios.includes(testedScenario);
window.store = store;

(async function() {

if (!use()) return;



if (use('haste')) window.HASTE = 0.2;
if (use('mute')) { store.state.musicEnabled = false; store.state.audioEnabled = false; }
if (use('testKeyboard')) testKeyboard(store);
if (use('autoBegin')) store.dispatch('beginGame');

if (use('foeWontCome')) store._actions.sendFoe = () => {};
if (use('foeCantShot')) store._actions.foeShots = () => {};

if (use('perks')) {
	await store.dispatch('getPerk', findPerk('foresight'));
	await store.dispatch('getPerk');
	await store.dispatch('getPerk');
}




})();
