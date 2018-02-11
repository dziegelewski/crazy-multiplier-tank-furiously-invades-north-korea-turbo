<template>
	<img
		class="vehicle"
		:src="backgroundImage"
	/>
</template>

<script>
	export default {
		name: 'Vehicle',
		props: {
			who: {
				type: String,
				required: true,
			},
		},
		computed: {
			backgroundImage() {
				return require(`../assets/${this.who}.png`);
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/shared';

	.vehicle {
		height: 120px;
		position: absolute;
		animation: ride 300ms infinite;
	}

	@keyframes ride {
			50% { transform: translateY(-5px); }
	}
</style>