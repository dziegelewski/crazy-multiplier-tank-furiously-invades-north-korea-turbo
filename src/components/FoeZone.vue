<template>
	<div>
		<h1>{{ foe.type }}</h1>
		<HeartsContainer :hearts="hearts" />
		<img :src="foeSrc" class="vehicle" />
		
	</div>
</template>

<script>
	import HeartsContainer from '@/components/HeartsContainer';
	import { mapState } from 'vuex';

	export default {
		name: 'FoeZone',
		components: {
			HeartsContainer,
		},
		computed: {
			...mapState([
				'foe',
			]),

			hearts() {
				return this.foe.hearts;
			},

			type() {
				return this.foe.type;
			},

			foeSrc() {
				return require(`../assets/${this.type}.png`);
			},
		},
	};
</script>

<style>
	.foe {
		width: 100px;
		height: 10
	}

</style>