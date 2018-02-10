<template>
	<div class="battle-ground">


<!-- 		<TankZone class="battle-ground__half" />
		<FoeZone class="battle-ground__half" /> -->
		<!-- <IncomingPrize /> -->
		<!-- <GrassLeaves /> -->
	</div>
</template>

<script>
	import TankZone from '@/components/TankZone';
	import FoeZone from '@/components/FoeZone';
	
	export default {
		name: 'BattleGround',
		components: {
			TankZone,
			FoeZone,
		},
	};
</script>

<style lang="scss">
	.battle-ground {
		width: 100vw;
		display: flex;

		&--half {
			width: 50%;
			position: relative;
			
		}
	}


	.vehicle {
		width: 200px;
		max-width: 40vw;
		position: absolute;
		left: 50%;
		bottom: 0;

	}

</style>