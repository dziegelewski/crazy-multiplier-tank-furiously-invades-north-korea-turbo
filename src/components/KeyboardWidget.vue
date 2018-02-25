<template>
	<div class="keyboard-widget">
	   <button
	   v-for="key in keys"
	   class="keyboard-widget__key"
	   @click="userInput(key)">
	     {{ key }}
	   </button>
	   <button
			class="keyboard-widget__key keyboard-widget__key--backspace"
			@click="userUndo"
	   >
	   	<-
	   </button>
	</div>

</template>

<script>
	import { mapActions } from 'vuex';
	import range from 'lodash/range';

	export default {
		name: 'KeyboardWidget',
		data() {
			return {
				keys: [...range(1, 10), 0],
			};
		},

		methods: {
			...mapActions([
        'userInput',
        'userUndo',
	    ]),
		},
	};
</script>

<style lang="scss">
	@import 'src/assets/styles/shared';
	.keyboard-widget {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		@media (min-width: 700px) {
			display: none;
		}
		// display: none;

		&__key {
			display: flex;
			flex: 1;
			height: 50px;
			background: white;
			background-image: url('../assets/images/key.png');
			background-size: 100% 100%;
			color: black;
			border: 4px solid black;
			border: none;
			border-radius: 5px;
			justify-content: center;
			align-items: center;
			font-size: $medium-font;
			min-width: 19%;
			max-width: 19%;
			margin: 1vh 0;
			// transition: all 100ms;

			&:active {
				color: white;
				background: black;
			}
		}
	}

</style>