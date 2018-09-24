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
					value: 'Recommend'
				},
				{
					id: 'Q8',
					value: 'Never again'
				},
				{
					id: 'Q9',
					value: 'Shook'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
