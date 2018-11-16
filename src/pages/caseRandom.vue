<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-button plain @click="test">Mint</el-button>
      <h3>ipfsHash: {{ ipfsHash }}</h3>
      <h3>txHash: {{ txHash }}</h3>
      <h3>blockHash: {{ blockHash }}</h3>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Faker from 'faker'

export default {
	data() {
		return {
			lobas: [
				{
					id: 'Q1',
					score: 1
				},
				{
					id: 'Q2',
					score: 2
				},
				{
					id: 'Q3',
					score: 3
				}
			]
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash', 'blockHash'])
	},
	created() {},
	methods: {
		...mapActions([
			'setLobas',
			'describeCase',
			'randomNum',
			'mintCase',
			'getCaseHash',
			'caseHashToData',
			'getUsersCases',
			'mintComposed'
		]),
		addCase() {
			this.randomNum()

			this.describeCase({
				caseName: Faker.lorem.word(),
				caseDescription: Faker.lorem.sentences(3),
				imageData: Faker.image.image()
			})

			this.lobas.forEach(item => {
				this.setLobas({ id: item.id, score: item.score })
			})

			console.log(this.formObj)
			this.mintCase()
		},
		test() {
			this.randomNum()

			this.describeCase({
				caseName: Faker.lorem.word(),
				caseDescription: Faker.lorem.sentences(1)
				// caseImage: Faker.image.abstract()
			})

			this.lobas.forEach(item => {
				this.setLobas({ id: item.id, score: item.score })
			})

			this.mintComposed()
		}
	}
}
</script>
<style scoped>
.el-col {
	border: 2px solid black;
}
.el-button {
	width: 100%;
	border-radius: 0px !important;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	border: 0px;
	background-color: rgb(247, 244, 204);
	color: black;
}

.el-button:hover {
	background-color: black;
	color: white;
	font-family: InputMonoCondensedItalic;
	border: 0px;
}
.el-button:focus {
	color: black;
	background-color: rgb(247, 244, 204);
	font-family: InputMonoCondensed;
}
/* .el-button:active {
	color: black;
	background-color: rgb(247, 244, 204);
} */

h3 {
	word-wrap: break-word;
	margin: 5px 5px 5px 5px;
	font-size: 1.2rem;
	font-family: InputMonoCondensedLight;
}
</style>
