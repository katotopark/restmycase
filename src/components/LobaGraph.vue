<template>
  <div>
    <vue-p5 v-on="{ setup, draw }"/>
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
	data() {
		return {
			sk: null
		}
	},
	methods: {
		setup(sk) {
			this.sk = sk
			const s = this.sk

			const margin = 50
			const rectSize = 250

			s.createCanvas(300, 300)
			s.background(0, 0)
			s.rectMode(s.CENTER)
			s.noFill()
			s.stroke(0)
			s.strokeCap(s.SQUARE)
			s.strokeWeight(2.5)
			s.rect(s.width / 2, s.height / 2, rectSize, rectSize)

			s.push()
			s.translate(margin / 2, margin + rectSize)
			s.stroke(0)
			s.strokeWeight(1.5)
			for (let i = 1; i < 5; i++) {
				console.log(i)
				s.line(i * 50, -margin / 2 - 5, i * 50, -margin / 2 + 5)
				s.line(-5, -margin / 2 - i * 50, 5, -margin / 2 - i * 50)
			}
			s.pop()
			s.push()
			s.translate(margin / 2, margin / 2)
			for (let i = 1; i < 10; i++) {
				for (let j = 1; j < 10; j++) {
					s.point(i * 25, j * 25)
				}
			}
		},
		draw() {}
	}
}
</script>
<style scoped>
</style>
