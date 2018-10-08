<template>
  <el-button-group v-if="showButtons">
    <el-button @click="$emit('show-details')">Details</el-button>
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
	border-radius: 0px !important;
	font-family: inherit;
	font-size: 1rem;
	padding: 0px;
	color: white;
	background: none;
	border: 0px;
	border-bottom: 0.5px solid white;
}
.el-button:hover {
	background: white;
	color: black;
	padding: 5px;
}
</style>
