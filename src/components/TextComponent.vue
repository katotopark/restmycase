<template>
  <div v-if="textStrings">
    <p :style="styleObj">{{ textStrings }}</p>
  </div>
</template>
<script>
export default {
	props: {
		textStrings: {
			type: String,
			required: true
		},
		styleObj: {
			type: Object,
			required: true
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
</style>
