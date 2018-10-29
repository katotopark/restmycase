<template>
  <el-aside width="250px">
    <el-menu>
      <el-submenu index="1">
        <template slot="title">Filter cases by:</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">LOBALOBA</el-menu-item>
          <el-menu-item index="1-2">Class</el-menu-item>
          <el-menu-item index="1-3">Location</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
	data() {
		return {}
	}
}
</script>
<style scoped>
</style>
