<template>
  <el-row type="flex" justify="center">
    <el-col :sm="22">
      <loba-loba-component :questions="qArray" :group="group" next="loba3"/>
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
				value: 'B',
				label: 'clerk'
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
