<template>
  <el-container>
    <header-component/>
    <el-container>
      <el-aside width="200px">
        <aside-component @handle-filter="onHandleFilter"/>
      </el-aside>
      <el-main>
        <el-row :gutter="10">
          <el-col v-for="(elem, i) in cases" ref="test" :md="12" :sm="24" :key="elem.id">
            <case-card id="case-card" :the-case="elem" :index="i"/>
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
		...mapActions(['getUsersCases', 'getCaseHash', 'caseHashToData']),
		onHandleFilter(e) {
			let index = e.id - 1
			switch (index) {
				case 0:
					this.filterByClass()
					break
				case 1:
					this.filterByDuration()
					break
				case 2:
					this.filterByDistance()
					break
				case 3:
					this.filterByLobaloba()
					break
			}
		},
		sortBy(field, reverse, primer) {
			var key = primer
				? function(x) {
						return primer(x[field])
				  }
				: function(x) {
						return x[field]
				  }

			reverse = !reverse ? 1 : -1

			return function(a, b) {
				return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a))
			}
		},
		filterByClass() {
			let output = []
			output = this.cases.sort(this.sortBy('caseClass', false, parseInt))
			console.log(output)
			return output
		},
		filterByDuration() {
			let output = []
			output = this.cases.sort(this.sortBy('tDuration', true, parseInt))
			return output
		},
		filterByDistance() {
			let output = []
			output = this.cases.sort(this.sortBy('tDistance', true, parseInt))
			return output
		},
		filterByLobaloba() {
			let output = []
			output = this.cases.sort(this.sortBy('totalScore', true, parseInt))
			return output
		}
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
