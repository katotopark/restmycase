<template>
  <el-row>
    <el-col :span="24">
      <el-menu background-color="rgb(247, 244, 204)"
               mode="horizontal" @select="handleSelect">
        <el-col v-for="(item,i) in menuItems" :key="item.key" :span="6">
          <el-menu-item :index="i.toString()">
            <el-button>{{ item }}</el-button>
          </el-menu-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-menu-item index="0">
            <el-button><dissection-component/></el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="6">
          <el-menu-item index="1">
            <el-button type="">AQP</el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="6">
          <el-menu-item index="2">
            <el-button type="">ALP</el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="6">
          <el-menu-item index="3">
            <el-button type="" >About</el-button>
          </el-menu-item>
        </el-col> -->
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
	data() {
		return {
			menuItems: ['RMC', 'AQP', 'ALP', 'About']
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath)
			key == '0'
				? this.$router.push('/cases/')
				: this.$router.push(`/${this.menuItems[key].toLowerCase()}/`)
			// switch (key) {
			// 	case '1':
			// 		this.$router.push('/cases/')
			// 		break
			// 	case '2':
			// 		this.$router.push('/aqp')
			// 		break
			// 	case '3':
			// 		this.$router.push('/alp')
			// 		break
			// 	case '4':
			// 		this.$router.push('/about')
			// 		break
			// }
		}
	}
}
</script>
<style scoped>
.el-button {
	height: 100%;
	width: 100%;
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
