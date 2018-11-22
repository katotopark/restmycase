<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-row>
        <error-component :err-arr="errors"/>
      </el-row>
      <el-row class="row">
        <h3 class="label">Name: _{{ caseName }}</h3>
        <el-input
          v-model="caseName"
          :rows="2"
          type="textarea"
          placeholder="e.g., Bureaupanique"/>
      </el-row>
      <el-row>
        <h3 class="label">Description: </h3>
        <el-input
          v-model="caseDescription"
          :autosize="{ minRows: 4, maxRows: 8}"
          type="textarea"
          placeholder="e.g., pre-breakfast absolute total shitstorm"/>
      </el-row>
      <el-row>
        <h3 class="label">Class: C.{{ caseClass.value }} </h3>
        <el-select v-model="caseClass" :placeholder="caseClass.label" clearable @change="handleChange">
          <el-option v-for="loc in locClassArr" :key="loc.value" :value="loc.value" :label="`${loc.label}`"/>
        </el-select>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-button plain @click="onSubmit">Mint</el-button>
        </el-col>
        <el-col :span="12">
          <el-button plain @click="onClear">Clear</el-button>
        </el-col>
      </el-row>
    </el-col>
    <case-card-data-viz ref="caseCardDataViz" :x="417" :y="240"/>
  </el-row>
</template>
<script>
import { mapActions } from 'vuex'
import CaseCardDataViz from '../../components/CaseCardDataViz.vue'
import ErrorComponent from '../../components/ErrorComponent.vue'

export default {
	components: {
		CaseCardDataViz,
		ErrorComponent
	},
	data() {
		return {
			caseName: '',
			caseDescription: '',
			locClassArr: [
				{
					value: '1',
					label: 'Governmental'
				},
				{
					value: '2',
					label: 'Legal'
				},
				{
					value: '3',
					label: 'Medical'
				},
				{
					value: '4',
					label: 'Academic'
				},
				{
					value: '5',
					label: 'Professional'
				}
			],
			caseClass: { value: '', label: '' },
			caseClassOutput: '',
			errors: []
		}
	},
	computed: {},
	methods: {
		...mapActions(['describeCase', 'randomNum', 'mintComposed']),
		async onSubmit() {
			this.checkInput()
			if (this.errors.length === 0) {
				const boundDrawingMethod = this.$refs.caseCardDataViz.draw.bind(
					this.$refs.caseCardDataViz
				)

				//TODO
				let caseData = {}
				const imageData = boundDrawingMethod(caseData)

				await this.describeCase({
					caseName: this.caseName,
					caseDescription: this.caseDescription,
					caseClass: this.caseClass,
					caseImage: imageData
				})

				await this.randomNum()
				await this.mintComposed()
				this.$router.push('mintConfirm')
			}
		},
		handleChange(index) {
			this.caseClass = {
				value: this.locClassArr[index - 1]['value'],
				label: this.locClassArr[index - 1]['label']
			}
		},
		onClear() {
			console.log('cleared')
			this.caseName = ''
			this.caseDescription = ''
			this.caseClass = {
				value: '',
				label: ''
			}
		},
		checkInput() {
			this.errors = []
			if (
				!this.caseName ||
				!this.caseDescription ||
				this.caseName.length == 0 ||
				this.caseDescription.length == 0 ||
				!this.caseClass.value ||
				!this.caseClass.label
			) {
				this.errors.push('Fill those!')
			}
		}
	}
}
</script>
<style scoped>
.el-row {
	margin-bottom: 20px;
}
h3 {
	margin: 0px 0px 10px 0px;
	word-wrap: break-word;
	display: block;
	font-weight: normal;
}
.el-input {
	border-radius: 0px;
}
div.el-textarea:focus {
	border: 2px solid red !important;
}
.el-select {
	margin-bottom: 20px;
	width: 100%;
}
.el-button,
.el-button:active,
.el-button:focus {
	border-radius: 0px;
	border: 2px solid black;
	width: 100%;
	height: 4rem;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	background-color: rgb(247, 244, 204);
	color: black;
}
.el-button:hover {
	background: black;
	color: white;
	font-family: InputMonoCondensedItalic;
	border: 2px solid black;
}
</style>
