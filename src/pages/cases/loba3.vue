<template>
  <div>
    <loba-loba-component :questions="qArray" next="caseNaming"/>
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
			qArray: []
		}
	},
	computed: {
		...mapState(['questionsArray']),
		...mapGetters(['getQuestionsByGroup'])
	},
	created() {
		this.setLobaQuestions()
		this.qArray = this.getQuestionsByGroup('C')
	},
	methods: {
		...mapActions(['setLobaQuestions'])
	}
}
</script>
<style scoped>
</style>
