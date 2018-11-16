<template>
  <el-row>
    <header-component/>
    <el-col v-if="theCase === null" :span="12" :offset="6" class="container">
      <span class="large-text loading">Loading case...</span>
    </el-col>
    <el-col v-else :span="12" :offset="6" class="container">
      <el-row :gutter="10">
        <el-col id="image" :span="12">
          <case-card :the-case="theCase" />
          <!-- <img :src="theCase.caseImage"> -->
        </el-col>
        <el-col id="top-right" :sm="12" :md="12">
          <el-row id="title" class="large-text">
            <el-col :span="12">
              <span>_{{ theCase.caseName }}</span>
            </el-col>
          </el-row>
          <el-row id="data">
            <el-col v-for="elem in 4" :key="elem.key" :span="24">
              <p><span>NAME:</span> {{ theCase.caseDescription }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div ref="hiya">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row>
              <div style="background-color: black; height: 200px; border:1px solid black;"/>
            </el-row>
            <el-row>
              <div style="background-color: purple; height: 200px; border:1px solid purple;">
                <el-col :span="20" :offset="2">
                  <loba-graph/>
                </el-col>

              </div>
            </el-row>
            <el-row>
              <div style="background-color: black; height: 200px; border:1px solid black;"/>
            </el-row>
          </el-col>
          <el-col :span="16">
            <case-card-metadata id="meta-data" :the-case="theCase" :long="dim"/>
          </el-col>
        </el-row>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import CaseCard from '../../../components/CaseCard.vue'
import HeaderComponent from '../../../components/HeaderComponent.vue'
import CaseCardMetadata from '../../../components/CaseCardMetadata.vue'
import LobaGraph from '../../../components/LobaGraph.vue'

export default {
	components: {
		CaseCard,
		HeaderComponent,
		CaseCardMetadata,
		LobaGraph
	},
	data() {
		return {
			theCase: {},
			metadata: '',
			dim: 0
		}
	},
	async created() {
		let caseId = this.$route.params.id

		if (typeof caseId !== 'string') throw 'CaseID is wrong'

		let hash = await this.getCaseHash(caseId)
		let encodedData = await this.caseHashToData(hash)
		let caseData = JSON.parse(encodedData.toString('utf8'))

		this.metadata = Object.values(encodedData)
		this.theCase = Object.assign(caseData, { id: caseId })
	},
	mounted() {
		this.dim = this.$refs.hiya.clientHeight
	},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
.container {
	border: 2px solid black;
	margin-top: 40px;
}

#top-left {
	min-height: 100%;
	/* margin-top: 10px; */
}

#top-right {
	margin-top: 150px;
}

#title,
.large-text {
	font-size: 2.5rem;
	font-weight: bold;
	color: black;
	margin-left: 5px;
	margin-bottom: 20px;
}

.el-row#data p {
	color: black;
	hyphens: auto;
	border-bottom: 2px solid black;
	margin-left: 15px;
}

.loading {
	margin: 80px 20px;
}

p > span {
	font-size: 1.3rem;
	color: white;
	background-color: black;
}
</style>
