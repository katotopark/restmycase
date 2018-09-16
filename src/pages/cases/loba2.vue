<template>
  <div>
    <loba-loba-component :questions="qArray" next="loba3"/>
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
					id: 'Q4',
					value: 'Helpful'
				},
				{
					id: 'Q5',
					value: 'Competent'
				},
				{
					id: 'Q6',
					value: 'Suave'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
