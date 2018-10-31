<template>
  <el-table :data="dataObj">
    <el-table-column label="#" width="40" type="index"/>
    <el-table-column v-for="item in propsArr" :label="item.value.toUpperCase()" :key="item.key" :prop="item.value" :width="item.width"/>
    <span v-if="voteable">
      <el-table-column
        fixed="right"
        label="VOTE"
        width="60">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="$emit('handle-click', scope.$index)">
            <i class="el-icon-plus"/>
          </el-button>
        </template>
      </el-table-column>
    </span>
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
		},
		voteable: {
			required: true,
			type: Boolean
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
.el-button {
	font-family: inherit;
	color: inherit;
}
</style>
