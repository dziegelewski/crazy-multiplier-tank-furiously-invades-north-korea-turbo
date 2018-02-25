<template>
	<div v-if="province">
		<p class="province-info">{{ province.name }}</p>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'ProvinceInfo',
		computed: {
			...mapState([
				'province',
			]),
		},
	};
</script>

<style lang="scss">
	@import 'src/assets/shared';

	.province-info {
		@extend %medium-font;
	}

</style>