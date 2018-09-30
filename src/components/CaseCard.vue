<template>
  <el-row>
    <el-row>
      <el-col class="case-card">
        <el-col id="case-img" :span="20" :offset="2">
          <el-row>
            <el-col :span="24">
              <div class="image" @mouseenter="fade=true" @mouseleave="fade=false">
                <img v-if="!fade" src="https://www.solidbackgrounds.com/images/2880x1800/2880x1800-tiffany-blue-solid-color-background.jpg">
                <case-card-metadata :show-metadata="revealMetadata" :fade="fade"/>
              </div>
            </el-col>
          </el-row>
          <span id="case-name">_{{ fakerName }}</span>
          <p id="case-description">{{ fakerDescription }}</p>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="0">
        <case-card-buttons :show-buttons="revealButtons" @show-details="showDetails"/>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import Faker from 'faker'
import CaseCardMetadata from './CaseCardMetadata.vue'
// import CaseCardDataVisual from './CaseCardDataVisual.vue'
import CaseCardButtons from './CaseCardButtons.vue'

export default {
	components: {
		CaseCardMetadata,
		CaseCardButtons
	},
	data() {
		return {
			fakerImg: null,
			fakerName: '',
			fakerDescription: '',
			fakerId: 0,
			fade: false
		}
	},
	computed: {
		revealButtons() {
			return this.$router.currentRoute.path !== '/cases/' ? false : true
		},
		revealMetadata() {
			return this.$router.currentRoute.path !== '/cases/' ? false : true
		}
	},
	created() {
		this.fakerImg = Faker.image.abstract()
		this.fakerName = Faker.random.words()
		this.fakerDescription = Faker.lorem.sentence()
		this.fakerId = Faker.random.number(100)
	},
	methods: {
		showDetails() {
			this.$router.push(`${this.fakerId}`)
		}
	}
}
</script>
<style scoped>
.case-card {
	background-color: rgb(244, 243, 234);
	height: 100%;
	max-width: 400px;
	min-width: 200px;
	color: black;
	/* margin: 20px 20px; */
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
#case-description {
	margin-top: 10px;
	word-wrap: break-word;
	hyphens: auto;
	font-size: 14px;
	max-height: 100%;
}
#case-name {
	font-size: 18px;
	font-weight: bold;
	word-wrap: break-word;
	hyphens: auto;
	max-height: 100%;
}
</style>
