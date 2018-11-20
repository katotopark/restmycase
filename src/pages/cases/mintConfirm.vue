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
              <!-- <el-button plain>Go Meta!</el-button> -->
              <case-card-metadata :the-case="theCase"/>
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
import CaseCardMetadata from '../../components/CaseCardMetadata.vue'

export default {
	components: {
		CaseCard,
		CaseCardMetadata
	},
	data() {
		return {
			theCase: {},
			confirmed: false
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
			let parsedData = JSON.parse(data.toString('utf8'))

			console.log('parsed data is', parsedData)

			let theCase = Object.assign(parsedData, {
				id: caseId
			})
			this.theCase = theCase

			// console.log(this.theCase)
		}
	}
}
</script>
<style scoped>
.text {
	/* max-width: 500px; */
	/* word-wrap: break-word; */
	border: 2px solid black;
	color: black;
	margin-bottom: 50px;
}
#card {
	margin-top: 20px;
	margin-bottom: 20px;
}
.el-button {
	border-radius: 0px;
	border: 0px;
	width: 100%;
	height: 4rem;
	font-family: inherit;
	font-size: 1rem;
}
.el-button:hover,
.el-button:focus {
	background: black;
	color: white;
}
</style>
