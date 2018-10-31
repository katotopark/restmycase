<template>
  <div>
    <header-component/>
    <el-row>
      <el-col :span="12" :offset="6">
        <span v-if="errors">
          <ul id="errors">
            <li v-for="err in errors" :key="err.key" style="list-style-type: none">{{ err }}</li>
          </ul>
        </span>
        <new-input-component id="new-input" :data-obj.sync="newQ" :select-options="groups" :input-props="inputProps" @catch-input-a="onCatchTitle" @submit="onSubmit" @clear="onClear" @catch-select="onCatchGroup"/>
        <el-select v-model="filterGroup" clearable placeholder="Filter by group" @change="filterByGroup">
          <el-option v-for="item in groups" :key="item.value" :value="item.value" :label="`${item.value}: ${item.label}`"/>
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		NewInputComponent,
		TableComponent,
		HeaderComponent
	},
	data() {
		return {
			groups: [
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
			tableProps: [
				{ value: 'value', width: '300' },
				{ value: 'group', width: '60' },
				{ value: 'voteCount' }
			],
			inputProps: {
				inputA: 'title',
				select: 'group'
			},
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
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row)
		},
		handleCurrentChange(val) {
			this.currentRow = val
		},
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
				this.errors.push("You'll need to fill in both fields.")
			}
			if (this.qSubmitted) {
				this.errors.push("You've already submitted")
			}
		},
		handleClick(index) {
			console.log('clicked')
			if (!this.voted) {
				this.voted = true
				this.voteQuestion(index)
			} else {
				this.errors.push('you already voted')
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
	margin-top: 40px;
	margin-bottom: 20px;
	border-radius: 0px !important;
}
ul#errors {
	padding-left: 0px;
	font-size: 1rem;
	font-family: InputRegular;
	margin-top: 0px;
	margin-bottom: 0px;
}
#new-input {
	margin-top: 30px;
}
</style>
