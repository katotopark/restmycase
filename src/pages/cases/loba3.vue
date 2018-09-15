<template>
  <div>
    <loba-loba-component :questions="qArray" next="caseNaming"/>
  </div>
</template>
<script>
import LobaLobaComponent from '../../components/LobaLobaComponent.vue'

export default {
	components: {
		LobaLobaComponent
	},
	data() {
		return {
			qArray: [
				{
					id: 'q7',
					value: 'nlkdasjdlkjdasjlajdk?'
				},
				{
					id: 'q8',
					value: 'sjdklsjdkl?'
				},
				{
					id: 'q9',
					value: 'hasdhsahaskjd?'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
