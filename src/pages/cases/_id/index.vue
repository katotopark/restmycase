<template>
  <el-row>
    <el-col v-if="theCase === null" :span="16" :offset="4" class="container">
      <span class="large-text loading">Loading case...</span>
    </el-col>
    <el-col v-else :span="16" :offset="4" class="container">
      <el-col id="top-left" :sm="12" :md="12">
        <el-row>
          <el-col id="image" :span="24">
            <case-card :the-case="theCase" />
            <!-- <img :src="theCase.caseImage"> -->
          </el-col>
        </el-row>
      </el-col>
      <el-col id="top-right" :sm="12" :md="12">
        <el-row id="title" class="large-text">
          <el-col :span="24">
            <span>_{{ theCase.caseName }}</span>
          </el-col>
        </el-row>
        <el-row id="data">
          <el-col v-for="elem in 8" :key="elem.key" :span="24">
            <p><span>NAME:</span> {{ theCase.caseDescription }}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-row>
        <el-col :span="24">
          <p>{{ metadata }}</p>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import CaseCard from '../../../components/CaseCard.vue'

export default {
	components: {
		CaseCard
	},
	data() {
		return {
			theCase: null,
			metadata: ''
		}
	},
	async created() {
		let caseId = this.$route.params.id

		if (typeof caseId !== 'string') throw 'CaseID is wrong'

		let hash = await this.getCaseHash(caseId)
		let encodedData = await this.caseHashToData(hash)
		let caseData = JSON.parse(encodedData.toString('utf8'))

		console.log(hash)
		console.table(caseData)
		this.metadata = Object.values(encodedData)
		this.theCase = caseData
	},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
.container {
	border: 1px solid white;
}

#top-left {
	min-height: 100%;
	/* margin-top: 10px; */
}

#top-right {
	margin-top: 150px;
	height: 100%;
}

#title,
.large-text {
	font-size: 2.5rem;
	font-weight: bold;
	color: white;
	margin-left: 5px;
	margin-bottom: 20px;
}

.el-row#data p {
	color: white;
	hyphens: auto;
	border-bottom: 0.5px solid white;
	margin-left: 15px;
}

.loading {
	margin: 80px 20px;
}

p > span {
	font-size: 1.3rem;
	color: black;
	background-color: white;
}
</style>
