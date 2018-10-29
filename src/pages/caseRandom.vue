<template>
  <el-row>
    <el-col :span="8" :offset="8">
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
				caseDescription: Faker.lorem.sentences(3)
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
	border: 1px solid white;
}
.el-button {
	width: 100%;
	border-radius: 0px !important;
	font-family: InputRegular;
	font-size: 1rem;
	border: 0px;
}
.el-button:active,
.el-button:hover {
	background-color: black;
	color: white;
}
h3 {
	word-wrap: break-word;
	margin: 5px 5px 5px 5px;
	font-size: 1.2rem;
}
</style>
