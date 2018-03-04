<template>
	<div class="the-question" v-if="challenge">
		<p class="the-question__question">
			{{ question }}
			<span v-if="powerOf" class="power-of">{{ powerOf }}</span>
		</p>
		<TheInput class="the-question__input" :fields="userAnswer" :blanks="blanks" />
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
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

			...mapGetters([
				'factors',
				'toThePowerOf',
				'userAnswer',
				'blanks',
			]),

			question() {
				return this.factors.join(' * ');
			},

			powerOf() {
				return this.toThePowerOf > 1 && this.toThePowerOf;
			}
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
		}
	}

	.power-of {
		vertical-align: super;
		font-size: 75%;
		margin-left: -0.5em;
	}
	
</style>
