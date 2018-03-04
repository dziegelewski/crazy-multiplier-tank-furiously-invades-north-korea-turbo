<template>
	<p class="scores">Score: {{ score }}</p>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState([
				'score',
			]),
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';
	.scores {
		font-size: $small-font;
		color: $score-color;
		font-weight: 700;

	}
</style>
