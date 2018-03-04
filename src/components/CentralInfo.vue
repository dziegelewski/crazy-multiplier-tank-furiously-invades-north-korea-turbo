<template>
	<div class="central-info">
    <TheMessage
	    v-if="message"
	    class="game-mode__message"
	    :message="message"
    />
    <TheQuestion
	    v-else
	    class="game-mode__question"
    />
	</div>
</template>

<script>
  import TheQuestion from '@/components/TheQuestion';
  import TheMessage from '@/components/TheMessage';
  import { mapState } from 'vuex';

	export default {
		name: 'CentralInfo',
		components: {
			TheQuestion,
			TheMessage,
		},
		computed: {
		...mapState([
				'message',
			]),
		},

	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.central-info {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	
</style>