<template>
	<div :class="classArray">

		<template v-if="singleLine">
			<p class="option__line">{{ label }}</p>
			
		</template>

		<template v-else>
			<p class="option__line">{{ math }}</p>
			<p class="option__line">{{ label }}:  <span class="option__value">{{ status }}</span></p>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'MenuOption',
		props: {
			label: {
				type: String,
			},
			math: {
				type: String,
			},
			condition: {
				type: Boolean,
				default: true,
			},
			singleLine: {
				type: Boolean,
			},
			important: {
				type: Boolean,
			},
		},
		computed: {
			isOn() {
				return !!this.condition;
			},

			status() {
				return this.isOn ? 'on' : 'off';
			},

			classArray() {
				return [
					'option',
					'option--' + this.status,
					{ 'option--important': this.important },
				];
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.option {
		font-size: $small-font;
		color: red;
		text-align: center;
		font-weight: 700;


		&--off {
			opacity: 0.6;
		}

		&--important {
			@extend %blinking;
			animation-duration: $slow-blinking-duration;
		}

		&__line {
			line-height: 150%;
		}

		&__value {
			text-transform: uppercase;
			display: inline-block;
			text-align: left;
			width: 2.5em;
		}
	}
	
</style>