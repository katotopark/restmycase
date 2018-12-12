<template>
  <div style="display:none;">
    <vue-p5 v-on="{ setup, draw }"/>
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
			skCanvas: null,
			rectSize: 100,
			tDuration: 0,
			tDistance: 0,
			dataArr: [],
			areas: [],
			values: [],
			polygonList: [],
			s: 100,
			totalArea: 0,
			lowestScore: 0,
			highestScore: 0
		}
	},
	watch: {
		distance() {
			// console.log('distance received => ', this.distance)
			this.tDistance = this.distance
		},
		duration() {
			// console.log('duration received => ', this.duration)
			this.tDuration = this.duration
		}
	},
	methods: {
		lobasMethod(duration, distance, lobas) {
			let values = Object.values(lobas)

			let output = values.map(val => {
				let v = Object.values(val)
				return v
			})

			let areaA = 0
			let areaB = 0
			let areaC = 0

			for (let i in output) {
				this.highestScore = output[i].length * 5
				for (let j in output[i]) {
					let res = output[i][j]
					let float = parseFloat(res)
					this.dataArr.push(float.toFixed(2))

					if (i == 0) areaA += float
					else if (i == 1) areaB += float
					else if (i == 2) areaC += float
				}
			}

			const fixedFloat = x => {
				console.log('fixedFloat', x)
				return x.toFixed(2)
			}

			areaA = fixedFloat(areaA)
			areaB = fixedFloat(areaB)
			areaC = fixedFloat(areaC)

			let areas = [areaA, areaB, areaC]
			let totalArea = 0

			areas.forEach(a => {
				totalArea += parseFloat(a)
			})
			console.log('the total area is: ', totalArea)

			const locOutput = this.mapLocations(this.sk, distance, duration)
			console.log(locOutput)
			const mapAreasValues = this.mapAreas(this.sk, areas, totalArea)
			this.drawStuff(locOutput, mapAreasValues)

			this.drawData(this.sk, locOutput)

			return this.exportAsImage()
		},
		setup(sk) {
			this.sk = sk
			this.skCanvas = this.sk.createCanvas(330, 240)
			this.sk.background(247, 244, 204)
			this.sk.rectMode(sk.CENTER)
			this.sk.noFill()
			this.sk.stroke(0)
			this.sk.strokeWeight(2)
			this.sk.rect(sk.width / 2, sk.height / 2, sk.width, sk.height)
		},
		draw() {
			this.sk.noLoop()
			// console.log(this.skCanvas.canvas)
			window.ourcanvase = this.skCanvas
		},
		exportAsImage() {
			return this.skCanvas.canvas.toDataURL('image/jpeg')
		},
		drawStuff(locOutput, values) {
			this.init(values)

			// this.sk.translate(
			// 	(this.rectSize / 3) * 2,
			// 	this.rectSize + this.rectSize / 4
			// )
			// console.log('locOutput is', locOutput)
			// this.sk.translate(0, 0)

			this.sk.stroke(247, 244, 204)

			// this.sk.stroke(255, 0, 0)
			this.sk.strokeWeight(5)
			this.sk.fill(0)
			// console.log(this.polygonList)
			// console.log('values are: ', this.values)

			this.sk.push()
			this.sk.translate(locOutput.x, locOutput.y)
			for (let poly of this.polygonList) {
				this.sk.beginShape()
				// this.sk.fill(100, this.sk.random(155), 40, 40)
				for (let po of poly) {
					this.sk.vertex(po.x * this.rectSize, po.y * this.rectSize)
				}
				this.sk.endShape(this.sk.CLOSE)
			}
			this.sk.pop()

			// console.log('x value is: ', locOutput.x, 'y value is:', locOutput.y)
		},
		init(values) {
			this.polygonList = []
			let list = []

			let vec1 = this.sk.createVector(-0.5, 0.5)
			let vec2 = this.sk.createVector(0.5, 0.5)
			let vec3 = this.sk.createVector(0.5, -0.5)
			let vec4 = this.sk.createVector(-0.5, -0.5)

			list.push(vec1)
			list.push(vec2)
			list.push(vec3)
			list.push(vec4)

			// const r = this.sk.floor(this.sk.random() * 4)
			//	let i1 = r % 4
			//	let i2 = (r + 1) % 4

			this.dissect(list, list[0], list[1], 0, values)
		},
		dissect(pointList, a, b, d, values) {
			let poly = []
			// console.log(pointList.slice(0))
			if (d >= values.length - 1) {
				this.polygonList.push(pointList)
				return
			}
			let p1 = this.randomPointOnLine(a.x, a.y, b.x, b.y)
			poly.push(p1)
			pointList.push(p1)
			let r = this.sk.floor(this.sk.random(2)) == 0 ? -1 : 1
			this.sort(pointList, p1, r)

			let value = values[d]

			let pointListNext = pointList.map(x => x)

			for (let i = 0; i < pointList.length; i++) {
				let ax = pointList[i].x
				let ay = pointList[i].y
				let bx = pointList[(i + 1) % pointList.length].x
				let by = pointList[(i + 1) % pointList.length].y
				let area = this.area(p1.x, p1.y, ax, ay, bx, by)

				poly.push(pointListNext[0])
				pointListNext.shift()

				if (value < area) {
					let weight = value / area
					let p2 = this.pointOnLine(ax, ay, bx, by, weight)
					poly.push(p2)
					pointListNext.push(p2)

					this.polygonList.push(poly)
					this.dissect(pointListNext, p2, p1, d + 1, values)
					break
				} else {
					value -= area
				}
			}
		},
		area(ax, ay, bx, by, cx, cy) {
			let val = this.sk.abs(
				(ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2
			)
			return val
		},
		pointOnLine(ax, ay, bx, by, weight) {
			let vec = this.sk.createVector(
				ax + (bx - ax) * weight,
				ay + (by - ay) * weight
			)
			return vec
		},
		randomPointOnLine(ax, ay, bx, by) {
			let r = this.sk.random(1)
			let vec = this.sk.createVector(ax + (bx - ax) * r, ay + (by - ay) * r)
			return vec
		},
		arrayRotate(arr, count) {
			count -= arr.length * Math.floor(count / arr.length)
			arr.push.apply(arr, arr.splice(0, count))
			return arr
		},
		sort(pointList, first, direction) {
			let m = this.calculateOrigin(pointList)

			pointList.sort((o1, o2) => {
				let angle1 = Math.atan2(o1.y - m.y, o1.x - m.x)
				let angle2 = Math.atan2(o2.y - m.y, o2.x - m.x)
				//ccw
				if (angle1 < angle2) return 1 * direction
				else if (angle2 < angle1) return -1 * direction
				return 0
			})

			let index = pointList.findIndex(x => x.x === first.x && x.y === first.y)

			this.arrayRotate(pointList, index + 1)
		},
		calculateOrigin(pointList) {
			let origin = this.sk.createVector()
			for (let p of pointList) {
				origin.add(p)
			}
			let val = origin.div(pointList.length)
			return val
		},
		drawData(sk, locOutput) {
			// sk.fill(0, 40)
			sk.noFill()
			sk.stroke(0)
			sk.strokeWeight(2)
			sk.rectMode(sk.CENTER)
			sk.rect(locOutput.x, locOutput.y, this.rectSize, this.rectSize)

			// draw lines
			sk.stroke(0)
			sk.strokeWeight(2)
			sk.strokeCap(sk.PROJECT)

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
				locOutput.y - this.rectSize / 2
			)
			sk.line(
				0,
				sk.height,
				locOutput.x - this.rectSize / 2,
				locOutput.y + this.rectSize / 2
			)
			sk.line(
				sk.width,
				sk.height,
				locOutput.x + this.rectSize / 2,
				locOutput.y + this.rectSize / 2
			)
		},
		mapLocations(sk, dist, t) {
			const padding = 10

			let output = {
				x: 0,
				y: 0
			}
			let distance = sk.map(
				dist,
				0,
				10,
				this.rectSize / 2 + padding,
				sk.width - this.rectSize / 2 - padding
			)
			let duration = sk.map(
				t,
				0,
				5,
				sk.height - this.rectSize / 2 - padding,
				this.rectSize / 2 + padding
			)

			console.log('distane', distance, 'duration', duration)
			output.x = parseFloat(distance.toFixed(2))
			output.y = parseFloat(duration.toFixed(2))
			return output
		},
		mapAreas(sk, values, totalArea) {
			const max = totalArea

			return values.map(val => {
				let result = sk.map(val, 0, max, 0, 1)
				result = parseFloat(result)
				return result
			})
		}
	}
}
</script>
<style scoped>
div {
	/* display: none; */
}
</style>
