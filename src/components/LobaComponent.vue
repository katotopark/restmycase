<template>
  <el-form :model="dataObj">
    <el-form-item>
      <span id="label">{{ dataObj.id }}:</span>
      <span id="title">{{ dataObj.value }}</span>
      <el-rate v-model="dataObj.score" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" text-color="#ffffff" show-text @change="$emit('catch-input', dataObj.score)"/>
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
.span.el-rate__text {
	color: black !important;
	background-color: white !important;
}
i.el-rate__icon {
	color: red !important;
}
</style>
