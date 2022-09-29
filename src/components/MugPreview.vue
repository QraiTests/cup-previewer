<template>
	<div class="mug-preview">
		<canvas ref="canvas"></canvas>
	</div>
</template>
<script>
export default {
	name: 'MugPreview',
	emits: ['render'],
	props: {
		image: String
	},

	mounted() {
		// Canvas to draw on & it's context
		let canvas = this.$refs.canvas
		canvas.width = 500
		canvas.height = 500

		this.setUpper('')
	},

	methods: {
		getURL() {
			return this.$refs.canvas.toDataURL('image/png')
		},

		setUpper(imgUrl) {
			let canvas = this.$refs.canvas
			const ctx = canvas.getContext('2d')
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			// Load mug image
			let mugImage = new Image(500,450)
			mugImage.src = require('@/assets/mug.png')
			mugImage.addEventListener('load', () => {
				this.drawBase(mugImage)
				// Load upper image
				let upperImage = new Image()
				upperImage.src = imgUrl
				upperImage.addEventListener('load', () => {
					this.drawUpper(upperImage)

					this.$emit('render')
				})
			})
		},

		drawBase(img) {
			// Context for drawing
			const canvas = this.$refs.canvas
			const ctx = canvas.getContext('2d')

			// Ratio calculations to fit image into canvas
			const meta = {
				ratio: img.width / img.height,
				width: 0,
				height: 0,
				offsetX: 0,
				offsetY: 0,
			}
			if (meta.ratio >= 1) {
				meta.width = canvas.width > img.width ? img.width : canvas.width
				meta.height = meta.width / meta.ratio
			}
			else {
				meta.height = canvas.height > img.height ? img.height : canvas.height
				meta.width = meta.height * meta.ratio
			}
			meta.offsetX = canvas.width > meta.width ? (canvas.width - meta.width) / 2 : 0
			meta.offsetY = canvas.height > meta.height ? (canvas.height - meta.height) / 2 : 0

			// Draw it
			ctx.drawImage(img, meta.offsetX, meta.offsetY, meta.width, meta.height)
		},

		drawUpper(img) {
			// Context for drawing
			const canvas = this.$refs.canvas
			const ctx = canvas.getContext('2d')
			ctx.imageSmoothingEnabled = true

			//TODO: check image ratio is 7/8

			// Image width & Height
			let w = img.width
			let h = img.height

			// Options for drawing
			let { x_offset, y_offset, a, b, c, d } = {
				x_offset: 110,
				y_offset: 125,

				// Image width
				a: 110.0,
				// Roundness
				b: 15,
				// Image height
				c: 245,
				// Scale basis
				d: 3.5
			}
			/*
			80.0
			15
			310
			3.5
			*/

			let scaleFactor = w / (d * a)

			// draw vertical slices
			for (let X = 0; X < w; X += 1) {
				let y = b / a * Math.sqrt(a * a - (X - a) * (X - a))
				ctx.drawImage(img, X * scaleFactor, 0, w / 2, h, X + x_offset, y + y_offset, 1, c)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mug-preview {
	width: 500px;
	height: 500px;

	canvas {
		width: 100%;
		height: 100%;
	}
}
</style>