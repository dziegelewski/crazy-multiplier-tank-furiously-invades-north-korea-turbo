<template>
	<div v-if="challenge">
		<h1>{{ question }}</h1>
		<MainInput />
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import MainInput from '@/components/MainInput';

	export default {
		components: {
			MainInput,
		},
		computed: {
			...mapState([
				'challenge',
			]),

			...mapGetters([
				'factors',
			]),

			question() {
				return this.factors.join(' * ');
			},
		},
	};
</script>
