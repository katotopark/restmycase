<template>
  <div>
    <header-component/>
    <el-row type="flex" justify="center">
      <el-col :sm="16" :md="12">
        <error-component :err-arr="errors"/>
        <new-input-component id="new-input" :data-obj.sync="newQ" :select-options="qGroupsArr" :input-props="inputProps" @catch-input-a="onCatchTitle" @submit="onSubmit" @clear="onClear" @catch-select="onCatchGroup"/>
        <el-select v-model="filterGroup" clearable placeholder="Filter by group" @change="filterByGroup">
          <el-option v-for="item in qGroupsArr" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
        </el-select>
        <table-component id="questions-table" :data-obj="qArr" :props-arr="tableProps" :voteable="true" @handle-click="handleClick"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NewInputComponent from '../components/NewInputComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import TableComponent from '../components/TableComponent.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		NewInputComponent,
		TableComponent,
		ErrorComponent,
		HeaderComponent
	},
	data() {
		return {
			tableProps: [
				{ value: 'value', width: '' },
				{ value: 'group', width: '' },
				{ value: 'voteCount' }
			],
			inputProps: {
				inputA: 'title',
				select: 'group'
			},
			qGroupsArr: [
				{
					value: 'A',
					label: 'space'
				},
				{
					value: 'B',
					label: 'clerk'
				},
				{
					value: 'C',
					label: 'individual'
				}
			],
			newQ: {
				title: '',
				group: '',
				voteCount: 0
			},
			currentRow: null,
			newGroup: {
				value: '',
				label: ''
			},
			newTitle: '',
			voted: false,
			qSubmitted: false,
			errors: [],
			qArr: [],

			filterGroup: ''
		}
	},
	computed: {
		...mapState(['questionsArray']),
		...mapGetters(['getQuestionsByGroup', 'getQuestionsByVote'])
	},
	created() {
		this.setQuestions()
		this.qArr = this.questionsArray
	},
	methods: {
		...mapActions(['setQuestions', 'addQuestion', 'voteQuestion']),
		onCatchGroup(e) {
			this.newGroup.value = e
		},
		onCatchTitle(e) {
			this.newTitle = e
		},
		onClear() {
			this.newQ = {}
		},
		onSubmit() {
			this.checkForm()
			if (this.errors.length == 0) {
				this.newQ = {
					value: this.newTitle,
					group: this.newGroup.value,
					voteCount: 0
				}
				this.addQuestion(this.newQ)
				this.newQ = {}
				this.qSubmitted = true
			} else {
				this.newQ = {
					value: this.newTitle,
					group: this.newGroup.value,
					voteCount: 0
				}
				this.qSubmitted = false
			}
		},
		checkForm() {
			this.errors = []
			if (this.newTitle === '' || this.newGroup.value === '') {
				this.qSubmitted = false
				this.errors.push("You'll need to fill in all the fields.")
			}
			if (this.qSubmitted) {
				this.errors.push('You have already submitted')
			}
		},
		handleClick(index) {
			console.log('clicked')
			if (!this.voted) {
				this.voted = true
				this.voteQuestion(index)
			} else {
				this.errors.push('You have already voted')
			}
		},
		filterByGroup(e) {
			this.filterGroup = e
			if (this.filterGroup) {
				this.qArr = this.getQuestionsByGroup(this.filterGroup)
			} else {
				this.qArr = this.questionsArray
			}
		}
	}
}
</script>
<style scoped>
.el-select {
	width: 100%;
	margin-bottom: 20px;
	border-radius: 0px !important;
}
#new-input {
	margin-top: 30px;
	margin-bottom: 30px;
}
#questions-table {
	border: 2px solid black;
}
</style>
