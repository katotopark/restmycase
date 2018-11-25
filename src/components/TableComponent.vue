<template>
  <el-table id="container" :data="dataObj" @cell-mouse-enter="mouseEnter" @cell-mouse-leave="mouseLeave">
    <el-table-column label="#" width="40" type="index"/>
    <el-table-column v-for="item in propsArr" :label="item.value.toUpperCase()" :key="item.key" :prop="item.value" :width="item.width"/>
    <el-table-column
      fixed="right"
      label="VOTE"
      width="60">
      <template slot-scope="scope">
        <el-button type="text" @click="$emit('handle-click', scope.$index)">
          <i class="el-icon-plus"/>
        </el-button>
      </template>
    </el-table-column>
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
		return {
			styleTest: {}
		}
	},
	methods: {
		mouseEnter(row) {
			console.log('mouse entered: ', row)
		},
		mouseLeave(row) {
			console.log('mouse left: ', row)
		}
	}
}
</script>
<style scoped>
.el-table {
	font-family: inherit;
	color: black;
}
#container {
	border: 2px solid black;
}
.el-button {
	font-family: inherit;
	color: inherit;
}
</style>
