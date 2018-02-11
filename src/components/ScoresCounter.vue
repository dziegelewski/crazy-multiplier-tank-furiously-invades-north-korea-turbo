<template>
	<p class="scores">{{ score }}</p>
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
	@import 'src/assets/shared';
	.scores {
		font-size: $medium-font;
		color: $score-color;

	}
</style>
