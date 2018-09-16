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
					id: 'Q7',
					value: 'nlkdasjdlkjdasjlajdk'
				},
				{
					id: 'Q8',
					value: 'sjdklsjdkl'
				},
				{
					id: 'Q9',
					value: 'hasdhsahaskjd'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
