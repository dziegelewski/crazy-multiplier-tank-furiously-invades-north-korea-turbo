<template>
		<ul	class="buffs-list">
			<li
				v-for="buff in buffs"
				class="buffs-list__buff"
				>
				{{ buff }}
			</li>
		</ul>
</template>

<script>
	export default {
		name: 'BuffsList',
		props: {
			buffs: {
				type: Array,
				required: true,
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.buffs-list {
		@extend %small-font;
		color: $score-color;
	}
</style>