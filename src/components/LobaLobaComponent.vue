<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <error-component :err-arr="errors"/>
    </el-col>
    <el-row>
      <el-col id="container" :span="22" :offset="1">
        <h3>{{ group.value }}</h3>
        <loba-component v-for="(elem, i) in lobaObj" id="loba-component" :key="elem.key" :data-obj="elem" @catch-input="(e) => onCatchInput(e,i)"/>
        <!-- <loba-component v-for="(elem, i) in lobaObj" id="loba-component" :key="elem.key" :data-obj="elem" @handle-click="(e)=> onCatchInput(e,i)"/> -->
        <el-row id="button">
          <el-col :span="24">
            <el-button @click="onSubmit">Next</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
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
			score: 0,
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
			output['description'] = item.description
			output['id'] = `Q${index + 1}`
			output['score'] = 0
			output['rated'] = false

			return output
		})
	},
	methods: {
		...mapActions(['setLobas', 'setQuestions', 'updateScore']),
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
				this.lobaObj.forEach(item => {
					this.updateScore(Number(item.score))
				})
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
.el-row:nth-of-type(1) {
	margin-top: 40px;
}
.el-row#button {
	margin-top: 0px;
}
h3 {
	color: white;
	background-color: black;
	font-size: 2rem;
	text-align: right;
	border-bottom: 1px solid black;
	margin-top: 0px;
	margin-bottom: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
	padding-top: 5px;
}
.el-col#container {
	border: 2px solid black;
}
.el-button {
	border-radius: 0px;
	border: 0px;
	width: 100%;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	height: 4rem;
	background-color: rgb(247, 244, 204);
	color: black;
}
.el-button:hover {
	background-color: black;
	color: white;
	border: 0px;
	font-family: InputMonoCondensedItalic;
}
</style>
