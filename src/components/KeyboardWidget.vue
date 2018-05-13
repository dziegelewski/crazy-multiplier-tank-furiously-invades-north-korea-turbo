<template>
	<div class="keyboard-widget">
	   <button
	   v-for="key in keys"
	   :class="keyClass(key)"
	   @touchstart="keyPressed(key)">
	     {{ key }}
	   </button>
	</div>

</template>

<script>
	import { mapActions } from 'vuex';
	import range from 'lodash/range';

	const BACKSPACE_KEY = '<';

	export default {
		name: 'KeyboardWidget',
		data() {
			return {
				keys: [...range(1, 10), 0, BACKSPACE_KEY],
			};
		},

		methods: {
			...mapActions([
        'userInput',
        'userUndo',
	    ]),

	    keyClass(key) {
	    	const isBackspace = key === BACKSPACE_KEY;
	    	return `keyboard-widget__key keyboard-widget__key--${isBackspace ? 'backspace' : key}`;
	    },

	    keyPressed(key) {
	    	if (key === BACKSPACE_KEY) {
	    		this.userUndo();
	    	}	else {
	    		this.userInput(key);
	    	}
	    },
		},
	};
</script>

<style lang="scss">
	@import 'src/assets/styles/shared';
	.keyboard-widget {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		z-index: 2;
   	height: 36vh;
   	@include small {
	   	height: 27vh;
	  }

		@include screen {
			display: none;
		}

		&__key {
			outline: none;
			display: flex;
			flex: 1;
			height: 50px;
			background: transparent;
			background-size: 100% 100%;
			color: black;
			border: 4px solid black;
			border: none;
			border-radius: 5px;
			justify-content: center;
			align-items: center;
			font-size: $medium-font-immutable;
			flex-basis: 25%;
			margin: 1vh 0;

			@for $i from 1 through 11 {
				&:nth-child(#{$i}) {
					background-image: url('../assets/images/keys/key#{$i}.png');
				}
			}

			&:active {
				color: white;
				background: black;
			}
		}
	}

</style>