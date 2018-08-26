<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form :label-position="labelPosition" :model="formObj" label-width="100px">
            <el-form-item label="caseName">
              <el-input v-model="formObj.caseName"/>
            </el-form-item>
            <el-form-item label="caseDescription">
              <el-input v-model="formObj.caseDescription" type="textarea"/>
            </el-form-item>
            <div>
              <p>tDistance: {{ formObj.tDistance }} kms</p>
              <p>tDuration: {{ formObj.tDuration }} hrs</p>
            </div>
            <el-form-item label= "loba_d1" >
              <el-input v-model="formObj.loba_d1"/>
            </el-form-item>
            <el-form-item label= "loba_d2" >
              <el-input v-model="formObj.loba_d2"/>
            </el-form-item>
            <el-form-item label= "loba_d3" >
              <el-input v-model="formObj.loba_d3"/>
            </el-form-item>
            <el-form-item>
              <el-button @click="mintCase">Mint dat!</el-button>
              <el-button @click="getIpfsHash">Fetch dat!</el-button>
              <el-button @click="ipfsHashToData">Convert dat!</el-button>
              <el-button @click="getAllCases">show cases!</el-button>
              <el-button @click="getTransactions">show transactions!</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <div>
          <p>ipfsHash: {{ ipfsHash }}</p>
          <p>txHash: {{ txHash }}</p>
          <!-- <p>hashToData: {{ formObj }}</p> -->
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			labelPosition: 'right'
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash']),
		...mapGetters([])
	},
	mounted() {
		this.$store.dispatch('randomNum')
	},
	methods: {
		...mapActions([
			'addCase',
			'mintCase',
			'getTokenName',
			'getIpfsHash',
			'getAllCases',
			'getTransactions',
			'ipfsHashToData'
		]),
		hashToData() {
			console.log(this.ipfsHashToData)
		}
	}
}
</script>

<style scoped>
.el-container {
	margin: 50px 50px;
}
</style>
