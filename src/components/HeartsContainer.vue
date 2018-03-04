<template>
	<div class="hearts">
		<!-- 	<div
				v-for="heart in hearts"
				class="heart"
			/> -->
			<span class="heart" />
			<span class="hearts__hearts-number">{{ hearts }}</span>
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

</style>