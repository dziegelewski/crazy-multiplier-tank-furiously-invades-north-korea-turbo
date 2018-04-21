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
	import { detectCollision } from '@/utils/collision';
	
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
		},
		mounted() {
			this.$nextTick(() => {
				const perk = document.querySelector('#perk');
				const heroTank = document.querySelector('#hero-vehicle');

				detectCollision(perk, heroTank, 'left')
					.then(() => eventBus.$emit('catched'));
			});
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.perk-path {
		@extend %path;

		&__perk {
			width: 60px;
			height: 60px;
			position: absolute;
			bottom: 10px;
			right: 50%;
			z-index: 5;
		}
	}
</style>