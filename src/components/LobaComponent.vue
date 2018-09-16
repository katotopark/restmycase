<template>
  <el-form :model="dataObj">
    <el-form-item :label="`${dataObj.id}: `">
      <span>{{ dataObj.title }}</span>
      <el-rate v-model="dataObj.score" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text @change="$emit('catch-input', dataObj.score)"/>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Object
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
</style>
