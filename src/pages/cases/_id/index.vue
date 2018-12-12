<template>
  <el-row>
    <header-component/>
    <el-col v-if="theCase === null" :span="12" :offset="6" class="container">
      <span class="large-text loading">Loading case...</span>
    </el-col>
    <el-row v-else :gutter="20" type="flex" justify="center">
      <el-col :sm="22" :md="16" :offset="0" class="container">
        <el-row :gutter="0" type="flex" justify="center">
          <el-col id="top-left" :sm="24" :md="16">
            <img id="case-image" :src="theCase.caseImage">
          </el-col>
          <el-col id="top-right" :sm="24" :md="10">
            <el-row id="name">
              <el-col>
                <p><span/> _{{ theCase.caseName }}</p>
              </el-col>
            </el-row>
            <el-row id="description">
              <el-col v-for="elem in 1" :key="elem.key">
                <p><span/> {{ theCase.caseDescription }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col id="time-distance" :span="24">
                <p><span>Duration:</span> {{ tDuration }} hrs</p>
                <p><span>Distance:</span> {{ tDistance }} kms</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col ref="graph" :span="22" class="graph-group">
            <el-col id="lobas" :span="24">
              <h4><span>_LobaLobas:</span> {{ theCase.totalScore }}:75</h4>
            </el-col>
            <case-card-graph
              id="case-graph"
              :lobas="lobas"
              :dimensions="dims"/>
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
            <el-row>
              <case-card-metadata id="meta-data" :the-case="theCase"/>
            </el-row>
            <el-row type="flex" justify="end">
              <div class="mouse-react" @mouseenter="changeString" @mouseleave="revertString">
                <el-button id="buy-button">{{ defaultString }}</el-button>
              </div>
            </el-row>
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
			tDistance: 0,
			defaultString: '0 ETH',
			price: 0
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

		this.price =
			(this.theCase.totalScore * this.tDuration * this.tDistance) / 10000
		this.price = this.price.toFixed(4)
		this.defaultString = `${this.price} ETH`
	},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData']),
		changeString() {
			console.log('string changed.')
			let buyString = 'Buy Case'
			let defaultString = `${this.price} ETH`
			if (this.defaultString == defaultString)
				return (this.defaultString = buyString)
		},
		revertString() {
			let defaultString = `${this.price} ETH`
			let buyString = 'Buy Case'
			if (this.defaultString == buyString)
				return (this.defaultString = defaultString)
		}
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
	margin-top: 150px;
	/* border: 2px solid black; */
	transform: scale(0.7);
	align-items: center;
}

#case-image {
	width: 100%;
	border: 1px solid black;
}
#case-graph {
	margin-top: 30px;
	padding: 20px 0px;
	width: 100%;
	/* border: 2px solid black; */
}
.graph-group {
	border: 2px solid black;
}
#top-right {
	margin-top: 300px;
	margin-bottom: 50px;
	padding-right: 10px;
	/* border: 2px solid black; */
	/* text-align: right; */
}
#name {
	font-size: 1.6rem;
	font-family: InputMonoCondensed;
	font-weight: bold;
	color: black;
	margin-left: 5px;
	margin-bottom: 0px;
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
	margin-left: 5px;
	/* padding: 10px; */
	font-size: 1.3rem;
	line-height: 30px;
	margin-top: 0px;
	margin-bottom: 0px;
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
.loading {
	margin: 80px 20px;
}
#lobas h4 {
	background-color: black;
	color: white;
	font-family: InputMonoCondensed;
	font-weight: normal;
	font-size: 1.3rem;
	text-transform: uppercase;
	padding: 4px;
	margin-top: 0px;
}
#time-distance p {
	font-size: 1.3rem;
	color: white;
	background-color: black;
	font-family: InputMonoCondensed !important;
	font-weight: normal;
	text-transform: uppercase;
	padding: 4px;
	width: 90%;
}
#time-distance {
	margin-top: 20px;
}
div.mouse-react {
	/* border: 2px solid black; */
	margin-right: 50px;
	margin-left: 20px;
	width: 100%;
	width: 20rem;
	height: 12rem;
	margin-top: 60px;
}
.el-button#buy-button {
	font-family: InputMonoCondensed;
	font-size: 1.4rem;
	border-radius: 0px;
	width: 20rem;
	height: 12rem;
	border: 0px;
	background-color: rgb(247, 244, 204);
	color: black;
	border: 2px solid black;
}
.el-button#buy-button:hover {
	background-color: black;
	color: white;
	font-family: InputMonoCondensedItalic;
}
</style>
