<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-col :span="24" class="container">
        <el-row v-if="!confirmed" class="text">
          <el-col :span="24">
            <h5>Waiting for tx confirmation</h5>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24" class="container">
            <el-row id="card">
              <case-card :the-case="theCase"/>
            </el-row>
            <el-row class="text">
              <el-col :span="24">
                <el-button plain>Go Meta!</el-button>
                <h5>ipfsHash: {{ ipfsHash }}</h5>
                <h5>txHash: {{ txHash }}</h5>
                <h5>blockHash: {{ blockHash }}</h5>
                <h5>data: {{ bytes }}</h5>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
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
			theCase: {},
			confirmed: false,
			bytes: []
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash', 'blockHash'])
	},
	watch: {
		async txHash() {
			await this.composeCaseCard()
		}
	},
	methods: {
		...mapActions(['caseHashToData', 'getCaseId']),
		async composeCaseCard() {
			this.confirmed = true

			const caseId = await this.getCaseId(this.ipfsHash)
			let data = await this.caseHashToData(this.ipfsHash)
			let dataParsed = Object.assign(JSON.parse(data.toString('utf8')), {
				id: caseId
			})
			this.theCase = dataParsed

			this.bytes = Object.values(data)
			console.log(this.theCase)
		}
	}
}
</script>
<style scoped>
.text {
	max-width: 500px;
	word-wrap: break-word;
	border: 1px solid white;
	margin-bottom: 0px;
}
#card {
	margin-top: 20px;
	margin-bottom: 20px;
}
.el-col > h5 {
	margin: 0px;
	padding: 4px 4px;
	/* border-bottom: 1px solid white; */
}
.el-button {
	border-radius: 0px;
	border: 0px;
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
