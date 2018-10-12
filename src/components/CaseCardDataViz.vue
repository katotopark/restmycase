<template>
  <div>
    <!-- <img src="https://www.solidbackgrounds.com/images/2880x1800/2880x1800-tiffany-blue-solid-color-background.jpg"> -->
    <vue-p5 v-on="{ draw }"/>
  </div>
</template>
<script>
var components = {}
if (process.browser) {
	const VueP5 = require('vue-p5')
	components.VueP5 = VueP5
}

export default {
	components: components,
	props: {
		// showImage: {
		// 	required: false,
		// 	type: Boolean
		// },
		dimensions: {
			required: true,
			type: Object
		}
	},
	data() {
		return {}
	},
	mounted() {
		console.log('data viz mounted')
		if (this.dimensions) {
			console.log('dimensions: ', this.dimensions)
		}
	},
	methods: {
		draw(sk) {
			sk.createCanvas(this.dimensions.x, this.dimensions.y)
			sk.background(255, 0, 0, 40)
			sk.fill(0, 255, 0)
			sk.rectMode(sk.CENTER)
			sk.rect(sk.width / 2, sk.height / 2, 10, 10)
			sk.rect(5, 5, 10, 10)
			sk.rect(sk.width - 6, sk.height - 6, 10, 10)
			sk.line(sk.width, sk.height, sk.width / 2, sk.height / 2)
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
