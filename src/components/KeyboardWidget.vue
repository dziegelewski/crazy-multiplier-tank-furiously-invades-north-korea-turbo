<template>
	<div>
	   <button v-for="key in keys" @click="userInput(key)">
	     {{ key }}
	   </button>
	</div>

</template>

<script>

import { mapMutations } from 'vuex';

	import range from 'lodash/range';
	export default {
		name: 'KeyboardWidget',
		data() {
			return {
				keys: range(0,10)
			}
		},

		methods: {
			...mapMutations([
	      'userInput'
	    ]),
		}
	}
</script>

<style>

</style>