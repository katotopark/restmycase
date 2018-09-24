<template>
  <el-col :xs="20" :sm="10" :md="8" class="case-card">
    <el-col id="case-img" :span="20" :offset="2">
      <img :src="fakerImg">
      <span id="case-name">_{{ fakerName }}</span>
      <p id="case-description">{{ fakerDescription }}</p>
    </el-col>
  </el-col>
</template>
<script>
import Faker from 'faker'
export default {
	data() {
		return {
			fakerImg: null,
			fakerName: '',
			fakerDescription: ''
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
	border: 0.5rem solid black;
	/* border-style: dashed; */
	height: 400px;
	max-width: 400px;
	color: black;
	margin: 20px 20px;
}

img {
	margin: 20px 0 20px 0;
	width: 100%;
	max-height: 15rem;
	object-fit: fill;
	border: 0.2rem solid black;
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
	/* font-family: 'Heebo', sans-serif; */
	/* font-style: italic; */
	font-weight: bold;
	word-wrap: break-word;
	hyphens: auto;
	max-height: 100%;
}
</style>
