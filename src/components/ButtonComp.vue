<template>
  <el-col :span="22" :offset="1">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col
        v-for="(button,index) in labels"
        :span="(24/labels.length)"
        :key="button.key">
        <el-button
          @click="$emit('handle-click', { value: button, id: index})">{{ button }}</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
export default {
	props: {
		labels: {
			required: true,
			type: Array
		}
	},
	data() {
		return {}
	},
	methods: {}
}
</script>
<style scoped>
.el-button {
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	margin-top: 0.1rem;
	margin-left: 0px;
	border-radius: 0px;
	width: 100%;
	height: 4rem;
	border: 0px;
	background-color: rgb(247, 244, 204);
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
	background-color: rgb(247, 244, 204);
	font-family: InputMonoCondensed;
}
</style>
