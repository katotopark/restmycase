<template>
  <div v-if="textStrings">
    <p>{{ textStrings }}</p>
  </div>
</template>
<script>
export default {
	props: {
		textStrings: {
			type: String,
			required: true
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
p {
	font-family: InputMonoCondensedLightItalic;
	font-size: 1rem;
	margin-top: 20px;
	margin-bottom: 5px;
	word-wrap: break-word;
}
</style>
