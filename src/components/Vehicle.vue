<template>
		<div class="vehicle">
			<img
				class="vehicle__vehicle"
				:src="backgroundImage"
			/>
		</div>
</template>

<script>
	export default {
		name: 'Vehicle',
		props: {
			name: {
				type: String,
				required: true,
			},
		},

		computed: {
			backgroundImage() {
				return require(`../assets/images/vehicles/${this.name}.png`);
			},
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
	}

	@keyframes ride {
		50% { transform: translateY(-5px); }
	}
</style>
