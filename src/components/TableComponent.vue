<template>
  <el-table :data="dataObj">
    <el-table-column label="#" width="40" type="index"/>
    <el-table-column v-for="item in propsArr" :label="item.value" :key="item.key" :prop="item.value" :width="item.width"/>
  </el-table>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Array
		},
		propsArr: {
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
.el-table {
	font-family: inherit;
	color: black;
}
</style>
