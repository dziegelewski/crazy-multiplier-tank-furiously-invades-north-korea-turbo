<template>
	<div class="the-message" v-if="message">
		<p class="the-message__message">{{ message }}</p>
	</div>
</template>

<script>
	export default {
		name: 'TheMessage',
		props: {
			message: {
				type: String,
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

		&__message {
			@extend %medium-font;
		}

	}
</style>