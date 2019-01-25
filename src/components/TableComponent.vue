<template>
  <el-row>
    <el-row v-if="filterObj">
      <el-select
        v-model="filterObj.value"
        placeholder="Filter"
        @change="$emit('handle-filter', filterObj.value)">
        <el-option
          v-for="filter in filterObj.options"
          :key="filter.value"
          :label="filter.label"
          :value="filter.value"/>
      </el-select>
    </el-row>
    <el-table :data="dataObj">
      <el-table-column label="#" type="index" width="40"/>
      <el-table-column
        v-for="prop in propsArr"
        :key="prop.key"
        :prop="prop"
        :label="prop.toUpperCase()"/>
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
  </el-row>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Array
		},
		filterObj: {
			required: false,
			default: null,
			type: Object
		}
	},
	data() {
		return {}
	},
	computed: {
		propsArr() {
			let props = this.dataObj.map(p => {
				return Object.keys(p).filter(k => k !== 'description')
			})
			// prop count check
			for (let i in props) {
				let currentLength = props[i].length
				for (let j = 1; j < props.length; j++) {
					let nextLength = props[j].length
					if (nextLength == currentLength) return props[i]
					else if (nextLength !== currentLength) return props[j]
				}
			}
		}
	}
}
</script>
<style scoped>
.el-row:nth-of-type(1) {
	margin-top: 40px;
}
.el-select {
	width: 100%;
	margin-bottom: 20px;
}
.el-table {
	border: 2px solid black;
}
.el-button {
	font-family: inherit;
	color: inherit;
}
</style>
