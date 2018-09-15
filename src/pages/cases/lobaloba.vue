<template>
  <div >
    <loba v-for="(q,i) in questions" :key="q.key" :q-arr="questions[i]" :parent="parents[i]"/>
    <el-button type="info" icon="el-icon-check" circle @click="onSubmit"/>
  </div>
</template>
<script>
import Loba from '../../components/Loba.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		Loba
	},
	data() {
		return {
			parents: ['d1', 'd2', 'd3'],
			questions: [
				[
					{ title: 'what' },
					{ title: 'why' },
					{ title: 'how' },
					{ title: 'where' },
					{ title: 'who' }
				],
				[
					{ title: 'ne' },
					{ title: 'neden' },
					{ title: 'nasil' },
					{ title: 'nerede' },
					{ title: 'kim' }
				],
				[
					{ title: 'quoi' },
					{ title: 'pourquoi' },
					{ title: 'comment' },
					{ title: 'où' },
					{ title: 'qui' }
				]
			]
		}
	},
	computed: {
		...mapState(['formObj']),
		lobaDataMap() {
			const lobaObj = this.parents.map((obj, i) => {
				let output = {}
				output[obj] = this.questions[i]
				return output
			})
			return lobaObj
		}
	},
	methods: {
		...mapActions(['calculateLobas']),
		onSubmit() {
			this.calculateLobas(this.lobaDataMap)
			console.log('submitted')
		}
	}
}
</script>
<style scoped>
</style>
