import store from '@/store';
import { findPerk } from '@/data/perks';
import testKeyboard from './testKeyboard';

/*
	Uncomment scenarios to test them.
	testingOn is necessary for any senario to work. 
*/

const scenarios = [
	'testingOn',

	// 'haste',
	// 'mute',
	'testKeyboard',
	'autoBegin',
	// 'perks',
	// 'loopExplosion',
	// 'heroInvincible',

	// 'foeWontCome',
	// 'foeWontShot',
	// 'foeShotsFast',

	// 'startingProvince',
];

const startingProvince = 4;

const use = (testedScenario = 'testingOn') => scenarios.includes(testedScenario);
window.store = store;

(async function() {

if (!use()) return;

if (use('haste')) window.HASTE_MODE_ENABLED = true;
if (use('mute')) { store.state.musicEnabled = false; store.state.audioEnabled = false; }
if (use('testKeyboard')) testKeyboard(store);
if (use('autoBegin')) store.dispatch('beginGame');

if (use('startingProvince')) store.state.startingProvince = startingProvince

if (use('heroInvincible')) store.state.hero.hurt = function() {};

if (use('loopExplosion')) window.LOOP_EXPLOSION = true;

if (use('foeWontCome')) store._actions.sendFoe = () => {};
if (use('foeWontShot')) store._actions.foeShots = () => {};
if (use('foeShotsFast')) window.FOE_FAST_SHOT = true;

if (use('perks')) {
	await store.dispatch('getPerk', findPerk('doubleShooter'));
	// await store.dispatch('getPerk');
	// await store.dispatch('getPerk');
	// await store.dispatch('getPerk');
	// await store.dispatch('getPerk');
	// await store.dispatch('getPerk');
}




})();
