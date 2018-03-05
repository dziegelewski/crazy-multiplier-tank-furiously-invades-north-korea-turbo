<template>
	<div class="the-input">
			<span
				v-for="letter in inputLetters"
				class="the-input__letter"
			>
			{{ letter }}
			</span>
	</div>
</template>

<script>
	export default {
		name: 'TheInput',
		props: {
			fields: {
				type: Array,
				required: true,
			},

			blanks: {
				type: Number,
				required: true,
			},
		},

		computed: {
			numberOfEmptyBlanks() {
				return this.blanks - this.fields.length;
			},

			emptyBlanks() {
				return Array(this.numberOfEmptyBlanks).fill('_');
			},

			inputLetters() {
				return [...this.fields, ...this.emptyBlanks];
			},
		},

	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';

	.the-input {
		@extend %big-font;
		margin: 0 auto;
		text-align: center;

		&__letter {
			display: inline-block;
			width: .7em;
			margin: 0 3px;
		}
	}



</style>