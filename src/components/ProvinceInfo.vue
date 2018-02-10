<template>
	<div v-if="province">
		<h1>{{ province.name }}</h1>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'ProvinceInfo',
		computed: {
			...mapState([
				'province',
			]),
		},
	};
</script>

<style >

</style>