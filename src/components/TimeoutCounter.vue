<template>
		<transition-group class="timeout-counter" name="fade">
			<div
				v-for="unit in timeout"
				:key="unit"
				class="timeout-counter__unit"
				:class="{'timeout-counter__unit--extra': unit <= extraTime }"
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

			extraTime: {
				type: Number,
				required: true,
			},

			side: {
				type: String,
			},
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';

	.timeout-counter {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		margin-top: 10px;

		&__unit {
			border: 2px solid black;
			background: black;
			width: 4px;
			height: 3px;
			margin-left: 1px;

			&--extra {
				border-color: blue;
				background: blue;
			}
		}
	}
</style>
