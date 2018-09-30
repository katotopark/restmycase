<template>
  <div v-if="showImage">
    <img src="https://www.solidbackgrounds.com/images/2880x1800/2880x1800-tiffany-blue-solid-color-background.jpg">
  </div>
</template>
<script>
export default {
	props: {
		showImage: {
			required: true,
			type: Boolean
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
img {
	width: 100%;
	height: 100%;
}
</style>
