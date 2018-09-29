<template>
  <el-row>
    <el-form :model="dataObj">
      <el-row>
        <el-col :span="24">
          <el-form-item label="">
            <el-input v-model="dataObj.title" type="textarea" placeholder="title" @change="$emit('catch-input', dataObj.title)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item size="large" label="">
            <el-select v-model="dataObj.group" style="width: 100%" placeholder="group" @change="$emit('catch-group', dataObj.group)">
              <el-option v-for="item in groupOptions" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button type="submit" size="mini" @click="$emit('submit')" >Submit</el-button>
            <el-button type="submit" size="mini" @click="$emit('clear')" >Clear</el-button>
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
		groupOptions: {
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
.el-button {
	font-family: inherit;
	font-size: 0.85rem;
	margin-top: 0.1rem;
	border-radius: 0px;
}
</style>
