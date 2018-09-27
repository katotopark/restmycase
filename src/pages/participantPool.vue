<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-table :data="participantData">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="name" label="NAME"/>
        <el-table-column prop="attending" label="ATTENDING"/>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
	data() {
		return {
			participantData: [
				{
					id: 1,
					name: 'husnu',
					attending: 'yes'
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
