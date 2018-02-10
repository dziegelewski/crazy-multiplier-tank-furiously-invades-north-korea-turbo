<template>
	<div>

		<button
			v-if="isPrelude"
			@click="beginGame"
		>
		<!-- <h1>-- BEGIN --</h1> -->
		</button>
	
		<h2>Province... {{ province }}</h2>
		<h2>Foe... {{ foe }}</h2>

		<button v-if="foe" @click="throwChallenge">Next challenge!</button>

		<button @click="sendFoe">send Foe!</button>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

	export default {
		computed: {
			...mapState([
				'difficultyLevel',
				'foe',
				'province',
				'stage',
			]),

			isPrelude() {
				return !this.stage;
			},

			...mapGetters([
				'factors',
			]),
		},
		methods: {
			...mapMutations([
				'throwChallenge',
				'sendFoe',
			]),

			...mapActions([
				'beginGame',
			]),
		},

	};
</script>