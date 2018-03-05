<template>
	<div class="hearts">
			<div
				v-for="heart in hearts"
				class="heart medium-min"
			/>
			<span class="heart small-max" />
			<span class="hearts__hearts-number small-max">{{ hearts }}</span>
	</div>
</template>

<script>
	export default {
		name: 'HeartsContainer',
		props: {
			hearts: {
				type: Number,
				required: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';

	.hearts {
		display: flex;
		flex-wrap: wrap;

		&__hearts-number {
			font-weight: bold;
		}
	}

	.heart {
		$size: 1rem;
		min-width: $size;
		height: $size;
		margin: 0 3px;
		border-radius: 50%;
		display: inline-block;
		background-image: url('../assets/images/heart.png');
		background-size: 100% 100%;
	}

	.medium-min {
		display: none;
		@include small {
			display: flex;
		}
	}

	.small-max {
		display: block;
		@include small {
			display: none;
		}
	}

</style>