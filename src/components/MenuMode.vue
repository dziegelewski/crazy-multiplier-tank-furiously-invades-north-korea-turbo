<template>
	<div class="menu-view">

	<img v-if="isFirstGame"
		class="menu-view__logo" src="../assets/images/logo.png" alt=""
	/>

	<GameSummary v-else />
	
	<p class="menu-view__highscore">Highscore: {{ highscore }}</p>

	<div class="menu-view__options">

		<MenuOption 
			label="Sounds"
			math="1 * 1"
			:condition="audioEnabled"
		/>

		<MenuOption 
			:label="'Type 2 * 2 to ' + (isFirstGame ? 'Begin' : 'Retry')"
			single-line
			important
		/>

		<MenuOption 
			label="Music"
			math="3 * 3"
			:condition="musicEnabled"
		/>

	</div>
	
	<TheInput
		:fields="menuInput"
		class="menu-view__input"
		style="margin-top: 20px"
	/>
	</div>
</template>

<script>
	import TheInput from '@/components/TheInput';
	import MenuOption from '@/components/MenuOption';
	import GameSummary from '@/components/GameSummary';
	import { mapState, mapGetters } from 'vuex';


	export default {
		name: 'MenuView',
		components: {
			TheInput,
			MenuOption,
			GameSummary,
		},
		computed: {
			...mapState([
				'menuInput',
				'audioEnabled',
				'musicEnabled',
				'highscore',
			]),

			...mapGetters([
				'isFirstGame',
			]),
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.menu-view {
		text-align: center;
		z-index: 3;

		&__logo {
			width: 100%;
			max-width: 600px;
			text-align: center;
			margin: 5% auto;
		}

		&__highscore {
			@extend %small-font;
			margin: 0 0 4%;
			color: $score-color;
			font-weight: bold;
		}

		&__options {
			display: flex;
			justify-content: space-around;
		}
	}

	
</style>