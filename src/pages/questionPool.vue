<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-table :data="questionData">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="title" label="TITLE"/>
        <el-table-column prop="voteCount" label="VOTES"/>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
	data() {
		return {
			questionData: [
				{
					id: 1,
					title: 'stuff',
					voteCount: 0
				},
				{
					id: 1,
					title: 'stuff',
					voteCount: 0
				},
				{
					id: 1,
					title: 'stuff',
					voteCount: 0
				}
			]
		}
	}
}
</script>
<style scoped>
</style>
