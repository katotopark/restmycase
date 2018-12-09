<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <loba-loba-component :questions="qArray" :group="group" next="loba2"/>
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
				value: 'A',
				label: 'space'
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

		if (process.client) {
			/*if (typeof JASON !== 'undefined') {
				JASON.call({
					type: '$util.alert',
					options: { title: 'alert', description: 'this is an alert' }
				})
			}*/
		}
	},
	methods: {
		...mapActions(['setQuestions', 'formatLobaQuestions'])
	}
}
</script>
<style scoped>
</style>
