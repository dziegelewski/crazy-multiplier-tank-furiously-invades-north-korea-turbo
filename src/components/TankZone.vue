<template>
	<div>
		<HeartsContainer :hearts="3" />
		<img src="../assets/hero-tank.png" class="vehicle" />
	</div>
</template>

<script>
	import HeartsContainer from '@/components/HeartsContainer';

	export default {
		components: {
			HeartsContainer,
		},

	};
</script>

<style>

</style>