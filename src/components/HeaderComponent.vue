<template>
  <!-- <el-row> -->
  <!-- <el-col :md="20" style="height: 50px; border-bottom: 2px solid black;"> -->
  <el-menu background-color="rgb(247, 244, 204)"
           mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <el-button type=""/>
    </el-menu-item>
    <el-menu-item index="2">
      <el-button type="">AQP</el-button>
    </el-menu-item>
    <el-menu-item index="3">
      <el-button type="">ALP</el-button>
    </el-menu-item>
    <el-menu-item index="4">
      <el-button type="" >About</el-button>
    </el-menu-item>
  </el-menu>

  <!-- <el-button type="">AQP</el-button>
      <el-button type="">ALP</el-button>
      <el-button type="">About</el-button> -->
  <!-- <a href="#">yes yo</a>
      <a href="#">yes yo</a>
      <a href="#">yes yo</a> -->
  <!-- </el-col> -->
  <!-- </el-row> -->
  <!-- <el-menu :default-active="activeIndex" background-color="#000000"
           mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Home</el-menu-item>
    <el-menu-item index="2">AQP</el-menu-item>
    <el-menu-item index="3">ALP</el-menu-item>
    <el-menu-item index="4">About</el-menu-item>
  </el-menu> -->
</template>
<script>
export default {
	data() {
		return {}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath)
			switch (key) {
				case '1':
					this.$router.push('/cases/')
					break
				case '2':
					this.$router.push('/aqp')
					break
				case '3':
					this.$router.push('/alp')
					break
				case '4':
					this.$router.push('/about')
					break
			}
		}
	}
}
</script>
<style scoped>
.el-button {
	height: 100%;
	width: 200px;
	padding: 0px;
	padding-left: 20px;
	margin-left: 0px;
	border-radius: 0px;
	border: 0px;
	background-color: rgb(247, 244, 204);
	color: black;
	font-family: InputMonoCondensed;
	font-size: 1.2rem;
	text-align: left;
	align-items: center;
}
/* .el-menu .el-menu-item:nth-of-type(1) > .el-button {
	background-color: black;
	border: 0px;
} */
.el-menu {
	border: 0px;
	width: 100%;
	border-bottom: 2px solid black;
	/* position: fixed; */
}
.el-button:hover {
	color: white;
	background-color: black;
	font-family: InputMonoCondensedItalic;
	border: 0px;
}
.el-menu-item {
	background-color: black;
	padding: 0px;
	border: 0px;
}
</style>
