<template>
	<div class="the-input">
			<div
				v-for="field in displayedFields"
				class="the-input__field"
			>
				{{ field.value }}
				<div v-if="field.hint" class="the-input__hint">
					{{ field.hint }}
				</div>
			</div>
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
			hint: {
				required: false,
			},
		},

		computed: {
			displayedFields() {
				return this.fields.map((field, fieldIndex) => {
					const value = Number.isInteger(field) ? field : '_';
					const hint = this.hint && (this.hint.index === fieldIndex) && this.hint.value;
					return {
						value,
						hint,
					};
				});
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';

	.the-input {
		@extend %big-font;
		margin: 0 auto;
		text-align: center;

		&__field {
			display: inline-block;
			width: .7em;
			margin: 0 3px;
			position: relative;
			z-index: 1;
		}

		&__hint {
			top: 0;
			left: 0;
			position: absolute;
			color: blue;
			opacity: 0.5;
			z-index: -1;
			width: inherit;
		}
	}

</style>