<template>
  <el-row>
    <el-row>
      <el-col :span="12" :offset="6" style="color:white;">
        <h5>ipfsHash: {{ ipfsHash }}</h5>
        <h5>txHash: {{ txHash }}</h5>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="12" :offset="6" class="case-card">
        <case-card :the-case="theCase"/>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CaseCard from '../../components/CaseCard.vue'

export default {
	components: {
		CaseCard
	},
	data() {
		return {
			theCase: {}
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash'])
	},
	async created() {
		let usersCases = await this.getUsersCases(
			'0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
		)
		const caseId = usersCases.length
		let hash = await this.getCaseHash(caseId)
		let data = await this.caseHashToData(hash)
		let dataParsed = Object.assign(JSON.parse(data.toString('utf8')), {
			id: caseId
		})
		this.theCase = dataParsed
	},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
</style>
