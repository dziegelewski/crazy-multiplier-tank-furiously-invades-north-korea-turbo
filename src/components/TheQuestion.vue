<template>
	<div class="the-question" v-if="challenge">
		<p class="the-question__question">{{ question }}</p>
		<TheInput class="the-question__input" :fields="userAnswer" :blanks="blanks" />
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import TheInput from '@/components/TheInput';

	export default {
		components: {
			TheInput,
		},
		computed: {
			...mapState([
				'challenge',
			]),

			...mapGetters([
				'factors',
				'userAnswer',
				'blanks',
			]),

			question() {
				return this.factors.join(' * ');
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
		}
	}
	
</style>
