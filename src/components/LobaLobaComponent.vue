<template>
  <el-col :span="12" :offset="6">
    <h3>{{ group.value }}</h3>
    <loba-component v-for="(elem, i) in lobaObj" :key="elem.key" :data-obj="elem" @catch-input="(e) => onCatchInput(e,i)"/>
    <el-button plain @click="onSubmit">Submit!</el-button>
    <ul>
      <li v-for="err in errors" :key="err.key" style="color: white;">{{ err }}</li>
    </ul>
  </el-col>
</template>
<script>
import LobaComponent from './LobaComponent.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		LobaComponent
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
			output['rated'] = false

			return output
		})
		// console.log(this.lobaObj)
	},
	methods: {
		...mapActions(['setLobas', 'setLobaQuestions']),
		onCatchInput(e, i) {
			this.lobaObj[i].rated = true
			console.log(`${this.lobaObj[i].value}: ${this.lobaObj[i].score}`)
		},
		onSubmit() {
			this.checkForm()
			if (this.errors.length === 0) {
				this.lobaObj.forEach(item => {
					this.setLobas({ id: item.id, score: item.score })
				})
				this.$router.push(this.next)
			}
			console.log('loba submitted!')
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
}
.el-col {
	border: 1px solid white;
}
.el-button {
	border-radius: 0px;
}
</style>
