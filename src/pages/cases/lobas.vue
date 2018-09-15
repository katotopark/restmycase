<template>
  <div>
    <loba-test v-for="(elem,i) in myObj" :key="elem.key" :data-obj="myObj[i]" @catch-input="(e) => onCatchInput(e,i)"/>
    <el-button type="info" icon="el-icon-check" circle @click="onSubmit"/>
    <ul>
      <li v-for="err in errors" :key="err.key">{{ err }}</li>
    </ul>
  </div>
</template>
<script>
import LobaTest from '../../components/LobaComponent.vue'
import { mapState } from 'vuex'

export default {
	components: {
		LobaTest
	},
	data() {
		return {
			myObj: [],
			qArr: [['q1', 'q2', 'q3'], ['q4', 'q5', 'q6'], ['q7', 'q8', 'q9']],
			errors: []
		}
	},
	computed: {
		...mapState(['formObj']),
		mapProps() {
			const dataArr = []
			this.qArr.map((item, index) => {
				const holdIt = item.map(el => {
					let output = {}
					output['group'] = `D${index + 1}`
					output['title'] = el
					output['rated'] = false
					dataArr.push(output)
				})
				return holdIt
			})
			return dataArr
		}
	},
	created() {
		this.myObj = this.mapProps
	},
	methods: {
		onCatchInput(e, i) {
			this.myObj[i].rated = true
			console.log(e, this.myObj)
		},
		onSubmit() {
			this.checkForm()
			if (this.errors.length === 0) {
				this.$router.push('caseNaming')
			}
			console.log('submit!')
		},
		checkForm() {
			this.errors = []
			this.myObj.forEach(el => {
				if (!el.rated || el.score == 0) {
					this.errors.push(`Please answer ${el.title}`)
				}
			})
		}
	}
}
</script>
<style scoped>
</style>
