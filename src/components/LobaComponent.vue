<template>
  <el-form :model="dataObj">
    <el-form-item>
      <el-row class="main-text">
        <el-row :gutter="5">
          <el-col :span="2.5">
            <h4 id="label">{{ dataObj.id }}:</h4>
          </el-col>
          <el-col :span="21">
            <el-row>
              <p id="title">{{ dataObj.value }}</p>
            </el-row>
            <el-row>
              <p id="sub-text">{{ fakeSub }}</p>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="slider" type="flex" justify="center">
        <input v-model="dataObj.score" :step="0.01" type="range" min="1" max="5" @change="$emit('catch-input', dataObj.score)">
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
	},
	methods: {
		handleClick(e) {
			let id = Number(e.target.id) + 1
			console.log(id)
		}
	}
}
</script>
<style scoped>
.el-form-item {
	border-bottom: 2px solid black;
	margin-top: 0px;
	margin-bottom: 0px;
	font-family: InputMonoCondensed;
}
.el-row.main-text {
	margin-left: 5px;
	margin-top: 10px;
}
.el-row.main-tex {
	/* border: 2px solid red;
	height: 40px; */
}
.el-rate {
	margin-bottom: 10px;
	margin-left: 25px;
}

input[type='range'] {
	-webkit-appearance: none;
	width: 80%;
	margin-bottom: 25px;
	margin-top: 15px;
}
input[type='range']:focus {
	outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
	width: 100%;
	height: 30px;
	cursor: pointer;
	background: #000000;
}
input[type='range']::-webkit-slider-thumb {
	border: 2px solid #000000;
	height: 30px;
	width: 30px;
	background: #ffffff;
	cursor: pointer;
	-webkit-appearance: none;
}
input[type='range']:focus::-webkit-slider-runnable-track {
	background: #000000;
}
input[type='range']::-moz-range-track {
	width: 100%;
	height: 30px;
	cursor: pointer;
	background: #000000;
	border: 0px solid #010101;
}
input[type='range']::-moz-range-thumb {
	border: 2px solid #000000;
	height: 30px;
	width: 30px;
	background: #ffffff;
	cursor: pointer;
}
input[type='range']::-ms-track {
	width: 100%;
	height: 30px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
input[type='range']::-ms-fill-lower {
	background: #000000;
	border: 0px solid #010101;
}
input[type='range']::-ms-fill-upper {
	background: #000000;
	border: 0px solid #010101;
}
input[type='range']::-ms-thumb {
	height: 30px;
	width: 30px;
	background: #ffffff;
	cursor: pointer;
	height: 30px;
}
h4#label {
	color: black;
	font-size: 1.6rem;
	font-family: InputMonoCondensed;
	margin-top: 0px;
	margin-bottom: 0px;
	width: 50%;
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
	line-height: 30px;
}
.main-text {
	margin-bottom: 10px;
}
p#sub-text {
	font-family: InputMonoCondensedLightItalic;
	font-size: 0.9rem;
	margin-top: 5px;
	margin-bottom: 0px;
	padding-right: 10px;
	/* margin-left: 25px; */
	margin-right: 10px;
	line-height: 20px;
	hyphens: auto;
	display: block;
	max-width: 100%;
	/* line-height: 5px !important; */
}
</style>
