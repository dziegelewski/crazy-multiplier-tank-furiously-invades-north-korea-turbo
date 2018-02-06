<template>
	<div>
		<h1>
			<span
				v-for="letter in inputLetters"
				class="letter"
			>
			{{ letter }}
			</span>
		</h1>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'MainInput',

		computed: {
			...mapGetters([
				'inputLetters',
			]),
		}

	}
</script>

<style>
.letter {
	width: 30px;
	margin: 0 1px;
	display: inline-block;
}

</style>