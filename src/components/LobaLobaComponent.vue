<template>
  <el-col id="container" :span="12" :offset="6">
    <h3>{{ group.value }}</h3>
    <error-component :err-arr="errors"/>
    <loba-component v-for="(elem, i) in lobaObj" :key="elem.key" :data-obj="elem" @catch-input="(e) => onCatchInput(e,i)"/>
    <el-row>
      <el-col :span="24">
        <el-button @click="onSubmit">Next</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import LobaComponent from './LobaComponent.vue'
import ErrorComponent from './ErrorComponent.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		LobaComponent,
		ErrorComponent
	},
	props: {
		questions: {
			required: true,
			type: Array
		},
		next: {
			required: true,
			type: String
		},
		group: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			lobaObj: [],
			errors: []
		}
	},
	computed: {
		...mapState(['formObj'])
	},
	created() {
		this.lobaObj = this.questions.map((item, index) => {
			let output = {}
			output['group'] = item.group
			output['value'] = item.value
			output['voteCount'] = item.voteCount
			output['id'] = `Q${index + 1}`
			output['score'] = 0
			output['rated'] = false

			return output
		})
	},
	methods: {
		...mapActions(['setLobas', 'setQuestions']),
		onCatchInput(e, i) {
			this.lobaObj[i].rated = true
			console.log(
				`G${this.lobaObj[i].group}_${this.lobaObj[i].id}: ${
					this.lobaObj[i].score
				}`
			)
		},
		onSubmit() {
			this.checkForm()
			if (this.errors.length === 0) {
				this.lobaObj.forEach(item => {
					this.setLobas({
						group: item.group,
						id: item.id,
						score: item.score
					})
				})
				console.log(this.formObj.lobas)
				this.$router.push(this.next)
			}
		},
		checkForm() {
			this.errors = []
			this.lobaObj.forEach(item => {
				if (!item.rated || item.score == 0) {
					this.errors.push(`Answer ${item.id}!`)
				}
			})
		}
	}
}
</script>
<style scoped>
h3 {
	color: black;
	background-color: white;
	font-size: 2rem;
	text-align: right;
	border-bottom: 1px solid white;
	margin-top: 0px;
	margin-bottom: 5px;
	padding-right: 5px;
}
.el-col#container {
	border: 1px solid white;
}
.el-button {
	border-radius: 0px;
	width: 100%;
	font-family: inherit;
	font-size: 1rem;
}
.el-button:hover,
.el-button:focus {
	background: black;
	color: white;
}
</style>
