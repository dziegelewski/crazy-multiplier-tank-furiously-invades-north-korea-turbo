<template>
	<div
		:class="'character-info character-info--' + side"
	>
	<template v-if="owner">
   	<HeartsContainer
   		v-if="owner.displayHearts"
			:hearts="owner.hearts"
		/>

		<TimeoutCounter
			v-if="isFoe && challenge"
			:timeout="challenge.leftTimeout"
			:side="side"
		/>

		<BuffsList
			v-if="isHero"
			:buffs="buffs"
		/>
	</template>
	</div>
</template>

<script>
	import HeartsContainer from '@/components/HeartsContainer';
	import TimeoutCounter from '@/components/TimeoutCounter';
	import BuffsList from '@/components/BuffsList';
	import { mapState } from 'vuex';

	export default {
		name: 'CharacterInfo',
		components: {
			HeartsContainer,
			TimeoutCounter,
			BuffsList,
		},
		props: {
			owner: {
				required: true,
			},

			side: {
				type: String,
				required: true,
			},
		},
		computed: {
			...mapState([
				'challenge',
				'hero',
				'foe',
			]),

			isHero() {
				return this.owner === this.hero;
			},

			isFoe() {
				return this.owner === this.foe;
			},

			buffs() {
				return [];
			}
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.character-info {
		display: flex;
		flex-direction: column;
		height: 5vh;

		min-width: 20%;
		max-width: 20%;

		&--left > * {
			margin-left: 5px; 			
		}

		&--right > * {
			margin-right: 5px;
			flex-direction: row-reverse;		

		}
	}
	
</style>