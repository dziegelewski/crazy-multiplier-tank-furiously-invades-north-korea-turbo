<template>
	<!-- <transition name="fade"> -->
		<div class="the-message">
			<p
				v-for="line in messageLines"
				class="the-message__message"
				:class="className"
				>
				{{ line }}
			</p>
		</div>
	<!-- </transition> -->
</template>

<script>
	export default {
		name: 'TheMessage',
		props: {
			message: {
				type: Object,
			},
		},
		computed: {

			style() {
				return this.message.style;
			},

			className() {
				return this.style ? `the-message__message--${this.style}` : null;
			},

			messageLines() {
				return this.message.text.split('|');
			},
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.the-message {
		margin: 0 auto;
		width: 100%;
		text-align: center;
		font-weight: bold;

		&__message {
			@extend %medium-font;
			line-height: 150%;

			&--alert,
			&--alert-big {
				color: $alert-color;
				@extend %blinking;
			}

			&--old-score {
				color: $score-color;
				opacity: 0.66;
			}

			&--score {
				color: $score-color;
			}
		}
	}
</style>