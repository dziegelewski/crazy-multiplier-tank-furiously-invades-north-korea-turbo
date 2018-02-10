<template>
	<div class="hearts">
		<div
			v-for="heart in hearts"
			class="heart"
		/>
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

<style scoped>

	.heart {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: inline-block;
		margin: 0 10px;
		background-image: url('../assets/heart.png');
		background-size: 100% 100%;
	}

</style>