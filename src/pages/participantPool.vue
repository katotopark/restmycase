<template>
  <el-row>
    <el-form :model="someModel">
      <el-form-item label=""/>
    </el-form>
    
  </el-row>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			someModel: {},
			inputObj: ''
		}
	}
}
</script>
<style scoped>
</style>
