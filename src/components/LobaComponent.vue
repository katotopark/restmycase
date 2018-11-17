<template>
  <el-form :model="dataObj">
    <el-form-item>
      <el-row class="main-text">
        <el-row>
          <el-col :span="3">
            <h4 id="label">{{ dataObj.id }}:</h4>
          </el-col>
          <el-col :span="20">
            <p id="title">{{ dataObj.value }}</p>
          </el-col>
        </el-row>
        <el-row>
          <p id="sub-text">{{ fakeSub }}</p>
        </el-row>
      </el-row>
      <el-row>
        <el-rate v-model="dataObj.score" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" text-color="#ffffff" show-text @change="$emit('catch-input', dataObj.score)"/>
      </el-row>
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
		this.fakeSub = Faker.lorem.sentences(3)
	}
}
</script>
<style scoped>
.el-form-item {
	border-bottom: 2px solid black;
	margin-top: 5px;
	margin-bottom: 0px;
	font-family: InputMonoCondensed;
}
.el-row {
	margin-left: 5px;
}
.el-rate {
	margin-bottom: 10px;
	margin-left: 25px;
}
h4#label {
	color: black;
	margin-right: 15px;
	font-size: 1.3rem;
	margin-top: 0px;
	margin-bottom: 0px;
	width: 50%;
	/* padding-right: 13px; */
}

p#title {
	color: black;
	font-size: 1.1rem;
	margin-top: 3px;
	margin-bottom: 0px;
	font-family: InputMonoCondensed !important;
	font-weight: normal;
	hyphens: auto;
	display: block;
	/* line-height: 30px; */
}
.main-text {
	margin-bottom: 10px;
	/* border-bottom: 2px solid black; */
}
p#sub-text {
	font-family: InputMonoCondensedLightItalic;
	font-size: 0.9rem;
	margin-top: 5px;
	margin-bottom: 0px;
	margin-left: 25px;
	margin-right: 10px;
	line-height: 20px;
	hyphens: auto;
	display: block;
	max-width: 100%;
	/* line-height: 5px !important; */
}
</style>
