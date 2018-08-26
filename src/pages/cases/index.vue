<template>
  <el-form :label-position="labelPosition" :model="formObj" label-width="100px">
    <el-form-item>
      <el-button @click="getAllCases">show cases!</el-button>
      <el-button @click="getTransactions">show transactions!</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			labelPosition: 'right'
		}
	},
	computed: {
		...mapState(['formObj'])
	},
	methods: {
		...mapActions(['getAllCases', 'getTransactions'])
	}
}
</script>
<style scoped>
</style>
