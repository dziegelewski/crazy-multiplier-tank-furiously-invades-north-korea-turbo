<template>
	<div class="game-summary">
		<div class="game-summary__inner">
			<p>Score: <b>{{ score }}</b>
				<span
				class="game-summary__highscore"
				v-if="summary.isHighscore"
				>
					new highscore!
				</span>
			</p>
			<p>Multiplying accuracy: <b>{{ accuracyFormatted }}</b></p>
			<p>Stage reached: <b>{{ province.name }} ({{ province.number }})</b></p>
			<p>Enemies defeated: <b>{{ summary.foesKilled }}</b></p>
			<p>Perks collected: <b>{{ summary.perks }}</b></p>
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
				return `${Math.floor(this.accuracy)}%`;
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
			margin: 10px;
			@include small {
				margin: 0 auto;
			}
			max-width: 500px;
			border: 2px solid black;
			padding: 10px 0;
		}

		&__highscore {
			color: $score-color;
			text-transform: uppercase;
			font-weight: 700;
		}

		b {
			font-weight: bold;
		}
	}
</style>