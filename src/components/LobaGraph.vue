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
	props: {
		lobas: {
			required: true,
			type: Object
		},
		groupVal: {
			required: true,
			type: String
		}
	},
	data() {
		return {
			sk: null,
			dataArr: [],
			margin: 50,
			rectSize: 250,
			interval: 50,
			sum: 0
		}
	},
	watch: {
		lobas() {
			let filtered = this.lobas[this.groupVal]
			let values = Object.values(filtered)

			this.dataArr = values.map(val => {
				let float = parseFloat(val)
				this.dataArr.push()
				this.sum += float
				return float
			})
			console.log(
				`For group ${this.groupVal} => data array is: [${
					this.dataArr
				}], sum is: ${this.sum}`
			)
			return this.dataArr
		},
		dataArr() {
			const s = this.sk

			s.stroke(0, 0, 0)
			s.strokeWeight(2)
			s.push()
			s.translate(this.margin / 2, this.margin / 2 + this.rectSize)

			s.beginShape()
			s.vertex(0, 0)
			this.dataArr.forEach((val, i) => {
				s.vertex((i + 1) * this.interval, -(val * this.interval))
			})
			s.endShape()

			// points
			s.fill(0)
			this.dataArr.forEach((val, i) => {
				s.ellipse((i + 1) * this.interval, -(val * this.interval), 6, 6)
			})
			s.pop()
		}
	},
	methods: {
		setup(sk) {
			this.sk = sk
			const s = this.sk

			// draw borders
			s.createCanvas(300, 300)
			s.background(0, 0)
			s.rectMode(s.CENTER)
			s.noFill()
			s.stroke(0)
			s.strokeCap(s.SQUARE)
			s.strokeWeight(2)
			s.rect(s.width / 2, s.height / 2, this.rectSize, this.rectSize)

			// draw ticks
			s.push()
			s.translate(this.margin / 2, this.margin + this.rectSize)
			s.stroke(0)
			s.strokeWeight(2)
			for (let i = 1; i < 5; i++) {
				s.line(
					i * this.interval,
					-this.margin / 2 - 5,
					i * this.interval,
					-this.margin / 2
				)
				s.line(
					0,
					-this.margin / 2 - i * this.interval,
					5,
					-this.margin / 2 - i * this.interval
				)
			}
			s.pop()

			// draw dots
			s.stroke(0)
			s.strokeWeight(2)
			s.push()
			s.translate(this.margin / 2, this.margin / 2)
			for (let i = 1; i < 10; i++) {
				for (let j = 1; j < 10; j++) {
					s.point((i * this.interval) / 2, (j * this.interval) / 2)
				}
			}
			s.strokeWeight(1)
			for (let i = 1; i < 20; i++) {
				for (let j = 0; j < 20; j++) {
					s.point((i * this.interval) / 4, (j * this.interval) / 4)
				}
			}
			s.pop()
		},
		draw() {
			this.sk.noLoop()
		}
	}
}
</script>
<style scoped>
</style>
