<template>
  <div>
    <loba-loba-component :questions="qArray" next="loba2"/>
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
					id: 'Q1',
					value: 'Commute/Access to the building'
				},
				{
					id: 'Q2',
					value: 'Interactivity within the space'
				},
				{
					id: 'Q3',
					value: 'Interior space'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
