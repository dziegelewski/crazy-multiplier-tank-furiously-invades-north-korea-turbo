<template>
	<div class="game-mode">
		<div class="game-mode__top-bar">
	    <ScoresCounter class="game-mode__score" />
	    <ProvinceInfo class="game-mode__province-info"/>
		</div>

		<div class="game-mode__middle-bar">
	    <CharacterInfo
		    :owner="hero"
		    side="left"
	    />

	    <CentralInfo class="game-mode__main-info" />

	    <CharacterInfo
		    :owner="foe"
		    side="right"
	    />
    </div>


	</div>
</template>

<script>
  import ProvinceInfo from '@/components/ProvinceInfo';
  import ScoresCounter from '@/components/ScoresCounter';
  import CentralInfo from '@/components/CentralInfo';
  import CharacterInfo from '@/components/CharacterInfo';
  import { mapState } from 'vuex';

	export default {
		name: 'GameMode',
		components: {
			ProvinceInfo,
			ScoresCounter,
			CentralInfo,
			CharacterInfo,
		},
		computed: {
			...mapState([
				'hero',
				'foe',
			]),
		},
	};
</script>

<style lang="scss" scoped>
	@import 'src/assets/styles/shared';
	.game-mode {

		&__top-bar {
				margin-top: 2vh;
				display: flex;
				justify-content: space-between;
				padding: 0 5px;
		}

		&__middle-bar {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			height: 25vh;
			margin-top: 4vh;
			@include screen {
				height: 150px;
      }
		}
	}
</style>