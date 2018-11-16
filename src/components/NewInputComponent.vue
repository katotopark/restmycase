<template>
  <el-row>
    <el-form :model="dataObj">
      <div class="container">
        <el-row>
          <h2 class="input-label">_{{ inputProps.inputA.toUpperCase() }}</h2>
        </el-row>
        <el-row :gutter="10" class="input-text">
          <el-col :span="22" :offset="1">
            <el-form-item>
              <el-input v-model="dataObj[inputProps.inputA]" :placeholder="inputProps.inputA" type="textarea" @change="$emit('catch-input-a', dataObj[inputProps.inputA])"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="routePath">
          <h2 class="input-label">_{{ inputProps.inputB.toUpperCase() }}</h2>
        </el-row>
        <el-row v-if="routePath" :gutter="10">
          <el-col :span="22" :offset="1">
            <el-form-item>
              <el-input v-model="dataObj[inputProps.inputB]" :placeholder="inputProps.inputB" type="textarea" @change="$emit('catch-input-b', dataObj[inputProps.inputB])"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h2 class="input-label">_{{ inputProps.select.toUpperCase() }}</h2>
        </el-row>
        <el-row :gutter="10" class="input-text">
          <el-col :span="22" :offset="1">
            <el-form-item size="large" label="">
              <el-select v-model="dataObj[inputProps.select]" :placeholder="inputProps.select" style="width: 100%;" clearable @change="$emit('catch-select', dataObj[inputProps.select])">
                <el-option v-for="item in selectOptions" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-form-item>
          <el-col :span="12">
            <el-button type="submit" size="mini" @click="$emit('submit')" >Submit</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="submit" size="mini" @click="$emit('clear')" >Clear</el-button>
          </el-col>
        </el-form-item>
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
.el-option {
	background-color: green;
}
.container {
	border: 2px solid black;
	height: 100%;
	margin-bottom: 10px;
}
.input-text {
	/* border-bottom: 2px solid black; */
	/* margin-bottom: 5px; */
}
.el-button {
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	margin-top: 0.1rem;
	border-radius: 0px;
	width: 100%;
	height: 4rem;
	border: 0px;
	background-color: rgb(247, 244, 209);
	color: black;
	border: 2px solid black;
}
.el-button:hover {
	background-color: black;
	color: white;
	font-family: InputMonoCondensedItalic;
}
.el-button:visited {
	color: black;
	background-color: rgb(247, 244, 209);
	font-family: InputMonoCondensed;
}
.input-label {
	font-size: 1.1rem;
	font-family: InputMonoCondensed;
	background-color: black;
	color: white;
	width: 100%;
	padding: 5px 5px;
	margin-top: 0px;
	margin-bottom: 15px;
	/* border: 2px solid red; */
}
</style>
