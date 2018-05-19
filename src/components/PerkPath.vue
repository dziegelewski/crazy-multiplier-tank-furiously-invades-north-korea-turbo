<template>
	<div
		class="perk-path"
	>
		<img
			:src="image"
			class="perk-path__perk"
			id="perk"
		/>
	</div>
</template>

<script>
	import eventBus from '@/utils/eventBus';
	import { detectCollision, elementTranslate } from '@/utils/collision';
	import { mapState } from 'vuex';

	export default {
		name: 'PerkPath',
		props: {
			perk: {
				type: Object,
			},
		},
		computed: {
			image() {
				return require(`../assets/images/perks/${this.perk.shortName}.png`);
			},
			...mapState([
				'speed',
			]),
		},
		mounted() {
			this.$nextTick(() => {
				const perk = document.querySelector('#perk');
				const heroTank = document.querySelector('#hero-vehicle');
				const movePerk = elementTranslate(perk, 0);
				let isMoving = true;

				(function move(path) {
					movePerk(-path.speed);
					if (isMoving) {
						requestAnimationFrame(() => move(path));
					}
				}(this));

				detectCollision(perk, heroTank, 'left')
					.then(() => {
						eventBus.$emit('perk-catched');
						isMoving = false;
					});
			});
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.perk-path {
		@extend %path;

		&__perk {
			width: 45px;
			height: 45px;
			@include screen {
				width: 60px;
				height: 60px;
				
			}
			position: absolute;
			bottom: 10px;
			right: 50%;
			z-index: 5;
		}
	}
</style>