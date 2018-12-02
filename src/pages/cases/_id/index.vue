<template>
  <el-row>
    <header-component/>
    <el-col v-if="theCase === null" :span="12" :offset="6" class="container">
      <span class="large-text loading">Loading case...</span>
    </el-col>
    <el-row v-else type="flex" justify="center">
      <el-col :sm="18" class="container">
        <el-row :gutter="10">
          <el-col id="top-left" :sm="24" :md="12">
            <!-- <case-card :the-case="theCase" /> -->
            <img id="case-image" :src="theCase.caseImage">
            <case-card-graph id="case-graph" style="background-color: black; height:200px;"/>
          </el-col>
          <el-col id="top-right" :sm="24" :md="12">
            <el-row id="title">
              <el-col>
                <p>_{{ theCase.caseName }}</p>
              </el-col>
            </el-row>
            <el-row id="data">
              <el-col v-for="elem in 4" :key="elem.key">
                <p><span>NAME:</span> {{ theCase.caseDescription }}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row id="bottom" :gutter="20">
          <div ref="hiya">
            <el-col id="mini-graph" :sm="12" :md="8">
              <el-row type="flex" justify="center">
                <loba-graph class="loba-graph"/>
              </el-row>
              <el-row type="flex" justify="center">
                <loba-graph class="loba-graph"/>
              </el-row>
              <el-row type="flex" justify="center">
                <loba-graph class="loba-graph"/>
              </el-row>
            </el-col>
          </div>
          <el-col :sm="12" :md="16">
            <case-card-metadata id="meta-data" :the-case="theCase"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import CaseCard from '../../../components/CaseCard.vue'
import HeaderComponent from '../../../components/HeaderComponent.vue'
import CaseCardMetadata from '../../../components/CaseCardMetadata.vue'
import CaseCardGraph from '../../../components/CaseCardGraph.vue'
import LobaGraph from '../../../components/LobaGraph.vue'

export default {
	components: {
		CaseCard,
		HeaderComponent,
		CaseCardMetadata,
		CaseCardGraph,
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
	/* box-shadow: 4px 4px 1px; */
}

#top-left {
	min-height: 100%;
	margin-top: 60px;
	/* border: 2px solid black; */
	transform: scale(0.9);
}
img {
	/* width: 100%; */
	margin-bottom: 40px;
}
#case-image,
#case-graph {
	width: 100%;
	border: 2px solid black;
	/* margin-left: 20px; */
	/* margin-bottom: 20px; */
}
#top-right {
	margin-top: 150px;
}
#title {
	font-size: 2.1rem;
	font-family: InputMonoCondensed;
	color: black;
	margin-left: 5px;
	margin-bottom: 20px;
	hyphens: auto;
	display: block;
}
#bottom {
	margin-bottom: 40px;
}

#data p {
	color: black;
	hyphens: auto;
	font-family: InputMonoCondensedItalic;
	/* border-bottom: 2px solid black; */
	margin-left: 15px;
}

#meta-data {
	margin-top: 50px;
	margin-right: 20px;
	margin-left: 20px;
	border: 2px solid black;
	/* border-right: 0px; */
}
#mini-graph {
	margin-top: 50px;
	transform: scale(0.9);
}
#mini-graph div {
	/* margin-left: 10px; */
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
