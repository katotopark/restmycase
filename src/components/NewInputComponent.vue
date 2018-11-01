<template>
  <el-row>
    <el-form :model="dataObj">
      <el-row>
        <el-col :span="24">
          <el-form-item label="">
            <span class="input-label">_{{ inputProps.inputA.toUpperCase() }}:</span>
            <el-input v-model="dataObj[inputProps.inputA]" :placeholder="inputProps.inputA" type="textarea" @change="$emit('catch-input-a', dataObj[inputProps.inputA])"/>
          </el-form-item>
          <span v-if="routePath">
            <el-form-item label="">
              <span class="input-label">_{{ inputProps.inputB.toUpperCase() }}:</span>
              <el-input v-model="dataObj[inputProps.inputB]" :placeholder="inputProps.inputB" type="textarea" @change="$emit('catch-input-b', dataObj[inputProps.inputB])"/>
            </el-form-item>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item size="large" label="">
            <span class="input-label">_{{ inputProps.select.toUpperCase() }}:</span>
            <el-select v-model="dataObj[inputProps.select]" :placeholder="inputProps.select" style="width: 100%" clearable @change="$emit('catch-select', dataObj[inputProps.select])">
              <el-option v-for="item in selectOptions" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-col :span="12">
              <el-button type="submit" size="mini" @click="$emit('submit')" >Submit</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="submit" size="mini" @click="$emit('clear')" >Clear</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Object
		},
		selectOptions: {
			required: true,
			type: Array
		},
		inputProps: {
			required: true,
			type: Object
		}
	},
	data() {
		return {}
	},
	computed: {
		routePath() {
			return this.$router.currentRoute.path == '/alp' ? true : false
		}
	}
}
</script>
<style scoped>
.el-button {
	font-family: inherit;
	font-size: 1rem;
	margin-top: 0.1rem;
	border-radius: 0px;
	width: 100%;
	border: 0px;
}
.el-button:hover {
	background-color: black;
	color: white;
}
.input-label {
	font-size: 1.1rem;
	font-family: InputRegular;
	background-color: white;
	color: black;
	padding: 5px;
}
</style>
