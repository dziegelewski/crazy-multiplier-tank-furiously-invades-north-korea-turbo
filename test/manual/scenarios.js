/* eslint-disable */

import store from '@/store';
import testKeyboard from './testKeyboard';
import Challenge from "@/classes/Challenge";
import provinces from '@/data/provinces';
import * as perks from '@/data/perks';

const foes = require('@/data/foes');

/*
	Uncomment scenarios to test them.
	testingOn is necessary for any senario to work. 
*/

const scenarios = [
	// 'testingOn',

	// 'logScenarios',

	// 'haste',
	'mute',
	'testKeyboard',
	// 'autoBegin',
	// 'loopExplosion',
	'heroImmortal',

	// 'foeWontCome',
	// 'foeWontShot',
	// 'foeShotsFast',

	{ province: 7 },
	{ foes: [ foes.van1 ] },
	{ perks: [ perks.extraScore ] },

	// 'factorsTable',
];


const use = (testedScenario = 'testingOn') => {
	const result = scenarios.includes(testedScenario) || scenarioVal(testedScenario) !== undefined;
	result && scenarios.includes('logScenarios') &&
	console.info(`Testing scenario: ${testedScenario}`);
	return result;
}

const scenarioVal = name => {
	const scenarioObject = scenarios.find(scenario => scenario.hasOwnProperty(name));
	return scenarioObject && scenarioObject[name]
}

window.store = store;

(async function() {

if (!use()) return;

if (use('haste')) window.HASTE_MODE_ENABLED = true;
if (use('mute')) { store.state.musicEnabled = false; store.state.audioEnabled = false; }
if (use('testKeyboard')) testKeyboard(store);
if (use('autoBegin') || use('province')) store.dispatch('beginGame');
if (use('province')) store.state.startingProvince = scenarioVal('province');
if (use('foes')) window.TESTED_FOES = scenarioVal('foes');
if (use('heroImmortal')) store.state.hero.hurt = function() {};
if (use('loopExplosion')) window.LOOP_EXPLOSION = true;
if (use('foeWontCome')) store._actions.sendFoe = () => {};
if (use('foeWontShot')) window.FOE_WONT_SHOT = true;
if (use('foeShotsFast')) window.FOE_FAST_SHOT = true;

if (use('perks')) {
	const perksToProvide = scenarioVal('perks');

	(async function nextPerk() {
		const perk = perksToProvide.shift();
		await store.dispatch('getPerk', perk);
		if (perksToProvide.length) nextPerk()
	})()
}

if (use('factorsTable')) {
	const table = provinces.reduce((total, province, index) => {
		const provinceNumber = index + 1;
		const provinceChallenge = new Challenge({ level: provinceNumber })
		total.push({ 
			number: provinceNumber,
			name: province,
			minFactor: provinceChallenge.minFactorValue,
			maxFactor: provinceChallenge.maxFactorValue,
		});
		return total;
	}, []);
	console.table(table)
}




})();
