<template>
  <div ref="kaka">
    <el-col>
      <vue-p5 v-on="{setup,draw}"/>
    <!-- <a :href="fakerImg"/> -->
    <!-- <img :src="fakerImg"> -->
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
			fakerImg: null,
			test: 0,
			testWidth: 0
		}
	},
	watch: {
		testWidth() {
			console.log('size updated')
			console.log('new ref', this.$refs.kaka.offsetHeight)
		}
	},
	mounted() {
		console.log('refs', this.$refs)
		this.testWidth = this.$refs.kaka.offsetWidth

		console.log(this.$refs.kaka.offsetWidth)
	},
	updated() {
		this.testWidth = this.$refs.kaka.offsetWidth
	},
	methods: {
		setup(sketch) {
			sketch.createCanvas(this.testWidth / 2, 600)
			sketch.background(255)
			// const chanceHash = chance.hash({ length: 20 })
			// const chanceArr = chanceHash.split('')
			// console.log(chanceArr)
			// const newArr = chanceArr.map((c, i) => {
			// 	return chanceArr.splice(i, c)
			// })
			// console.log(newArr)
		},
		draw(sketch) {
			sketch.fill(255, 0, 0)
			sketch.rect(sketch.pmouseX, sketch.pmouseY, 30, 30)
		}
	}
}
</script>
<style scoped>
</style>
