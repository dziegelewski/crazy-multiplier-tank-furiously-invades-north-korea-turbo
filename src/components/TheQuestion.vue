<template>
	<div v-if="challenge">
		<h1>{{ question }}</h1>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapState([
				'challenge'
			]),

			...mapGetters([
				'factors'
			]),

			question() {
				return this.factors.join(' * ');
			}
		}
	}
</script>
