<template>
  <div>
    <loba-loba-component :questions="qArray" :group="group" next="loba3"/>
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
		this.setLobaQuestions()
		this.formatLobaQuestions()
		this.qArray = this.getQuestionsByGroup(this.group.value)
	},
	methods: {
		...mapActions(['setLobaQuestions', 'formatLobaQuestions'])
	}
}
</script>
<style scoped>
</style>
