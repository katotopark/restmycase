<template>
  <el-row type="flex" justify="center">
    <el-col id="container">
      <div v-if="revealComponents">
        <el-row class="case-id" type="flex" justify="center">
          <h3>#{{ index + 1 }}</h3>
        </el-row>
      </div>
      <div>
        <el-row type="flex" justify="end" >
          <el-col id="case-class" :span="24">
            <h4>C.{{ theCase.caseClass }}</h4>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col class="case-card">
          <el-col>
            <el-row>
              <el-col id="case-img" :span="20" :offset="2">
                <div ref="test" class="image">
                  <img :src="theCase.caseImage">
                  <!-- <data-viz-component
                    :dimensions="dims"
                    :lobas="lobas"
                    :duration="tDuration"
                    :distance="tDistance"/> -->
                </div>
                <el-row>
                  <span id="case-name">_{{ theCase.caseName }}</span>
                  <p id="case-description">{{ theCase.caseDescription }}</p>
                </el-row>
                <el-row id="case-graph">
                  <case-card-graph :lobas="lobas" :dimensions="dims"/>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-row>
      <div v-if="revealComponents">
        <case-card-buttons id="case-buttons" :button-string="defaultString" @buy-case="buyACase" @show-details="showDetails" @mouse-enter="onMouseEnter" @mouse-leave="onMouseLeave"/>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import CaseCardMetadata from './CaseCardMetadata.vue'
import CaseCardDataViz from './CaseCardDataViz.vue'
import DataVizComponent from './DataVizComponent.vue'
import CaseCardGraph from './CaseCardGraph.vue'
import CaseCardButtons from './CaseCardButtons.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		CaseCardMetadata,
		CaseCardButtons,
		CaseCardDataViz,
		CaseCardGraph,
		DataVizComponent
	},
	props: {
		theCase: {
			required: true,
			type: Object
		},
		index: {
			type: Number,
			required: false,
			default: 0
		}
	},
	data() {
		return {
			fade: true,
			dims: {
				x: 360,
				y: 120
			},
			lobas: {},
			// lobaCounter: 0,
			tDuration: 0,
			tDistance: 0,
			defaultString: '0 ETH',
			price: 0
		}
	},
	computed: {
		revealComponents() {
			return this.$router.currentRoute.path !== '/cases/' ? false : true
		}
	},
	async mounted() {
		// props for the child components
		this.lobas = this.theCase.lobas
		this.tDuration = parseFloat(this.theCase.tDuration)
		this.tDistance = parseFloat(this.theCase.tDistance)

		// this.dims.x = this.$refs.test.offsetWidth
		// this.dims.y = this.$refs.test.offsetHeight

		console.log(
			`width is ${this.$refs.test.offsetWidth}; height is ${
				this.$refs.test.offsetHeight
			}`
		)

		this.price =
			(this.theCase.totalScore * this.tDuration * this.tDistance) / 1000
		console.log('price is ', this.price)
		this.price = this.price.toFixed(2)
		this.defaultString = `${this.price} ETH`
	},
	methods: {
		...mapActions(['buyCase']),
		showDetails() {
			this.$router.push(`/cases/${this.theCase.id}`)
		},
		buyACase() {
			console.log('yo')
			this.$router.push(`/cases/${this.theCase.id}`)
			this.buyCase(this.theCase.id)
		},
		onMouseEnter() {
			console.log('mouse entered')
			let buyString = 'Buy Case'
			let defaultString = `${this.price} ETH`
			if (this.defaultString == defaultString) {
				this.defaultString = buyString
			}
		},
		onMouseLeave() {
			console.log('mouse left')
			let defaultString = `${this.price} ETH`
			let buyString = 'Buy Case'
			if (this.defaultString == buyString) {
				this.defaultString = defaultString
			}
		}
	}
}
</script>
<style scoped>
#container {
	width: 400px;
}
.case-card {
	background-color: rgb(247, 244, 204);
	border: 2px solid black;
	height: 550px;
	width: 100%;
	margin-bottom: 8px;
}
img {
	width: 100%;
	height: 100%;
}
div.image {
	margin: 30px 0 25px 0;
	/* width: 100%; */
	height: 15rem;
	object-fit: fill;
	border: 1px solid black;
	/* background-color: black; */
}
.case-id {
	color: black;
	/* background-color: rgb(247, 244, 204); */
	font-size: 1.8rem;
	font-family: InputMonoCondensedItalic;
	/* margin-top: 10px; */
	margin-bottom: 12px;
	padding-right: 0px;
	height: 60px;
	align-items: center;
	/* border: 2px solid black; */
}
#case-class {
	background-color: black;
	color: white;
	height: 35px;
	text-align: right;
	align-items: center;
}
#case-class h4 {
	margin-top: 0px;
	font-size: 1.5rem;
	font-family: InputMonoCondensedLight;
	padding: 3px;
}
#case-name {
	font-family: InputMonoCondensed;
	font-size: 18px;
	font-weight: bold;
	word-wrap: break-word;
	hyphens: auto;
	max-height: 100%;
	color: black;
	text-transform: lowercase;
}
#case-description {
	font-family: InputMonoCondensedItalic;
	margin-top: 10px;
	word-wrap: break-word;
	hyphens: auto;
	font-size: 14px;
	height: 55px;
	color: black;
	/* border: 2px solid black; */
}
#case-graph {
	/* background-color: black; */
	height: 100px;
	margin-top: 10px;
}
#case-buttons {
	margin: 10px auto 30px auto;
}
</style>
