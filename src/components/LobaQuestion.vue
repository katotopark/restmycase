<template>
  <div>
    <span>{{ lobaData.title }}? {{ lobaData.score }}</span>
    <el-rate v-model="lobaData.score" @change="$emit('catch-input', lobaData.score)"/>
  </div>
</template>
<script>
export default {
	props: {
		lobaData: {
			default: null,
			type: Object
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {}
}
</script>
<style scoped>
</style>
