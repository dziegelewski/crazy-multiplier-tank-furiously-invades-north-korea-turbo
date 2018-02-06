<template>
	<h1 style="color: green;">{{ score }}</h1>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState([
				'score'
			])
		}
	}
</script>
