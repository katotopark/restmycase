<template>
  <el-form :model="dataObj">
    <el-form-item>
      <span id="label">{{ dataObj.id }}:</span>
      <span id="title">{{ dataObj.value }}</span>
      <p id="sub-text">{{ fakeSub }}</p>
      <el-rate v-model="dataObj.score" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" text-color="#ffffff" show-text @change="$emit('catch-input', dataObj.score)"/>
    </el-form-item>
  </el-form>
</template>
<script>
import Faker from 'faker'
export default {
	props: {
		dataObj: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			fakeSub: ''
		}
	},
	created() {
		this.fakeSub = Faker.lorem.sentences(1)
	}
}
</script>
<style scoped>
#title {
	color: black;
	font-size: 1.1rem;
}
.el-form-item {
	border-bottom: 2px solid black;
	margin-top: 5px;
	margin-bottom: 0px;
	font-family: InputMonoCondensed;
}

#label {
	color: black;
	/* background-color: black; */
	/* padding: 2px; */
	margin-right: 5px;
	font-size: 1.5rem;
	/* padding-right: 10px; */
	padding-top: 5px;
	padding-bottom: 5px;
	/* border-bottom: 2px solid black; */
}
p#sub-text {
	font-family: InputMonoCondensedItalic;
	/* line-height: 5px !important; */
}
/* .span.el-rate__text {
	color: black !important;
	background-color: white !important;
}
i.el-rate__icon {
	color: red !important;
} */
</style>
