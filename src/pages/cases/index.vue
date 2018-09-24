<template>
  <div>
    <el-row>
      <case-card v-for="elem in 4" :key="elem.key"/>
    </el-row>
    <el-row>
      <case-card v-for="elem in 4" :key="elem.key"/>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CaseCard from '../../components/CaseCard.vue'

export default {
	components: {
		CaseCard
	},
	data() {
		return {
			labelPosition: 'right'
		}
	},
	computed: {
		...mapState(['ipfsHash'])
	},
	created() {},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
</style>
