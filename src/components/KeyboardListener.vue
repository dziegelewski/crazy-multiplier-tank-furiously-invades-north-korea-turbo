<template>
	<div v-if="false" />
</template>

<script>
	const DIGIT0 = 48;
	const DIGIT9 = 57;
	const NUMPAD0 = 96;
	const NUMPAD9 = 105;

	const DELETE = 46;
	const BACKSPACE = 8;

	function isDigit(value) {
		return value >= DIGIT0 && value <= DIGIT9;
	}

	function isNumpad(value) {
		return value >= NUMPAD0 && value <= NUMPAD9;
	}

	function isDigitOrNumpad(value) {
		return isDigit(value) || isNumpad(value);
	}

	function isUndoButton(value) {
		return value === DELETE || value === BACKSPACE;
	}
	
	import { mapMutations } from 'vuex';

	export default {
		name: 'KeyboardListener',
		methods: {

			...mapMutations([
				'userInput',
				'userUndo',
			]),

			registerKeydown(e) {
				const value = e.which;

				if (isDigitOrNumpad(value)) {
					const translatedValue = this.translateValue(value);
					this.userInput(translatedValue);
				}
				else if (isUndoButton(value)) {
					this.userUndo();
				}
			},

			translateValue(value) {
				if (isDigit(value)) {
					return value - DIGIT0;
				}
				else if (isNumpad(value)) {
					return value - NUMPAD0
				}
			}
		},

		created() {
			window.addEventListener('keydown', e => {

				if (e.which === BACKSPACE) {
					e.preventDefault();
				}

				this.registerKeydown(e)
			})

		},

	}
</script>

<style>

</style>