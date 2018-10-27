<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-row class="row">
        <h3 class="label">Case name: <span id="title">_{{ caseName }}</span></h3>
        <el-input
          v-model="caseName"
          :rows="2"
          type="textarea"
          placeholder="e.g., Bureaupanique"/>
      </el-row>
      <el-row class="row">
        <h3 class="label">Case description: </h3>
        <el-input
          v-model="caseDescription"
          :autosize="{ minRows: 4, maxRows: 8}"
          type="textarea"
          placeholder="e.g., pre-breakfast absolute total shitstorm"/>
      </el-row>
      <el-row class="row">
        <el-button plain @click="onSubmit">Mint!</el-button>
      </el-row>
      <el-row class="row">
        <ul>
          <li v-for="err in errors" :key="err.key">{{ err }}</li>
        </ul>
      </el-row>
    </el-col>
    <case-card-data-viz ref="caseCardDataViz" :x="417" :y="240"/>

  </el-row>

</template>
<script>
import { mapState, mapActions } from 'vuex'
import CaseCardDataViz from '../../components/CaseCardDataViz.vue'

export default {
	components: {
		CaseCardDataViz
	},
	data() {
		return {
			caseName: '',
			caseDescription: '',
			errors: []
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
				const boundDrawingMethod = this.$refs.caseCardDataViz.draw.bind(
					this.$refs.caseCardDataViz
				)

				//TODO
				let caseData = {}
				const imageData = boundDrawingMethod(caseData)

				await this.describeCase({
					caseName: this.caseName,
					caseDescription: this.caseDescription,
					imageData: imageData
				})

				await this.randomNum()
				await this.mintComposed()
				this.$router.push('mintConfirm')
			}
		},
		checkInput() {
			this.errors = []
			if (
				!this.caseName ||
				!this.caseDescription ||
				this.caseName.length == 0 ||
				this.caseDescription.length == 0
			) {
				this.errors.push('Fill those!')
			}
		}
	}
}
</script>
<style scoped>
.el-row.row {
	margin-bottom: 1rem;
}
.label {
	margin-bottom: 0.5rem;
}
#title {
	/* font-size: 30px; */
	/* color: red; */
	width: 100%;
	word-wrap: break-word;
	display: inline;
}
.el-input {
	border-radius: 0px;
	border-top: 20px;
}
.el-button {
	border-radius: 0px;
	width: 100%;
	font-family: inherit;
	font-size: 1rem;
}
.el-button:hover,
.el-button:focus {
	background: white;
	color: black;
}
</style>
