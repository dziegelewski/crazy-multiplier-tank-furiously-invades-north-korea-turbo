<template>
	<div>
		<h1>
			<span v-for="blank in blanks">
				<template v-if="userAnswer[blank -1] !== undefined">
					{{ userAnswer[blank -1] }}
				</template>
				<template v-else>
					_
				</template>
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
				'blanks',
				'userAnswer',
			]),
		}

	}
</script>

<style>

</style>