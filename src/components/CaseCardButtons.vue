<template>
  <el-button-group v-if="showButtons">
    <el-button @click="$emit('show-details')">Fetch case</el-button>
    <el-button @click="$emit('buy-case')">Buy case</el-button>
  </el-button-group>
</template>
<script>
export default {
	props: {
		showButtons: {
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
.el-button {
	border-radius: 0px;
	font-family: inherit;
	font-size: 1rem;
	padding: 8px;
	color: white;
	background: none;
	border: 0px;
	/* border-bottom: 0.5px solid white; */
}
.el-button:hover {
	background: white;
	color: black;
	border-radius: 0px !important;
}
</style>
