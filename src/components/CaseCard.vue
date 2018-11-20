<template>
  <el-row type="flex" justify="center">
    <el-col id="container">
      <div v-if="revealComponents">
        <el-row id="case-id" type="flex" justify="center">
          <h3>#{{ theCase.id }}</h3>
        </el-row>
        <el-row type="flex" justify="end" >
          <el-col id="case-class" :span="24">
            <h4>C.{{ theCase.id }}</h4>
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
                </div>
                <el-row>
                  <span id="case-name">_{{ theCase.caseName }}</span>
                  <p id="case-description">{{ theCase.caseDescription }}</p>
                </el-row>
                <el-row id="case-graph">
                  <case-card-graph style="color: black;"/>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-row>
      <div v-if="revealComponents">
        <case-card-buttons id="case-buttons" @buy-case="buyACase" @show-details="showDetails"/>
      </div>
    </el-col>
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
#container {
	width: 400px;
}
.case-card {
	background-color: rgb(247, 244, 204);
	border: 2px solid black;
	height: 500px;
	width: 100%;
	margin-bottom: 8px;
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
	border: 2px solid black;
	/* background-color: black; */
}
#case-id {
	color: black;
	/* background-color: rgb(247, 244, 204); */
	font-size: 1.4rem;
	font-family: InputMonoCondensedLightItalic;
	/* margin-top: 10px; */
	margin-bottom: 8px;
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
}
#case-description {
	font-family: InputMonoCondensedItalic;
	margin-top: 10px;
	word-wrap: break-word;
	hyphens: auto;
	font-size: 14px;
	max-height: 100%;
	color: black;
}
#case-graph {
	background-color: black;
	height: 100px;
	margin-top: 10px;
}
#case-buttons {
	margin: 0px auto 30px auto;
}
</style>
