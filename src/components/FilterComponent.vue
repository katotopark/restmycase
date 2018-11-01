<template>
  <el-select v-model="filterModel" clearable placeholder="Filter" @change="$emit('filter-method',)">
    <el-option v-for="item in filterData" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
  </el-select>
</template>
<script>
export default {
	props: {
		filterModel: {
			default: '',
			type: String
		},
		filterMethod: {
			required: true,
			type: Function
		},
		filterData: {
			required: true,
			type: Array
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
.el-select {
	border: 2px solid red;
}
</style>
