<template>
		<div class="vehicle">
			<img
				class="vehicle__vehicle"
				:src="backgroundImage"
			/>

			<transition name="explode">
				<div
					v-if="isExploding"
					class="vehicle__explosion"
				/>
			</transition>
		</div>
</template>

<script>
	import eventBus from '@/utils/eventBus';
	import { wait } from '@/utils/functions';
	import { explodingTime } from '@/utils/animate';

	export default {
		name: 'Vehicle',
		props: {
			name: {
				type: String,
				required: true,
			},
		},

		data() {
			return {
				isExploding: false,
			};
		},

		computed: {
			backgroundImage() {
				return require(`../assets/images/vehicles/${this.name}.png`);
			},

			isPlayer() {
				return this.name === 'hero';
			},

			isFoe() {
				return !this.isPlayer;
			},
		},

		methods: {
			async explode() {
				this.isExploding = true;
				await wait(explodingTime);
				this.isExploding = false;
			},

			gainScore(score) {
				// alert(score);
			},
		},

		mounted() {
			if (this.isFoe) {
				eventBus.$on('foe-explodes', this.explode);
				eventBus.$on('foe-score', score => this.gainScore(score));
			}

			if (this.isPlayer) {
				eventBus.$on('hero-explodes', this.explode);
			}
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';

	.vehicle {
		position: absolute;
		height: 110px;
		@include small {
			height: 130px;
		}
		@include screen {
			height: 160px;
		}

		&__vehicle {
			height: 100%;
			animation: ride 300ms infinite;
		}

		&__explosion {
			$height: 50px;
			$width: $height * 1.4;
			height: $height;
			width: $width;
			top: calc(50% - #{$height});
			left: calc(65% - #{$width});
			
			background: url(../assets/images/explosion.png);
			background-size: 100% 100%;
			position: absolute;
			display: block;
		}
	}

	@keyframes ride {
		50% { transform: translateY(-5px); }
	}
</style>
