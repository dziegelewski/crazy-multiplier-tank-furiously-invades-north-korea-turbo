<template>
	<div class="grass-leaves" />		
</template>

<script>
	export default {
		name: 'GrassLeaves',

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/shared';
	.grass-leaves {
		width: 200%;
		border-top: 6px dashed black;
		animation: 2s moving infinite;
		animation-timing-function: linear;
	}

	@keyframes moving {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
</style>