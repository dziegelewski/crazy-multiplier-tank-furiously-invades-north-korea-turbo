<template>
	<transition name="fade">
		<div class="the-message">
			<p
				class="the-message__message"
				:class="className"
				v-html="message.text" />
		</div>
	</transition>
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
		}

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

			&--alert {
				color: $alert-color;
				@extend %blinking;
			}
		}

	}
</style>