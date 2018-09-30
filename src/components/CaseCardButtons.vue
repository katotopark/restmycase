<template>
  <el-button-group>
    <el-button v-if="showButtons" size="small" @click="$emit('show-details')">Details</el-button>
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
}
</style>
