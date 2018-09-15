<template>
  <el-form :model="dataObj">
    <el-form-item :label="dataObj.title">
      <el-rate v-model="dataObj.score" @change="$emit('catch-input', [dataObj.score])"/>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
	props: {
		dataObj: {
			default: null,
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
