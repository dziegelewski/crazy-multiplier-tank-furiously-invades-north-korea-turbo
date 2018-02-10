<template>
	<div class="game-info">

    <TheQuestion />
    <ScoresCounter />
    <ProvinceInfo />

		<HeartsContainer :hearts="heroHearts" />
		<HeartsContainer :hearts="foe.hearts" v-if="foe" />


	</div>
</template>

<script>
	import HeartsContainer from '@/components/HeartsContainer';
  import TheQuestion from '@/components/TheQuestion';
  import ProvinceInfo from '@/components/ProvinceInfo';
  import ScoresCounter from '@/components/ScoresCounter';
	import { mapState } from 'vuex';

	export default {
		name: 'GameInfo',
		components: {
			HeartsContainer,
	    TheQuestion,
	    ProvinceInfo,
	    ScoresCounter,
		},
		computed: {
			...mapState([
				'foe',
				'heroHearts',
			]),

		},
	};
</script>

<style lang="scss">

</style>