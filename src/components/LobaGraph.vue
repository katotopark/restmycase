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
	data() {
		return {
			msg: 'hello'
		}
	},
	methods: {
		setup() {},
		draw() {}
	}
}
</script>
<style scoped>
</style>
