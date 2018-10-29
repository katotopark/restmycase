<template>
  <div>
    <header-component/>
    <el-row>
      <el-col :span="12" :offset="6">
        <h3>{{ msg }}</h3>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
	components: {
		HeaderComponent
	},
	data() {
		return {
			msg: 'hello from wiki'
		}
	}
}
</script>
<style scoped>
.el-col {
	border: 1px solid white;
	margin-top: 20px;
}
</style>
