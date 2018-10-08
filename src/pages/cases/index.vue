<template>
  <div>
    <case-card v-for="elem in cases" :key="elem.id" :the-case="elem"/>
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
			labelPosition: 'right',
			cases: []
		}
	},
	computed: {
		...mapState(['ipfsHash', 'account'])
	},
	async created() {
		let usersCases = await this.getUsersCases(
<<<<<<< HEAD
			'0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
=======
			'0xf17f52151ebef6c7334fad080c5704d77216b732'
>>>>>>> f43d025b3a109aae6bdaf81bf30708dbbba8c99b
		)

		let mappingFunction = async caseId => {
			let hash = await this.getCaseHash(caseId)
			console.log('IPFS hash for case', caseId, 'is', hash)
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
