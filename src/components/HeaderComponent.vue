<template>
  <el-menu :default-active="activeIndex" mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="1">Home</el-menu-item>
    <el-menu-item index="2">AQP</el-menu-item>
    <el-menu-item index="3">ALP</el-menu-item>
    <el-menu-item index="4">Wiki</el-menu-item>
    <el-menu-item index="5">About</el-menu-item>
  </el-menu>
</template>
<script>
export default {
	data() {
		return {
			activeIndex: ''
		}
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
					this.$router.push('/wiki')
					break
				case '5':
					this.$router.push('/about')
					break
			}
		}
	}
}
</script>
<style scoped>
.el-menu-item {
	height: inherit;
	color: black;
	font-family: InputRegular;
	text-decoration: none;
	font-size: 1.1rem;
}
el-menu-item:active {
	border: 2px solid red !important;
}
.el-menu-item a {
	text-decoration: none;
	height: 100%;
}
</style>
