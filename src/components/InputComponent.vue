<template>
  <el-form :model="dataObj">
    <span v-for="(item,index) in propsArr.length" :key="item.key">
      <el-form-item v-if="inputProps[propsArr[index]].type == 'input'">
        <h2 class="input-label">_{{ propsArr[index].toUpperCase() }}</h2>
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-input
              v-model="dataObj[propsArr[index]]"
              :placeholder="propsArr[index]"
              type="textarea"
              @change="$emit('catch-input', {
                value: dataObj[propsArr[index]],
                prop: propsArr[index] })"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-else-if="inputProps[propsArr[index]].type == 'select'">
        <h2 class="input-label">_{{ propsArr[index].toUpperCase() }}</h2>
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-select
              v-model="dataObj[propsArr[index]]"
              :placeholder="propsArr[index]"
              @change="$emit('catch-select', {
                value: dataObj[propsArr[index]],
                prop: propsArr[index] })">
              <el-option v-for="item in selectOptions" :key="item.value" :value="item.value" :label="item.label"/>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </span>
  </el-form>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Object
		},
		inputProps: {
			required: true,
			type: Object
		},
		selectOptions: {
			required: false,
			default: null,
			type: Array
		}
	},
	data() {
		return {}
	},
	computed: {
		propsArr() {
			return Object.keys(this.inputProps)
		}
	},
	methods: {}
}
</script>
<style scoped>
.el-select {
	width: 100%;
}
h2.input-label {
	font-size: 1rem;
	font-family: InputMonoCondensed;
	background-color: black;
	color: white;
	width: 100%;
	padding: 0px 5px;
	margin-top: 0px;
	margin-bottom: 30px;
}
</style>
