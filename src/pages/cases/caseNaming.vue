<template>
  <el-row type="flex" justify="center" class="container">
    <el-col :span="12">
      <el-row>
        <error-component :err-arr="errors"/>
      </el-row>
      <el-row class="input-group">
        <el-row id="input-component">
          <input-component
            :data-obj.sync="newCase"
            :input-props="inputProps"
            :select-options="locClassArr"
            @catch-input="onCatchInput"
            @catch-select="onCatchClass"/>
        </el-row>
        <el-row id="button-component">
          <button-component
            :labels="buttonLabels"
            @handle-click="onClick"/>
        </el-row>
      </el-row>
    </el-col>
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
import InputComponent from '../../components/InputComponent.vue'
import ButtonComponent from '../../components/ButtonComponent.vue'

export default {
	components: {
		InputComponent,
		ButtonComponent,
		CaseCardDataViz,
		DataVizComponent,
		ErrorComponent
	},
	data() {
		return {
			newCase: {
				caseName: '',
				caseDescription: '',
				caseClass: ''
			},
			inputProps: {
				caseName: { type: 'input' },
				caseDescription: { type: 'input' },
				caseClass: { type: 'select' }
			},
			buttonLabels: ['Mint', 'Clear'],
			caseName: '',
			caseDescription: '',
			caseClass: '',
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
		async onClick(e) {
			if (e.id == 0) await this.onSubmit()
			else if (e.id == 1) this.onClear()
		},
		onCatchInput(e) {
			if (e.prop == 'caseName') this.caseName = e.value
			else if (e.prop == 'caseDescription') this.caseDescription = e.value
		},
		onCatchClass(e) {
			this.caseClass = e.value
			console.log(`class is ${this.caseClass}`)
		},
		async onSubmit() {
			this.checkInput()
			if (this.errors.length === 0) {
				this.lobas = this.formObj.lobas

				await this.randomNum()

				this.tDuration = parseFloat(this.formObj.tDuration)
				this.tDistance = parseFloat(this.formObj.tDistance)

				const boundDrawingMethod = this.$refs.caseCardDataViz.lobasMethod.bind(
					this.$refs.caseCardDataViz
				)
				const imageData = boundDrawingMethod(
					this.tDuration,
					this.tDistance,
					this.formObj.lobas
				)

				this.newCase = {
					caseName: this.caseName,
					caseDescription: this.caseDescription,
					caseClass: this.caseClass,
					caseImage: imageData
				}

				await this.describeCase(this.newCase)
				await this.mintComposed()
				this.$router.push('mintConfirm')
			}
		},
		onClear() {
			this.newCase = {}
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
.input-group {
	border: 2px solid black;
}
#button-component {
	margin-bottom: 20px;
	margin-top: 20px;
}
#input-component {
	border-bottom: 2px solid black;
}

.container {
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
