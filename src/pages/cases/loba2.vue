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
					id: 'q4',
					value: 'sagshg?'
				},
				{
					id: 'q5',
					value: 'sjdklsadbnamjdkl?'
				},
				{
					id: 'q6',
					value: 'hasdhsahdashdjkssahaskjd?'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
