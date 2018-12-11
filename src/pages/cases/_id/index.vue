<template>
  <el-row>
    <header-component/>
    <el-col v-if="theCase === null" :span="12" :offset="6" class="container">
      <span class="large-text loading">Loading case...</span>
    </el-col>
    <el-row v-else :gutter="20" type="flex" justify="center">
      <el-col :sm="22" :md="16" :offset="0" class="container">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col id="top-left" :sm="24" :md="18">
            <img id="case-image" :src="theCase.caseImage">
            <!-- <data-viz-component :lobas="lobas" :duration="tDuration" :distance="tDistance"/> -->
          </el-col>
          <!-- <el-row type="flex" justify="end"> -->
          <el-col id="top-right" :sm="24" :md="10">
            <el-row id="title">
              <el-col>
                <p><span>Name:</span> _{{ theCase.caseName }}</p>
              </el-col>
            </el-row>
            <el-row id="description">
              <el-col v-for="elem in 1" :key="elem.key">
                <p><span>Description:</span> {{ theCase.caseDescription }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col id="time-distance" :span="24">
                <p><span>Duration:</span> {{ tDuration }} hrs</p>
                <p><span>Distance:</span> {{ tDistance }} kms</p>
              </el-col>
            </el-row>
          </el-col>
          <!-- </el-row> -->

        </el-row>
        <el-row type="flex" justify="center">
          <el-col ref="graph" :span="22">
            <case-card-graph
              id="case-graph"
              :lobas="lobas"
              :dimensions="dims"/>
            <el-col id="lobas" :span="8">
              <h4><span>LobaLobas:</span> {{ theCase.totalScore }}:75</h4>
            </el-col>
          </el-col>
        </el-row>
        <el-row id="bottom" :gutter="5">
          <div ref="hiya">
            <el-col :xs="24" :sm="12" :md="10" class="mini-graph">
              <el-row type="flex" justify="center">
                <loba-graph
                  :lobas="lobas"
                  group-val="A"
                  class="loba-graph"/>
              </el-row>
              <el-row type="flex" justify="center">
                <loba-graph
                  :lobas="lobas"
                  group-val="B"
                  class="loba-graph"/>
              </el-row>
              <el-row type="flex" justify="center">
                <loba-graph
                  :lobas="lobas"
                  group-val="C"
                  class="loba-graph"/>
              </el-row>
            </el-col>
          </div>
          <el-col :xs="24" :sm="12" :md="14">
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
import DataVizComponent from '../../../components/DataVizComponent.vue'

export default {
	components: {
		CaseCard,
		HeaderComponent,
		CaseCardMetadata,
		CaseCardGraph,
		LobaGraph,
		DataVizComponent
	},
	data() {
		return {
			theCase: {},
			metadata: '',
			dims: {
				x: 720,
				y: 240
			},
			lobas: {},
			tDuration: 0,
			tDistance: 0
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

		this.lobas = this.theCase.lobas

		this.tDuration = parseFloat(this.theCase.tDuration)
		this.tDistance = parseFloat(this.theCase.tDistance)
	},
	mounted() {
		// this.dim = this.$refs.hiya.clientHeight
	},
	updated() {},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
.container {
	border: 2px solid black;
	margin-top: 40px;
	box-shadow: 2px 2px 4px;
}

#top-left {
	min-height: 100%;
	margin-top: 200px;
	/* border: 2px solid black; */
	transform: scale(0.7);
}

img {
	/* width: 100%; */
	margin-bottom: 10px;
}
#case-image {
	width: 100%;
	/* border: 2px solid black; */
	/* margin-left: 20px; */
	/* margin-bottom: 20px; */
}
#case-graph {
	margin-top: 30px;
	padding: 20px 0px;
	width: 100%;
	/* border: 2px solid black; */
}
#top-right {
	margin-top: 350px;
	margin-bottom: 50px;
	padding-right: 20px;
	/* text-align: right; */
}
#title {
	font-size: 1.4rem;
	font-family: InputMonoCondensed;
	color: black;
	margin-left: 5px;
	margin-bottom: 10px;
	hyphens: auto;
	display: block;
}
#bottom {
	margin-bottom: 40px;
}

#description p {
	color: black;
	hyphens: auto;
	font-family: InputMonoCondensedItalic;
	/* border-bottom: 2px solid black; */
	/* margin-left: 15px; */
	/* padding: 10px; */
	font-size: 1.1rem;
	line-height: 30px;
}

#meta-data {
	margin-top: 50px;
	margin-right: 20px;
	margin-left: 20px;
	border: 2px solid black;
	/* border-right: 0px; */
}
.mini-graph {
	margin-top: 50px;
	transform: scale(1);
	/* border: 2px solid black; */
}
.mini-graph div {
	/* margin-left: 10px; */
}

.loading {
	margin: 80px 20px;
}
#lobas h4 {
	background-color: black;
	color: white;
	font-family: InputMonoCondensed;
	font-weight: normal;
	font-size: 1.2rem;
	text-transform: uppercase;
	padding: 4px;
}
#time-distance p {
	font-size: 1.2rem;
	color: white;
	background-color: black;
	font-family: InputMonoCondensed !important;
	font-weight: normal;
	text-transform: uppercase;
	padding: 4px;
	width: 50%;
}
#time-distance {
	margin-top: 20px;
}
</style>
