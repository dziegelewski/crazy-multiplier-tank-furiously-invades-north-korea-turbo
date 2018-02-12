<template>
	<div class="battle-ground">


<!-- 		<TankZone class="battle-ground__half" />
		<FoeZone class="battle-ground__half" /> -->
		<!-- <IncomingPrize /> -->
		
		<Vehicle
			v-if="isPlayMode"
			:model="playerName"
			class="battle-ground__vehicle battle-ground__vehicle--left"
		/>

		<transition name="arrive">
			<Vehicle
				v-if="foe"
				:model="foeName"
				class="battle-ground__vehicle battle-ground__vehicle--right"
			/>
		</transition>

		<GrassLeaves class="battle-ground__grass-leaves" />
	</div>
</template>

<script>
	import GrassLeaves from '@/components/GrassLeaves';
	import Vehicle from '@/components/Vehicle';
	import { mapState, mapGetters } from 'vuex';
	
	export default {
		name: 'BattleGround',

		components: {
			GrassLeaves,
			Vehicle,
		},

		computed: {
			...mapState([
				'foe',
			]),

			...mapGetters([
				'isPlayMode',
			]),

			playerName() {
				return 'hero-tank';
			},

			foeName() {
				return this.foe && this.foe.type;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/shared';

	.battle-ground {
		width: 100%;
		display: flex;
		position: absolute;
		top: 60%;

		&__vehicle {
			z-index: 1;
			$vehicle-offset: 3%;

			&--right {
				right: $vehicle-offset;
			}

			&--left {
				left: $vehicle-offset;
			}
		}
		
		&__grass-leaves {
			position: absolute;
			bottom: -90px;
		}

		.arrive {
			&-enter-active {
				transition: transform .5s;
				transform: translateX(0px);
			}

			&-enter {
				transform: translateX(300px);
			}
		}
	}
</style>