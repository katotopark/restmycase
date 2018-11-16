<template>
  <el-form :model="dataObj">
    <el-form-item>
      <span id="label">{{ dataObj.id }}:</span>
      <span id="title">{{ dataObj.value }}</span>
      <el-rate v-model="dataObj.score" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" text-color="#ffffff" show-text @change="$emit('catch-input', dataObj.score)"/>
      <span>hello</span>
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
#title {
	color: black;
	font-size: 1.1rem;
}
.el-form {
	border-bottom: 2px solid black;
}

#label {
	color: white;
	background-color: black;
	padding: 2px;
	margin-right: 5px;
	font-size: 1.3rem;
}
/* .span.el-rate__text {
	color: black !important;
	background-color: white !important;
}
i.el-rate__icon {
	color: red !important;
} */
</style>
