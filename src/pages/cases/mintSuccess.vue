<template>
  <div>
    <el-row style="margin:20px 0;">
      <el-col :span="12" :offset="6">
        <p>{{ msg }}</p>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"/>
    <el-row>
      <el-col :span="12" :offset="6">
        <p v-for="(value, key) in formObj" :key="value.key">{{ key }}: {{ value }}</p>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"/>
    <el-row>
      <el-col :span="12" :offset="6">
        <p>IPFS hash: {{ ipfsHash }}</p>
        <p>Transaction hash: {{ txHash }}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			msg: `Yo, Congrats! You've successfully minted your case!`
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash'])
	},
	created() {
		console.log(
			this.formObj,
			`ipfsHash: ${this.ipfsHash} / tx Hash:  ${this.txHash}`
		)
	}
}
</script>
<style scoped>
.el-col {
	border: 2px solid black;
}
</style>
