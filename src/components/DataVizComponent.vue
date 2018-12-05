<template>
  <div>
    <!-- <dissection-component/> -->
    <vue-p5 v-on="{ setup }"/>

  </div>
</template>
<script>
import DissectionComponent from './DissectionComponent.vue'

var components = {}
if (process.client) {
	const VueP5 = require('vue-p5')
	components.VueP5 = VueP5
}
components.DissectionComponent = DissectionComponent

export default {
	components: components,
	props: {
		distance: {
			required: true,
			type: Number
		},
		duration: {
			required: true,
			type: Number
		},
		lobas: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			sk: null,
			rectSize: 100,
			tDuration: 0,
			tDistance: 0,
			dataArr: [],
			areaA: 0,
			areaB: 0,
			areaC: 0,
			areas: [],
			lowestScore: 0,
			highestScore: 0
		}
	},
	watch: {
		distance() {
			console.log('distance received => ', this.distance)
			this.tDistance = this.distance
		},
		duration() {
			console.log('duration received => ', this.duration)
			this.tDuration = this.duration
		},
		lobas() {
			let values = Object.values(this.lobas)

			let output = values.map(val => {
				let v = Object.values(val)
				return v
			})

			for (let i in output) {
				this.highestScore = output[i].length * 5
				for (let j in output[i]) {
					let res = output[i][j]
					let float = parseFloat(res)
					this.dataArr.push(float.toFixed(2))

					if (i == 0) this.areaA += float
					else if (i == 1) this.areaB += float
					else if (i == 2) this.areaC += float
				}
			}

			const fixedFloat = x => x.toFixed(2)
			this.areaA = fixedFloat(this.areaA)
			this.areaB = fixedFloat(this.areaB)
			this.areaC = fixedFloat(this.areaC)
			this.areas.push(this.areaA)
			this.areas.push(this.areaB)
			this.areas.push(this.areaC)

			// console.log(
			// 	`area a => ${this.areaA}; area b => ${this.areaB}; area c => ${this.areaC}`
			// )
			console.log(this.areas)

			const locOutput = this.mapLocations(
				this.sk,
				this.tDistance,
				this.tDuration
			)
			const areaOutput = this.mapAreas(this.sk, this.areas)
			console.log('area output is: ', areaOutput)
			this.drawData(this.sk, locOutput)
		}
	},
	methods: {
		setup(sk) {
			this.sk = sk

			sk.createCanvas(330, 240)
			sk.rectMode(sk.CENTER)
			sk.noFill()
			sk.stroke(0)
			sk.strokeWeight(2)
			sk.rect(sk.width / 2, sk.height / 2, sk.width, sk.height)
		},
		draw() {
			// this.sk.noLoop()
		},
		drawData(sk, locOutput) {
			sk.fill(0, 40)
			sk.noStroke()
			sk.rectMode(sk.CENTER)

			sk.rect(locOutput.x, locOutput.y, this.rectSize, this.rectSize)

			// draw lines
			sk.stroke(0)
			sk.strokeWeight(2)

			sk.line(
				0,
				0,
				locOutput.x - this.rectSize / 2,
				locOutput.y - this.rectSize / 2
			)
			sk.line(
				sk.width,
				0,
				locOutput.x + this.rectSize / 2,
				locOutput.y + this.rectSize / 2
			)
			// sk.line(0, sk.height, locOutput.x - this.rectSize / 2, locOutput.y)
			sk.line(sk.width, sk.height, locOutput.x, locOutput.y)
		},
		mapLocations(sk, dist, t) {
			let output = {
				x: 0,
				y: 0
			}
			let distance = sk.map(
				dist,
				0,
				10,
				this.rectSize / 2,
				sk.width - this.rectSize / 2
			)
			let duration = sk.map(
				t,
				0,
				5,
				this.rectSize / 2,
				sk.height - this.rectSize / 2
			)
			output.x = distance.toFixed(2)
			output.y = duration.toFixed(2)
			console.log('pixel locations are: ', output)
			return output
		},
		mapAreas(sk, values) {
			let output = values.map(val => {
				let mappedVal = sk.map(val, 0, this.highestScore, 0, 1)
				return mappedVal.toFixed(2)
			})
			return output
		}
	}
}
</script>
<style scoped>
</style>
