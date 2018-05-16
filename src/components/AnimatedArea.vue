<template>
	<div class="animated-area">
		<div class="animated-area__center">
			<Vehicle
				v-if="isGameMode"
				id="hero-vehicle"
				:name="hero.name"
				class="animated-area__vehicle"
				data-direction="right"
			/>

			<transition name="arrive">
				<Vehicle
					v-if="foe"
					id="foe-vehicle"
					:name="foe.name"
					class="animated-area__vehicle"
					data-direction="left"
				/>
			</transition>
		</div>

		<GrassLeaves class="animated-area__grass-leaves" />
		
		<PerkPath v-if="incomingPerk" :perk="incomingPerk" />

	</div>
</template>

<script>
	import GrassLeaves from '@/components/GrassLeaves';
	import Vehicle from '@/components/Vehicle';
	import PerkPath from '@/components/PerkPath';
	import { mapState, mapGetters } from 'vuex';
	import eventBus from '@/utils/eventBus';
	import shot from '@/utils/shot';
	import { detectCollision, elementTranslate } from '@/utils/collision';

	export default {
		name: 'AnimatedArea',

		components: {
			GrassLeaves,
			Vehicle,
			PerkPath,
		},

		computed: {
			...mapState([
				'hero',
				'foe',
				'incomingPerk',
			]),

			...mapGetters([
				'isGameMode',
			]),
		},

		methods: {

			getVehicle(owner) {
				return this.$el.querySelector(`#${owner}-vehicle`);
			},

			heroShots(bulletId) {
				shot({
					bulletId,
					shooter: this.getVehicle('hero'),
					target: this.getVehicle('foe'),
				});
			},

			foeShots(bulletId) {
				shot({
					bulletId,
					shooter: this.getVehicle('foe'),
					target: this.getVehicle('hero'),
				});
			},

			foeRushes() {
				const foeVehicle = this.getVehicle('foe');
				const heroVehicle = this.getVehicle('hero');
				const moveFoe = elementTranslate(foeVehicle);

				const rushingInterval = setInterval(() => {
					moveFoe(-30);
				}, 10);

				detectCollision(foeVehicle,	heroVehicle, 'left')
				.then(() => {
					clearInterval(rushingInterval);
					eventBus.$emit('impact');
				});
			},
		},

		mounted() {
			eventBus.$on('hero-shots', bulletId => this.heroShots(bulletId));
			eventBus.$on('foe-shots', bulletId => this.foeShots(bulletId));
			eventBus.$on('foe-rushes', () => this.foeRushes());
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';

	.animated-area {
		width: 100%;
		display: flex;
		position: absolute;
		height: 30vh;
		@include screen {
			height: 0;
			top: initial;
			bottom: 25%;
		}

		&__center {
			width: 360px;
			margin: 0 auto;
			position: relative;
			@include small {
				width: 90%;
			}

			@include screen {
				width: 70%;
			}
		}

		&__vehicle {
			z-index: 1;
			position: absolute;
			bottom: 0;
			$vehicle-offset: 2.5%;

			&[data-direction="left"] {
				right: $vehicle-offset;
			}

			&[data-direction="right"] {
				left: $vehicle-offset;
			}
		}
	}
</style>