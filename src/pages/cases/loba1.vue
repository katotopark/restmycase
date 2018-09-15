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
					id: 'q1',
					value: 'aah?'
				},
				{
					id: 'q2',
					value: 'yiyo?'
				},
				{
					id: 'q3',
					value: 'asd?'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
