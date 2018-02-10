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
				keys: range(0, 10),
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
	.keyboard-widget {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 30vw;
		min-height: 200px;
		display: flex;
		flex-wrap: wrap;
		@media (min-width: 600px) {
			display: none;
		}

		&__key {
			display: flex;
			flex: 1;
			max-width: 60px;
			max-height: 30px;
		}
	}

	.keyboard-widget__key {
	}

	.keyboard-widget__key--backspace {
		
	}

</style>