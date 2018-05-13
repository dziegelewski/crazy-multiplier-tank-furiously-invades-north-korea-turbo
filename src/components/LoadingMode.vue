<template>
	<div class="loading-mode">

		<div
			v-if="loaderVisible"
			class="loading-mode__container"
		>
			<span	class="loading-mode__message"> 
				Please wait...
			</span>
			<div class="loading-mode__loader"	/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LoadingMode',
		data() {
			return {
				loaderVisible: false,
			};
		},

		mounted() {
			setTimeout(() => {
				this.loaderVisible = true;
			}, 300);
		},
	};
</script>

<style lang='scss' scoped>
  @import 'src/assets/styles/shared';
	.loading-mode {
		width: 100%;
		
		&__container {
			$size: 200px;
			margin: #{$size / 5} auto;
			width: $size;
			height: $size;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: appear .3s 1;
		}

		&__message {
			font-size: 25px;
		}

		&__loader {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			border: 5px dashed black;
			border-radius: 50%;
			border-left-style: solid;
			border-right-style: solid;
			animation: rotate 2s infinite linear;
		}

		@keyframes rotate {
			from { transform: rotate(0deg); }
			to 	 { transform: rotate(360deg); }
		}

		@keyframes appear {
			from { opacity: 0; }
			to 	 { opacity: 1; }
		}
	}
</style>