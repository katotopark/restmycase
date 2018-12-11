<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-button @click="$emit('show-details')">View Case</el-button>
    </el-col>
    <el-col :span="12">
      <span @mouseenter="$emit('mouse-enter')" @mouseleave="$emit('mouse-leave')">
        <el-button @click="$emit('buy-case')">{{ buttonString }}</el-button>
      </span>
    </el-col>
  </el-row>
</template>
<script>
export default {
	props: {
		buttonString: {
			required: true,
			type: String
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
	font-family: InputMonoCondensed;
	font-size: 1rem;
	padding: 8px;
	background-color: rgb(247, 244, 204);
	color: black;
	border: 2px solid black;
	width: 100%;
	height: 4rem;
	/* border-bottom: 0.5px solid white; */
}

.el-button:hover {
	color: white;
	background: black;
	border-radius: 0px !important;
	font-family: InputMonoCondensedItalic;
}
</style>
