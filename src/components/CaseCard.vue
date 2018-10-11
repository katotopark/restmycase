<template>
  <el-row >
    <el-col :span="24">
      <el-row v-if="revealComponents">
        <el-col id="case-id" :span="12" :offset="6">
          <span>#{{ theCase.id }}</span>
        </el-col>
      </el-row>
      <el-row class="case-card">
        <el-col>
          <el-col id="case-img" :span="20" :offset="2">
            <el-row>
              <el-col :span="24">
                <!--@mouseenter="fade=true" @mouseleave="fade=false"-->
                <div class="image" >
                  <img v-if="!fade" src="https://www.solidbackgrounds.com/images/2880x1800/2880x1800-tiffany-blue-solid-color-background.jpg">
                  <!-- <case-card-metadata :show-metadata="revealMetadata" :fade="fade" /> -->
                </div>
              </el-col>
            </el-row>
            <span id="case-name">_{{ theCase.caseName }}</span>
            <p id="case-description">{{ theCase.caseDescription }}</p>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <case-card-buttons id="case-buttons" :show-buttons="revealComponents" @show-details="showDetails"/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import Faker from 'faker'
import CaseCardMetadata from './CaseCardMetadata.vue'
// import CaseCardVisual from './CaseCardDataVisual.vue'
import CaseCardButtons from './CaseCardButtons.vue'

export default {
	components: {
		CaseCardMetadata,
		CaseCardButtons
	},
	props: {
		theCase: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			fakerImg: null,
			fade: true
		}
	},
	computed: {
		revealComponents() {
			return this.$router.currentRoute.path !== '/cases/' ? false : true
		}
	},
	created() {
		this.fakerImg = Faker.image.abstract()
		console.log(this.$router.currentRoute.path)
	},
	methods: {
		showDetails() {
			this.$router.push(`/cases/${this.theCase.id}`)
		}
	}
}
</script>
<style scoped>
.el-row.case-card {
	background-color: rgb(244, 243, 234);
	max-height: 500px;
	max-width: 500px;
	min-width: 200px;
}
img {
	width: 100%;
	height: 100%;
}
div.image {
	margin: 20px 0 20px 0;
	width: 100%;
	height: 15rem;
	object-fit: fill;
	border: 0.1rem solid black;
	/* background-color: black; */
}
#case-id {
	color: white;
	font-size: 1.2rem;
	margin-top: 10px;
	margin-bottom: 5px;
}
#case-name {
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
#case-buttons {
	margin: 10px auto 20px auto;
}
</style>
