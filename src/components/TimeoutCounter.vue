<template>
		<transition-group class="timeout-counter" name="fade">
			<span
				v-if="isSecret"
				class="timeout-counter__secret"
				key="-1"
			>?</span>

			<div
				v-else
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

			isSecret: {
				type: Boolean,
				default: false,
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
			box-sizing: border-box;
			background: black;
			margin-left: 1px;
			margin-bottom: 2px;
			
			border: 2px solid black;
			width: 5px;
			height: 4px;
			@include small {
				width: 8px;
				height: 6px;
			}

			&--extra {
				border-color: $score-color;
				background: $score-color;
			}
		}

		&__secret {
			font-weight: bold;
			margin: 0 20px;
		}
	}
</style>
