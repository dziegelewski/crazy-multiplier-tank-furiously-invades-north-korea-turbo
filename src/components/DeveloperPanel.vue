<template>
	<div>
		<h1>{{ difficultyLevel }}</h1>
		<button @click="nextChallenge">Next challenge!</button>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState([
				'difficultyLevel'
			]),

			...mapGetters([
				'factors'
			])
		},
		methods: {
			...mapMutations([
				'nextChallenge'
			])
		}

	}
</script>