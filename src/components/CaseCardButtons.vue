<template>
  <el-button-group v-if="showButtons">
    <el-button @click="$emit('show-details')">Fetch Case</el-button>
    <el-button @click="$emit('buy-case')">Buy Case</el-button>
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
	background: white;
	color: black;
	border: 0px;
	/* border-bottom: 0.5px solid white; */
}
.el-button:hover {
	color: white;
	background: black;
	border-radius: 0px !important;
}
</style>
