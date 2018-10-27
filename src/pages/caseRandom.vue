<template>
  <div id="all">
    <el-button plain @click="addCase">Add a random case</el-button>
    <el-button plain @click="test">Test</el-button>
    <h3 style="color:white;">ipfsHash: {{ ipfsHash }}</h3>
  </div>
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
		...mapState(['formObj', 'ipfsHash'])
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
				caseDescription: Faker.lorem.sentences(2)
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
#all {
	color: white;
}
</style>
