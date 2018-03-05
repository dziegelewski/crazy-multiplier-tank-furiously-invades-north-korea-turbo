<template>
	<div class="menu-view">
	<img class="menu-view__logo" src="../assets/images/logo.png" alt="" />

	<div class="menu-view__options">

		<MenuOption 
			label="Sounds"
			math="1 * 1"
			:condition="audioEnabled"
		/>

		<MenuOption 
			label="Type 2 * 2 to Begin"
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
		:blanks="1"
		class="menu-view__input"
		style="margin-top: 20px"
	/>
	</div>
</template>

<script>
	import TheInput from '@/components/TheInput';
	import MenuOption from '@/components/MenuOption';
	import { mapState } from 'vuex';


	export default {
		name: 'MenuView',
		components: {
			TheInput,
			MenuOption,
		},
		computed: {
			...mapState([
				'menuInput',
				'audioEnabled',
				'musicEnabled',
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

		&__options {
			display: flex;
			justify-content: space-around;
		}
	}

	
</style>