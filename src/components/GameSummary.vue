<template>
	<div class="game-summary">
		<div class="game-summary__inner">
			<p>Score: <b>{{ score }}</b></p>
			<!-- Is highscore! -->
			<p>Multiplying accuracy: <b>{{ accuracyFormatted }}</b></p>
			<p>Stage reached: <b>{{ province.name }} ({{ province.number }})</b></p>
			<p>Enemies defeated: <b>{{ summary.foesKilled }}</b></p>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'SummaryMode',
		computed: {
			...mapState([
				'province',
				'score',
				'summary',
			]),

			accuracy() {
				const { shots, hits } = this.summary;
				return shots ? (hits / shots * 100) : 0;
			},

			accuracyFormatted() {
				return Math.floor(this.accuracy) + '%';
			},
		},

	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';
	.game-summary {
		@extend %small-font;
		line-height: 150%;
		margin: 5% 0;

		&__inner {
			margin: 0 auto;
			background: teal;
			max-width: 500px;
			background: $pale-alert-color;
			padding: 10px 0;
		}

		b {
			font-weight: bold;
		}
	}
</style>