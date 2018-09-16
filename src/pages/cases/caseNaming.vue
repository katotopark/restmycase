<template>
  <el-col :span="12" :offset="6">
    <span>Case name: {{ caseName }}</span>
    <el-input
      v-model="caseName"
      :rows="2"
      type="textarea"
      placeholder="e.g., Bureaupanique"/>
    <div style="margin: 20px 0;"/>
    <span>Case description: </span>
    <el-input
      v-model="caseDescription"
      :autosize="{ minRows: 4, maxRows: 8}"
      type="textarea"
      placeholder="e.g., pre-breakfast absolute total shitstorm"/>
    <el-button plain @click="onSubmit">Mint!</el-button>
    <ul>
      <li v-for="err in errors" :key="err.key">{{ err }}</li>
    </ul>
  </el-col>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
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
		...mapActions(['describeCase', 'randomNum', 'mintCase']),
		async onSubmit() {
			this.checkInput()
			if (this.errors.length === 0) {
				await this.describeCase({
					caseName: this.caseName,
					caseDescription: this.caseDescription
				})
				await this.randomNum()
				this.mintCase()

				this.$router.push('mintSucces')
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
span {
	margin: 50px auto;
}
.el-input {
	border-radius: 0px;
}
.el-button {
	border-radius: 0px;
}
</style>
