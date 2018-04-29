<template>
	<canvas  width="800" class="grass-leaves" ref="canvas" />
</template>

<script>
	import { mapState } from 'vuex';
	import times from 'lodash/times';
	import sample from 'lodash/sample';

	const fieldSize = 30;
	const numberOfFields = 20;

	export default {
		name: 'GrassLeaves',
		data() {
			return {
				fields: [],
				grassImages: [],
				grassX: 0,
				canvas: null,
				ctx: null,
			};
		},

		computed: {
			...mapState([
				'speed',
			]),
		},

		mounted() {
			this.loadGrassImages()
				.then(this.plantGrass);
		},

		methods: {
			loadGrassImages() {
				const numberOfAvailableImages = 5;
				const imagesToLoad = [];

				this.grassImages = times(numberOfAvailableImages, (index) => {
					const image = new Image(fieldSize, fieldSize);
					image.src = require(`../assets/images/grass/ground${index}.png`);

					imagesToLoad.push(new Promise((resolve) => {
						image.onload = resolve;
					}));

					return image;
				});

				return Promise.all(imagesToLoad);
			},

			putGrass() {
				return sample(this.grassImages);
			},

			plantGrass() {
				this.fields.push(...times(numberOfFields, this.putGrass));
				this.canvas = this.$refs.canvas;
				this.ctx = this.canvas.getContext('2d');
				this.moveGrass();
			},

			moveGrass() {
				const { canvas, ctx, fields, speed } = this;
				let nextFieldX = this.grassX;

				ctx.clearRect(0, 0, canvas.width, canvas.height);

				for (let i = 0; i < numberOfFields; i++) {
					ctx.drawImage(fields[i], nextFieldX, 0, fieldSize, fieldSize);
					nextFieldX += fieldSize;
				}

				this.grassX -= speed;

				while (this.grassX <= -fieldSize) {
					this.fields.push(this.putGrass());
					this.fields.shift();
					this.grassX += fieldSize;
				}

				requestAnimationFrame(this.moveGrass);
			},
		},
	};
</script>

<style lang='scss' scoped>
	@import 'src/assets/styles/shared';
	.grass-leaves {
		width: 800px;
		animation: none;
		transform: translateY(90px);
    position: absolute;
    bottom: 0;
	}
</style>