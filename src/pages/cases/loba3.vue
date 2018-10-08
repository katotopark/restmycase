<template>
  <div>
    <loba-loba-component :questions="qArray" :group="group" next="caseNaming"/>
  </div>
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
				label: 'individual'
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
		...mapActions([
			'setQuestions',
			'formatLobaQuestions',
			'composeLobaQuestions'
		])
	}
}
</script>
<style scoped>
</style>
