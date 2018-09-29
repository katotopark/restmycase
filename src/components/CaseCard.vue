<template>
  <el-col :xs="20" :sm="10" :md="8" class="case-card">
    <el-col id="case-img" :span="20" :offset="2">
      <el-row>
        <el-col :span="24">
          <div class="image" @mouseenter="show=true" @mouseleave="show=false">
            <img v-if="!show" src="https://www.solidbackgrounds.com/images/2880x1800/2880x1800-tiffany-blue-solid-color-background.jpg">
            <meta-data-card :show="show"/>
          </div>
        </el-col>
      </el-row>
      <span id="case-name">_{{ fakerName }}</span>
      <p id="case-description">{{ fakerDescription }}</p>
    </el-col>
  </el-col>
</template>
<script>
import Faker from 'faker'
import MetaDataCard from './MetaDataCard.vue'

export default {
	components: {
		MetaDataCard
	},
	data() {
		return {
			fakerImg: null,
			fakerName: '',
			fakerDescription: '',
			show: false
		}
	},
	created() {
		this.fakerImg = Faker.image.abstract()
		this.fakerName = Faker.random.words()
		this.fakerDescription = Faker.lorem.sentence()
	}
}
</script>
<style scoped>
.case-card {
	background-color: rgb(244, 243, 234);
	height: 400px;
	max-width: 400px;
	color: black;
	margin: 20px 20px;
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
