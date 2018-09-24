<template>
  <div>
    <el-row style="margin:20px 0;">
      <el-col :span="12" :offset="6">
        <p>{{ msg }}</p>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"/>
    <el-row >
      <el-col :span="12" :offset="6" class="case-card">
        <el-col id="case-img" :span="20" :offset="2">
          <img :src="fakerImg">
        </el-col>
        <el-col id="case-name" :span="12" :offset="2">
          <span>hi</span>
        </el-col>
        <el-col id="case-description" :span="20" :offset="2" style="max-height: 100px">
          <p>{{ fakerDescription }}</p>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Faker from 'faker'

export default {
	data() {
		return {
			msg: `Yo, Congrats! You've successfully minted your case!`,
			fakerImg: null,
			fakerDescription: ''
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash'])
	},
	created() {
		this.fakerImg = Faker.image.abstract()
		this.fakerDescription = Faker.lorem.text()
	}
}
</script>
<style scoped>
.el-col {
	/* border: 1px solid black; */
}
.case-card {
	background-color: rgb(223, 223, 223);
	height: 360px;
}
#case-img {
	margin-top: 30px;
	height: 10rem;
	border: 2px solid black;
}
img {
	width: 100%;
	max-height: 100%;
	object-fit: fill;
}
#case-description,
#case-name {
	margin-top: 20px;
	border-bottom: 1px solid black;
	word-wrap: break-word;
	max-width: 100%;
	max-height: 100%;
}
</style>
