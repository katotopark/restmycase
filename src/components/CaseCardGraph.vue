<template>
  <el-row type="flex" justify="center">
    <vue-p5 v-on="{ setup, draw }"/>
  </el-row>
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
		dimensions: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			sk: null,
			canvasWidth: 360,
			canvasHeight: 120,
			intervalX: 0,
			intervalY: 0,
			rectSizeX: 0,
			rectSizeY: 0,
			dataArr: [],
			gotData: false,
			defaultDims: {
				x: 360,
				y: 120
			}
		}
	},
	watch: {
		lobas() {
			let values = Object.values(this.lobas)

			let output = values.map(val => {
				let v = Object.values(val)
				return v
			})

			for (let i in output) {
				for (let j in output[i]) {
					let res = output[i][j]
					let float = parseFloat(res)
					this.dataArr.push(float)
				}
			}
		},
		dataArr() {
			// console.log('data array received. drawing graph...')
			this.drawGraph()
			// console.log('graph drawn')
		}
	},
	created() {},
	methods: {
		setup(sk) {
			this.sk = sk
			this.rectSizeX = this.dimensions.x * 0.9
			this.rectSizeY = this.dimensions.y * 0.9
			this.intervalX = (this.dimensions.x * 0.9) / 15
			this.intervalY = (this.dimensions.y * 0.9) / 5

			// draw borders
			sk.createCanvas(this.dimensions.x, this.dimensions.y)
			// sk.background(55)
			sk.rectMode(sk.CENTER)
			sk.noFill()
			sk.stroke(0)
			sk.strokeCap(sk.ROUND)
			sk.strokeWeight(2)
			sk.push()
			sk.translate(sk.width / 2, sk.height / 2)
			sk.rect(0, 0, this.rectSizeX, this.rectSizeY)
			sk.pop()

			// draw ticks
			sk.stroke(0)
			sk.strokeWeight(1.8)
			sk.push()
			sk.translate(
				sk.width / 2 - this.rectSizeX / 2,
				sk.height / 2 + this.rectSizeY / 2
			)
			// sk.rect(0, 0, 10, 10)
			for (let i = 1; i < 15; i++) {
				sk.line(i * this.intervalX, -5, i * this.intervalX, 0)
			}
			for (let i = 1; i < 5; i++) {
				sk.line(0, -i * this.intervalY, 5, -i * this.intervalY)
			}
			sk.pop()

			// draw dots
			sk.stroke(0)
			sk.strokeWeight(2)
			sk.push()
			sk.translate(
				sk.width / 2 - this.rectSizeX / 2,
				sk.height / 2 + this.rectSizeY / 2
			)
			for (let i = 1; i < 15; i++) {
				for (let j = 1; j < 10; j++) {
					sk.point(i * this.intervalX, -(j * this.intervalY))
				}
			}
			sk.strokeWeight(1)
			for (let i = 1; i < 30; i++) {
				for (let j = 1; j < 20; j++) {
					sk.point((i * this.intervalX) / 2, -((j * this.intervalY) / 2))
				}
			}
			sk.pop()
		},
		draw() {
			this.sk.noLoop()
			// this.drawGraph()
		},
		drawGraph() {
			this.sk.strokeWeight(2)
			this.sk.fill(0, 85)
			this.sk.push()
			this.sk.translate(
				this.sk.width / 2 - this.rectSizeX / 2,
				this.sk.height / 2 + this.rectSizeY / 2
			)
			this.sk.fill(0, 85)
			this.sk.beginShape()
			this.sk.vertex(0, 0)
			this.dataArr.forEach((val, i) => {
				this.sk.vertex((i + 1) * this.intervalX, -val * this.intervalY)
			})
			this.sk.vertex(this.intervalX * this.dataArr.length, 0)
			this.sk.endShape(this.sk.CLOSE)
			this.sk.fill(0)
			this.sk.noStroke()
			// this.sk.strokeWeight(0.5)
			this.dataArr.forEach((val, i) => {
				this.sk.ellipse(
					(i + 1) * this.intervalX,
					-(val * this.intervalY),
					this.rectSizeX / 60,
					this.rectSizeX / 60
				)
			})
			this.sk.pop()
		}
	}
}
</script>
<style scoped>
</style>
