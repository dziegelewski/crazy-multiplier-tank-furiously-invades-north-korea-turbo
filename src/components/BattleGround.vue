<template>
	<div class="battle-ground">

		<div class="battle-ground__center">
			<VehicleSprite
				v-if="isPlayMode"
				id="hero-vehicle"
				:model="playerName"
				class="battle-ground__vehicle battle-ground__vehicle--left"
			/>

			<div class="bullet bullet--hero" id="hero-bullet"/>

			<transition name="arrive">
				<VehicleSprite
					v-if="foe"
					id="foe-vehicle"
					:model="foeName"
					class="battle-ground__vehicle battle-ground__vehicle--right"
				/>
			</transition>

			<div class="bullet bullet--foe" id="foe-bullet" />

		</div>

		<GrassLeaves class="battle-ground__grass-leaves" />
	</div>
</template>

<script>
	import GrassLeaves from '@/components/GrassLeaves';
	import VehicleSprite from '@/components/VehicleSprite';
	import { mapState, mapGetters } from 'vuex';
	import eventBus from '@/utils/eventBus';
	import shot from '@/utils/shot';
	
	export default {
		name: 'BattleGround',

		components: {
			GrassLeaves,
			VehicleSprite,
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

		methods: {
			shot,

			heroShots(bulletId) {
				this.shot({
					bulletId,
					diretion: 'right',
					shooter: this.$el.querySelector('#hero-vehicle'),
					target: this.$el.querySelector('#foe-vehicle'),
					bullet: this.$el.querySelector('#hero-bullet'),
				});
			},

			foeShots(bulletId) {
				this.shot({
					bulletId,
					diretion: 'left',				
					shooter: this.$el.querySelector('#foe-vehicle'),
					target: this.$el.querySelector('#hero-vehicle'),
					bullet: this.$el.querySelector('#foe-bullet'),
				});
			},
		},

		mounted() {
			eventBus.$on('hero-shots', bulletId => this.heroShots(bulletId));
			eventBus.$on('foe-shots', bulletId => this.foeShots(bulletId));

		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';

	.battle-ground {
		width: 100%;
		display: flex;
		position: absolute;
		height: 30vh;

		&__center {
			width: 360px;
			margin: 0 auto;
			position: relative;
		}

		&__vehicle {
			z-index: 1;
			position: absolute;
			bottom: 0;
			$vehicle-offset: 0;

			&--right {
				right: $vehicle-offset;
			}

			&--left {
				left: $vehicle-offset;
			}
		}
		
		&__grass-leaves {
			position: absolute;
			bottom: 0;
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

		.bullet {
	    width: 10px;
	    height: 10px;
	    border-radius: 50%;
	    background: black;
	    bottom: 40px;
	    position: absolute;
	    display: none;

	    &--hero {
	    	left: 125px;
	    }

	    &--foe {
	    	right: 125px;
	    }
	  }
	}
</style>