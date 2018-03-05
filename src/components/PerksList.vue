<template>
		<ul	class="perks-list">
			<li
				v-for="perk in perks"
				class="perks-list__perk"
				>
				{{ perk.longName }}
			</li>
		</ul>
</template>

<script>
	export default {
		name: 'PerksList',
		props: {
			perks: {
				type: Array,
				required: true,
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.perks-list {
		@extend %small-font;
		color: $score-color;
		font-weight: bold;
		margin-left: 10px;
		margin-top: 10px;
	}
</style>