<template>
  <el-row type="flex" justify="center">
    <el-col :sm="22">
      <loba-loba-component :questions="qArray" :group="group" next="caseNaming"/>
    </el-col>
  </el-row>
</template>
<script>
import LobaLobaComponent from '../../components/LobaLobaComponent.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		LobaLobaComponent
	},
	data() {
		return {
			qArray: [],
			group: {
				value: 'C',
				label: 'administered'
			}
		}
	},
	computed: {
		...mapState(['questionsArray']),
		...mapGetters(['getQuestionsByGroup'])
	},
	created() {
		this.setQuestions()
		this.formatLobaQuestions()
		this.qArray = this.getQuestionsByGroup(this.group.value)
	},
	methods: {
		...mapActions(['setQuestions', 'formatLobaQuestions'])
	}
}
</script>
<style scoped>
</style>
