<template>
  <div>
    <loba-loba-component :questions="qArray" next="loba2"/>
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
		this.qArray = this.getQuestionsByGroup('A')
	},
	methods: {
		...mapActions(['setLobaQuestions'])
	}
}
</script>
<style scoped>
</style>
