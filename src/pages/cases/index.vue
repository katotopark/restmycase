<template>
  <el-container>
    <header-component/>
    <el-container>
      <el-aside width="200px">
        <aside-component/>
      </el-aside>
      <el-main>
        <el-row :gutter="10">
          <el-col v-for="elem in cases" ref="test" :md="12" :sm="24" :key="elem.id">
            <case-card id="case-card" :the-case="elem"/>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-footer/>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CaseCard from '../../components/CaseCard.vue'
import HeaderComponent from '../../components/HeaderComponent.vue'
import AsideComponent from '../../components/AsideComponent.vue'

export default {
	components: {
		CaseCard,
		HeaderComponent,
		AsideComponent
	},
	data() {
		return {
			cases: []
		}
	},
	computed: {
		...mapState(['ipfsHash', 'account'])
	},
	async created() {
		let usersCases = await this.getUsersCases(
			'0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
		)

		let mappingFunction = async caseId => {
			let hash = await this.getCaseHash(caseId)
			let data = await this.caseHashToData(hash)
			return Object.assign(JSON.parse(data.toString('utf8')), { id: caseId })
		}

		let casePromises = usersCases.map(mappingFunction)

		let cases = await Promise.all(casePromises)

		console.log('Your cases are:')
		console.table(cases)

		this.cases = cases
	},
	methods: {
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData'])
	}
}
</script>
<style scoped>
.el-main {
	padding: 0px;
}
.el-aside {
	/* border-right: 2px solid black; */
	background-color: none;
	padding: 0px;
	border: 0px;
}
#case-card {
	margin-top: 40px;
	margin-bottom: 20px;
}
.el-col {
	border-bottom: 2px solid black;
}
</style>
