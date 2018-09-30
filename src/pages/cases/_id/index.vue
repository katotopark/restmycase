<template>
  <el-row >
    <el-col :span="16" :offset="4" class="container">
      <el-col id="top-left" :sm="12" :md="8">
        <el-row>
          <el-col id="image" :span="24">
            <case-card/>
          </el-col>
        </el-row>
      </el-col>
      <el-col id="top-right" :sm="12" :md="16">
        <el-row id="title">
          <el-col :span="24">
            <span>_my fuckin title</span>
          </el-col>
        </el-row>
        <el-row id="data">
          <el-col v-for="elem in 8" :key="elem.key" :span="24">
            <p><span>NAME:</span> {{ fakerContent1 }}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import CaseCard from '../../../components/CaseCard.vue'
import Faker from 'faker'

export default {
	components: {
		CaseCard
	},
	data() {
		return {
			fakerContent1: '',
			fakerContent2: ''
		}
	},
	created() {
		this.fakerContent1 = Faker.lorem.paragraph(1)
		this.fakerContent2 = Faker.lorem.paragraph(10)
	}
}
</script>
<style scoped>
.container {
	border: 1px solid white;
}
#top-left {
	min-height: 100%;
	/* margin-top: 10px; */
}
#top-right {
	margin-top: 150px;
	height: 100%;
}
#title {
	font-size: 2.5rem;
	font-weight: bold;
	color: white;
	margin-left: 5px;
	margin-bottom: 20px;
}
.el-row p {
	color: white;
	hyphens: auto;
	border-bottom: 0.5px solid white;
	margin-left: 15px;
}
p > span {
	font-size: 1.3rem;
	color: black;
	background-color: white;
}
</style>
