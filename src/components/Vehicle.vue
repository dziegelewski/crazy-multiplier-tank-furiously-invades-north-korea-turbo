<template>
		<div class="vehicle">
			<img
				class="vehicle__object"
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

	export default {
		name: 'Vehicle',
		props: {
			model: {
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
				return require(`../assets/${this.model}.png`);
			},

			isPlayer() {
				return this.model === 'hero-tank';
			},

			isFoe() {
				return !this.isPlayer;
			},
		},

		methods: {
			explode() {
				this.isExploding = true;
				setTimeout(() => {
					this.isExploding = false;
				}, 350);
			},

			// gainScore() {

			// },
		},

		mounted() {
			if (this.isFoe) {
				eventBus.$on('foe-explodes', this.explode);
			}

			if (this.isPlayer) {
				eventBus.$on('hero-explodes', this.explode);
			}
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/shared';

	.vehicle {
		position: absolute;

		&__object {
			height: 120px;
			animation: ride 300ms infinite;
		}

		&__explosion {
			$height: 80px;
			$width: $height * 1.4;
			height: $height;
			width: $width;
			top: calc(50% - #{$height});
			left: calc(65% - #{$width});
			
			background: url(../assets/explosion.png);
			background-size: 100% 100%;
			position: absolute;
			display: block;
		}

		.explode {
			&-enter-active {
				transition: transform .34s;
				transform: scale(3);
			}

			&-enter {
				transform: scale(1);
			}
		}
	}

	@keyframes ride {
		50% { transform: translateY(-5px); }
	}
</style>
