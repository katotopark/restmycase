<template>
  <el-form :model="dataObj">
    <el-form-item>
      <span id="label">{{ dataObj.id }}:</span>
      <span id="title">{{ dataObj.title }}</span>
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
#title,
#label {
	color: white;
	font-size: 1.1rem;
}
#label {
	color: black;
	background-color: white;
	padding: 2px;
	margin-right: 5px;
}
</style>
