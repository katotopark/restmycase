<template>
  <el-row>
    <el-col :span="12">
      <el-button @click="$emit('show-details')">Fetch Case</el-button>
    </el-col>
    <el-col :span="12">
      <el-button @click="$emit('buy-case')">Buy Case</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
	data() {
		return {}
	}
}
</script>
<style scoped>
.el-button {
	border-radius: 0px;
	font-family: inherit;
	font-size: 1rem;
	padding: 8px;
	background: white;
	color: black;
	border: 0px;
	width: 100%;
	height: 4rem;
	/* border-bottom: 0.5px solid white; */
}
.el-button:hover {
	color: white;
	background: black;
	border-radius: 0px !important;
}
</style>
