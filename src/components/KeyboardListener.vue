<template>
	<div v-if="false" />
</template>

<script>
	const DIGIT_0 = 48;
	const DIGIT_9 = 57;
	
	const NUMPAD_0 = 96;
	const NUMPAD_9 = 105;

	const DELETE = 46;
	const BACKSPACE = 8;

	function isDigit(value) {
		return value >= DIGIT_0 && value <= DIGIT_9;
	}

	function isNumpad(value) {
		return value >= NUMPAD_0 && value <= NUMPAD_9;
	}

	function isDigitOrNumpad(value) {
		return isDigit(value) || isNumpad(value);
	}

	function isUndoButton(value) {
		return value === DELETE || value === BACKSPACE;
	}
	
	import { mapMutations, mapActions } from 'vuex';

	export default {
		name: 'KeyboardListener',
		methods: {

			...mapMutations([
				'userUndo',
			]),

			...mapActions([
				'userInput',
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
					return value - DIGIT_0;
				}
				else if (isNumpad(value)) {
					return value - NUMPAD_0
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