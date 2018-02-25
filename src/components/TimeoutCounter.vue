<template>
		<transition-group class="timeout-counter" name="fade">
			<div
				v-for="unit in timeout"
				:key="unit"
				class="timeout-counter__unit"
			/>
		</transition-group>
</template>

<script>
	export default {
		name: 'TimeoutCounter',
		props: {
			timeout: {
				type: Number,
				required: true,
			},
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';

	.timeout-counter {
		display: flex;
		flex-direction: row-reverse;
		&__unit {
			border: 3px solid black;
			width: 20px;
			height: 10px;
			margin-left: 5px;
		}
	}
</style>
