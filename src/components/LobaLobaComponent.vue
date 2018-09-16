<template>
  <el-col :span="12" :offset="6">
    <loba-component v-for="(elem, i) in lobaObj" :key="elem.key" :data-obj="elem" @catch-input="(e) => onCatchInput(e,i)"/>
    <el-button plain @click="onSubmit">Submit!</el-button>
    <ul>
      <li v-for="err in errors" :key="err.key">{{ err }}</li>
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
			output['group'] = `D${index + 1}`
			output['title'] = `${item.value}?`
			output['id'] = item.id
			output['rated'] = false
			return output
		})
	},
	methods: {
		...mapActions(['setLobas']),
		onCatchInput(e, i) {
			this.lobaObj[i].rated = true
			console.log(e, this.lobaObj[i])
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
.el-col {
	border: 2px solid black;
}
.el-button {
	border-radius: 0px;
}
</style>
