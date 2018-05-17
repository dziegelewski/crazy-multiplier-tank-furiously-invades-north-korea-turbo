<template>
	<transition name="slide" v-if="showCurrentProvince && province">
		<p class="province-info">Stage {{ province.number }}. {{ province.name }}</p>
	</transition>
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

	.slide-enter-active, .slide-leave-active {
	  transition: transform 1s;
	  transition-timing-function: linear;
	  transition-delay: .5s;
	}

	.slide-enter, .slide-leave-to {
	  transform: translateX(300px)
	}
</style>