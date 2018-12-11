<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-row>
        <error-component :err-arr="errors"/>
      </el-row>
      <el-row id="container">
        <el-row>
          <el-row class="input-label">
            <h2>_NAME</h2>
          </el-row>
          <el-row class="input-area" type="flex" justify="center">
            <el-col :span="22">
              <el-input
                v-model="caseName"
                :rows="2"
                type="textarea"
                placeholder="e.g., Bureaupanique"/>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row class="input-label">
            <h2>_DESCRIPTION</h2>
          </el-row>
          <el-row class="input-area" type="flex" justify="center">
            <el-col :span="22">
              <el-input
                v-model="caseDescription"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="e.g., pre-breakfast absolute total shitstorm"/>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row class="input-label">
            <h2>_CLASS<span v-if="caseClass">: C.{{ caseClass }}</span></h2>
          </el-row>
          <el-row class="input-area" type="flex" justify="center">
            <el-col :span="22">
              <el-select v-model="caseClass" :placeholder="caseClass.label" @change="handleChange">
                <el-option v-for="loc in locClassArr" :key="loc.value" :value="loc.value" :label="`${loc.label}`"/>
              </el-select>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="12">
          <el-button plain @click="onSubmit">Mint</el-button>
        </el-col>
        <el-col :span="12">
          <el-button plain @click="onClear">Clear</el-button>
        </el-col>
      </el-row>
    </el-col>
    <!-- <case-card-data-viz ref="caseCardDataViz" :x="417" :y="240"/> -->
    <data-viz-component
      ref="caseCardDataViz"
      :lobas="lobas"
      :distance="tDistance"
      :duration="tDuration"/>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CaseCardDataViz from '../../components/CaseCardDataViz.vue'
import DataVizComponent from '../../components/DataVizComponent.vue'
import ErrorComponent from '../../components/ErrorComponent.vue'

export default {
	components: {
		CaseCardDataViz,
		DataVizComponent,
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
			caseClass: '',
			caseClassOutput: '',
			errors: [],
			tDistance: 0,
			tDuration: 0,
			lobas: {}
		}
	},
	computed: {
		...mapState(['formObj'])
	},
	methods: {
		...mapActions(['describeCase', 'randomNum', 'mintComposed']),
		async onSubmit() {
			this.checkInput()
			if (this.errors.length === 0) {
				this.lobas = this.formObj.lobas

				await this.randomNum()

				this.tDuration = parseFloat(this.formObj.tDuration)
				this.tDistance = parseFloat(this.formObj.tDistance)

				console.log(
					`got prop data: distance => ${this.formObj.tDistance}; duration => ${
						this.formObj.tDuration
					}`
				)
				console.log('lobas are ', this.lobas)
				// const boundDrawingMethod = this.$refs.caseCardDataViz.draw.bind(
				// 	this.$refs.caseCardDataViz
				// )
				const boundDrawingMethod = this.$refs.caseCardDataViz.lobasMethod.bind(
					this.$refs.caseCardDataViz
				)

				//TODO
				// let caseData = {}
				//boundDrawingMethod(this.tDuration, this.tDistance, caseData)
				const imageData = boundDrawingMethod(
					this.tDuration,
					this.tDistance,
					this.formObj.lobas
				)

				console.log('imageData', imageData)

				await this.describeCase({
					caseName: this.caseName,
					caseDescription: this.caseDescription,
					caseClass: this.caseClass,
					caseImage: imageData
				})

				await this.mintComposed()
				this.$router.push('mintConfirm')
			}
		},
		handleChange(index) {
			this.caseClass = this.locClassArr[index - 1]['value']
		},
		onClear() {
			console.log('cleared')
			this.caseName = ''
			this.caseDescription = ''
			this.caseClass = ''
		},
		checkInput() {
			this.errors = []
			if (
				!this.caseName ||
				!this.caseDescription ||
				!this.caseClass ||
				this.caseName.length == 0 ||
				this.caseDescription.length == 0 ||
				this.caseClass == 0
			) {
				this.errors.push('Fill those!')
			}
		}
	}
}
</script>
<style scoped>
.el-row#container {
	border: 2px solid black;
	margin-top: 40px;
}
.el-input {
	border-radius: 0px;
}
div.el-textarea:focus {
	border: 2px solid red !important;
}
.el-select {
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
	margin-top: 20px;
}
.el-button:hover {
	background: black;
	color: white;
	font-family: InputMonoCondensedItalic;
	border: 2px solid black;
}
.input-label h2 {
	font-size: 1.1rem;
	font-family: InputMonoCondensed;
	background-color: black;
	color: white;
	width: 100%;
	padding: 5px 5px;
	margin-top: 0px;
	margin-bottom: 15px;
	word-wrap: break-word;
	/* border: 2px solid red; */
}
.el-row.input-area {
	margin-bottom: 20px;
}
</style>
