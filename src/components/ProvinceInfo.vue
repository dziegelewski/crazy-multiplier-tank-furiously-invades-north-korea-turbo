<template>
	<div v-if="showCurrentProvince && province">
		<p class="province-info">Stage {{ province.number }}. {{ province.name }}</p>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'ProvinceInfo',
		computed: {
			...mapState([
				'province',
				'showCurrentProvince',
			]),
		},
	};
</script>

<style lang="scss">
	@import 'src/assets/styles/shared';

	.province-info {
		font-weight: bold;
		@extend %small-font;
	}

</style>