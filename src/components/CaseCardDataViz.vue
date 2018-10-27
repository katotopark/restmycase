<template>
  <div style="display:none; background-color:white">
    <vue-p5 v-on="{ setup }"/>
  </div>
</template>
<script>
var components = {}
if (process.client) {
	const VueP5 = require('vue-p5')
	components.VueP5 = VueP5
}

export default {
	components: components,
	props: {
		x: {
			required: true,
			type: Number
		},
		y: {
			required: true,
			type: Number
		}
	},
	data() {
		return {
			sk: null
		}
	},
	mounted() {
		console.log('data viz mounted. x:', this.x, 'y:', this.y)
	},
	methods: {
		setup(sk) {
			this.sk = sk
		},
		draw(caseData) {
			// TODO remove this
			if (window.sadflkhadsfladf) {
				caseData()
			}

			const skCanvas = this.sk.createCanvas(this.x, this.y)

			this.sk.background(255, 0, 0)
			this.sk.fill(0, 255, 0)
			this.sk.rectMode(this.sk.CENTER)
			this.sk.rect(this.sk.width / 2, this.sk.height / 2, 10, 10)
			this.sk.rect(5, 5, 10, 10)
			this.sk.rect(this.sk.width - 6, this.sk.height - 6, 10, 10)
			this.sk.line(
				this.sk.width,
				this.sk.height,
				this.sk.width / 2,
				this.sk.height / 2
			)
			this.sk.noLoop()

			return skCanvas.canvas.toDataURL('image/jpeg')
		}
	}
}
</script>
<style scoped>
img {
	max-width: 100%;
	max-height: 100%;
}
</style>
