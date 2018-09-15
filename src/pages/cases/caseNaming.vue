<template>
  <div>
    <el-input
      v-model="textarea2"
      autosize
      type="textarea"
      placeholder="Please input"/>
    <div style="margin: 20px 0;"/>
    <el-input
      v-model="textarea3"
      :autosize="{ minRows: 2, maxRows: 4}"
      type="textarea"
      placeholder="Please input"/>
    <el-button type="info" icon="el-icon-check" circle @click="onSubmit"/>
    <ul>
      <li v-for="err in errors" :key="err.key">{{ err }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			textarea2: '',
			textarea3: '',
			errors: []
		}
	},
	computed: {
		...mapState(['formObj'])
	},
	methods: {
		...mapActions(['describeCase', 'mintCase']),
		async onSubmit() {
			this.checkInput()
			if (this.errors.length === 0) {
				await this.describeCase({
					caseName: this.textarea2,
					caseDescription: this.textarea3
				})
				this.mintCase()
			}
		},
		checkInput() {
			this.errors = []
			if (
				!this.textarea2 ||
				!this.textarea3 ||
				this.textarea2.length == 0 ||
				this.textarea3.length == 0
			) {
				this.errors.push('Fill those!')
			}
		}
	}
}
</script>
