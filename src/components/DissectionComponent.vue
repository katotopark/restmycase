<template>
  <div ref="kaka">
    <el-col>
      <vue-p5 v-on="{setup, draw}"/>
    </el-col>
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
	data() {
		return {
			test: 0,
			testWidth: 0,
			sk: null,
			s: 100,
			values: [0.4, 0.2, 0.4],
			polygonList: []
		}
	},
	watch: {},
	mounted() {
		this.testWidth = this.$refs.kaka.offsetWidth
	},
	updated() {
		this.testWidth = this.$refs.kaka.offsetWidth
	},
	methods: {
		setup(sk) {
			this.sk = sk
		},
		draw() {
			this.sk.createCanvas(500, 500)
			this.init()

			// this.sk.background(255)
			this.sk.translate(50, 50)

			this.sk.stroke(247, 244, 204)
			this.sk.strokeWeight(8)
			this.sk.fill(0)
			console.log(this.polygonList)
			console.log(this.values)

			for (let poly of this.polygonList) {
				this.sk.beginShape()
				// this.sk.fill(100, this.sk.random(155), 40, 40)
				for (let po of poly) {
					this.sk.vertex(po.x * this.s, po.y * this.s)
				}
				this.sk.endShape(this.sk.CLOSE)
			}
			this.sk.noLoop()
		},
		init() {
			this.polygonList = []
			let list = []

			let vec1 = this.sk.createVector(0, 1)
			let vec2 = this.sk.createVector(1, 1)
			let vec3 = this.sk.createVector(1, 0)
			let vec4 = this.sk.createVector(0, 0)

			list.push(vec1)
			list.push(vec2)
			list.push(vec3)
			list.push(vec4)

			// const r = this.sk.floor(this.sk.random() * 4)
			//	let i1 = r % 4
			//	let i2 = (r + 1) % 4

			this.dissect(list, list[0], list[1], 0)
		},
		dissect(pointList, a, b, d) {
			let poly = []
			console.log(pointList.slice(0))
			if (d >= this.values.length - 1) {
				this.polygonList.push(pointList)
				return
			}
			let p1 = this.randomPointOnLine(a.x, a.y, b.x, b.y)
			poly.push(p1)
			pointList.push(p1)
			this.sortCCW(pointList, p1)

			let value = this.values[d]

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
					this.dissect(pointListNext, p2, p1, d + 1)
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
		sortCCW(pointList, first) {
			let m = this.calculateOrigin(pointList)

			pointList.sort((o1, o2) => {
				let angle1 = Math.atan2(o1.y - m.y, o1.x - m.x)
				let angle2 = Math.atan2(o2.y - m.y, o2.x - m.x)
				//ccw
				if (angle1 < angle2) return 1
				else if (angle2 < angle1) return -1
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
		}
	}
}
</script>
<style scoped>
</style>
