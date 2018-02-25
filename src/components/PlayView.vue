<template>
	<div class="play-view">

    <ScoresCounter class="play-view__score" />

		<HeartsContainer
			:hearts="heroHearts"
			class=" play-view__hearts play-view__hearts--hero"

		/>
		<HeartsContainer
			v-if="displayFoeHearts" 
			:hearts="foe.hearts"
			class="play-view__hearts play-view__hearts--foe"
		/>

		<TimeoutCounter
			v-if="challenge" :timeout="challenge.leftTimeout"
			class="play-view__timeout"
		/>

    <ProvinceInfo class="play-view__province-info"/>

    <TheMessage class="play-view__message" v-if="displayMessage" :message="message"  />
    <TheQuestion class="play-view__question" v-else />

	</div>
</template>

<script>
	import HeartsContainer from '@/components/HeartsContainer';
  import TheQuestion from '@/components/TheQuestion';
  import TheMessage from '@/components/TheMessage';
  import ProvinceInfo from '@/components/ProvinceInfo';
  import ScoresCounter from '@/components/ScoresCounter';
  import TimeoutCounter from '@/components/TimeoutCounter';
	import { mapState, mapGetters } from 'vuex';

	export default {
		name: 'PlayView',
		components: {
			HeartsContainer,
	    TheQuestion,
	    TheMessage,
	    ProvinceInfo,
	    ScoresCounter,
	    TimeoutCounter,
		},
		computed: {
			...mapState([
				'foe',
				'challenge',
				'heroHearts',
				'message',
			]),

			displayMessage() {
				return this.message;
			},

			displayFoeHearts() {
				return this.foe && this.foe.displayHearts;
			},

		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';
	.play-view {

		&__score {
			position: absolute;
			top: 10%;
			left: 5%;
		}

		&__question {
			position: absolute;
			bottom: 0;
		}

		&__message {
			position: absolute;
			// top: 25%;
			bottom: 0
		}

		&__province-info {
			position: absolute;
			top: 10%;
			right: 10%;
		}

		&__hearts {
			position: absolute;
			bottom: 10%;
			$hearts-shift: 5%;

			&--hero {
				left: $hearts-shift;
			}

			&--foe {
				right: $hearts-shift;

			}
		}

		&__timeout {
			position: absolute;
			bottom: 0%;
			right: 5%;
		}
	}


</style>