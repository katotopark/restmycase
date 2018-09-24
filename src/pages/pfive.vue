<template>
  <div>
    <!-- <vue-p5 v-on="{setup}"/> -->
    <!-- <a :href="fakerImg"/> -->
    <img :src="fakerImg">
  </div>
</template>
<script>
import Faker from 'faker'
import Chance from 'chance'

const chance = new Chance()

var components = {}
if (process.browser) {
	const VueP5 = require('vue-p5')
	components.VueP5 = VueP5
}

export default {
	components: components,
	data() {
		return {
			fakerImg: null
		}
	},
	created() {
		this.fakerImg = Faker.image.abstract()
	},
	methods: {
		setup(sketch) {
			sketch.createCanvas(400, 600)

			const chanceHash = chance.hash({ length: 20 })
			const chanceArr = chanceHash.split('')
			console.log(chanceArr)
			// const newArr = chanceArr.map((c, i) => {
			// 	return chanceArr.splice(i, c)
			// })
			// console.log(newArr)
		}
	}
}
</script>
<style scoped>
</style>
