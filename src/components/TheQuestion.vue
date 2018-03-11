<template>
	<div class="the-question" v-if="challenge">

		<p class="the-question__question">
			{{ question }}
			<span v-if="powerOf" class="the-question__power-of">{{ powerOf }}</span>
		</p>
		<TheInput
			class="the-question__input"
			:fields="fields"
			:hint="hint"
		/>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import TheInput from '@/components/TheInput';

	export default {
		name: 'TheQuestion',
		components: {
			TheInput,
		},
		computed: {
			...mapState([
				'challenge',
			]),

			factors() {
				return this.challenge.factors;
			},

			question() {
				return this.factors.join(' * ');
			},

			powerOf() {
				return this.challenge.toThePowerOf > 1 && this.state.challenge.toThePowerOf;
			},

			fields() {
				return this.challenge.fields;
			},

			hint() {
				return this.challenge.hint;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';
	
	.the-question {
		margin: 0 auto;
		width: 100%;
		text-align: center;

		&__question {
			@extend %big-font;
		}

		&__input {
			margin: 0 auto;
			margin-top: 20px;
		}

		.power-of {
			vertical-align: super;
			font-size: 75%;
			margin-left: -0.5em;
		}
	}

	
</style>
