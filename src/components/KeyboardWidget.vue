<template>
	<div>
	   <button v-for="key in keys" @click="userInput(key)">
	     {{ key }}
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
				keys: range(0,10)
			}
		},

		methods: {
			...mapActions([
	      'userInput'
	    ]),
		}
	}
</script>

<style>

</style>