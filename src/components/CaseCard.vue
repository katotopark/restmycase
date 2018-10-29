<template>
  <el-row style="border: 2px solid red;">
    <el-row v-if="revealComponents" id="case-id">
      <h3>#{{ theCase.id }}</h3>
    </el-row>
    <el-row class="case-card">
      <el-col id="case-img" :span="20" :offset="2">
        <el-row>
          <!--@mouseenter="fade=true" @mouseleave="fade=false"-->
          <div ref="test" class="image">
            <!-- <case-card-metadata :the-case="theCase"/> -->
            <img :src="theCase.caseImage">
          </div>
        </el-row>
        <el-row>
          <span id="case-name">_{{ theCase.caseName }}</span>
          <p id="case-description">{{ theCase.caseDescription }}</p>
        </el-row>
        <el-row id="case-graph">
          <case-card-graph style="color: black;"/>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <case-card-buttons id="case-buttons" :show-buttons="revealComponents" @buy-case="buyACase" @show-details="showDetails"/>
    </el-row>
  </el-row>
</template>
<script>
import CaseCardMetadata from './CaseCardMetadata.vue'
import CaseCardDataViz from './CaseCardDataViz.vue'
import CaseCardGraph from './CaseCardGraph.vue'
import CaseCardButtons from './CaseCardButtons.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		CaseCardMetadata,
		CaseCardButtons,
		CaseCardDataViz,
		CaseCardGraph
	},
	props: {
		theCase: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			fade: true,
			dims: {}
		}
	},
	computed: {
		revealComponents() {
			return this.$router.currentRoute.path !== '/cases/' ? false : true
		}
	},
	created() {
		console.log(this.$router.currentRoute.path)
	},
	mounted() {
		this.dims.x = this.$refs.test.offsetWidth
		this.dims.y = this.$refs.test.offsetHeight
	},
	methods: {
		...mapActions(['buyCase']),
		showDetails() {
			this.$router.push(`/cases/${this.theCase.id}`)
		},
		buyACase() {
			console.log('yo')
			this.buyCase(this.theCase.id)
		}
	}
}
</script>
<style scoped>
.el-row.case-card {
	background-color: rgb(244, 243, 234);
	height: 500px;
	width: 400px;
	min-width: 200px;
	margin-bottom: 10px;
}
img {
	width: 100%;
	height: 100%;
}
div.image {
	margin: 20px 0 20px 0;
	/* width: 100%; */
	height: 15rem;
	object-fit: fill;
	/* border: 0.1rem solid black; */
	/* background-color: black; */
}
#case-id {
	color: white;
	font-size: 1.2rem;
	margin-top: 10px;
	margin-bottom: 5px;
}
#case-name {
	font-family: InputRegular;
	font-size: 18px;
	font-weight: bold;
	word-wrap: break-word;
	hyphens: auto;
	max-height: 100%;
	color: black;
}
#case-description {
	margin-top: 10px;
	word-wrap: break-word;
	hyphens: auto;
	font-size: 14px;
	max-height: 100%;
	color: black;
}
#case-graph {
	background-color: rgb(75, 111, 158);
	height: 100px;
	margin-top: 15px;
}
#case-buttons {
	margin: 10px auto 20px auto;
}
</style>
