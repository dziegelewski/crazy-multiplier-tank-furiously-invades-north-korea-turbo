<template>
	<div class="grass-leaves" />		
</template>

<script>
	export default {
		name: 'GrassLeaves',

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.grass-leaves {
		@extend %path;
		background-image: url('../assets/images/grass/ground1.png');
	}
</style>