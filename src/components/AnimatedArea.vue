<template>
	<div class="animated-area">
	<template v-if="!placeholder">
		<div class="animated-area__center">
			<Vehicle
				v-if="isGameMode"
				id="hero-vehicle"
				:name="hero.name"
				class="animated-area__vehicle animated-area__vehicle--left"
			/>

			<div class="bullet bullet--hero" id="hero-bullet"/>

			<transition name="arrive">
				<Vehicle
					v-if="foe"
					id="foe-vehicle"
					:name="foe.name"
					class="animated-area__vehicle animated-area__vehicle--right"
				/>
			</transition>

			<div class="bullet bullet--foe" id="foe-bullet" />

		</div>

		<GrassLeaves class="animated-area__grass-leaves" />
	</template>
	</div>
</template>

<script>
	import GrassLeaves from '@/components/GrassLeaves';
	import Vehicle from '@/components/Vehicle';
	import { mapState, mapGetters } from 'vuex';
	import eventBus from '@/utils/eventBus';
	import shot from '@/utils/shot';
	
	export default {
		name: 'AnimatedArea',

		components: {
			GrassLeaves,
			Vehicle,
		},

		props: {
			placeholder: {
				type: Boolean,
				default: false,
			},
		},

		computed: {
			...mapState([
				'hero',
				'foe',
			]),

			...mapGetters([
				'isGameMode',
			]),
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

	.animated-area {
		width: 100%;
		display: flex;
		position: absolute;
		height: 30vh;
		@include screen {
			height: 0;
			top: initial;
			bottom: 20%;
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
			$vehicle-offset: -10%;

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