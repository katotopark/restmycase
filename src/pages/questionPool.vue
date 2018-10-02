<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <ul>
        <li v-for="err in errors" :key="err.key" style="list-style-type: none">{{ err }}</li>
      </ul>
      <new-question :data-obj.sync="newQ" :group-options="groups" @catch-input="onCatchInput" @submit="onSubmit" @clear="onClear" @catch-group="onCatchGroup"/>
      <el-table id="questions-table" ref="singleTable" :data="questionsArray" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column width="40" type="index" label="#"/>
        <el-table-column prop="value" label="QUESTIONS"/>
        <el-table-column prop="group" width="60" label="GROUP"/>
        <el-table-column width="60" prop="voteCount" label="VOTES"/>
        <el-table-column
          fixed="right"
          label="Up!Up!"
          width="90">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleClick(scope.$index, questionsArray)">
              <i class="el-icon-plus"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- <p>{{ filteringByGroup }}</p> -->
  </el-row>
</template>
<script>
import NewQuestion from '../components/NewQuestion.vue'
// import Faker from 'faker'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		NewQuestion
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
			filtered: []
		}
	},
	computed: {
		...mapState(['questionsArray'])
	},
	created() {
		this.setLobaQuestions()
	},
	methods: {
		...mapActions([
			'setLobaQuestions',
			'addLobaQuestion',
			'voteLobaQuestion',
			'getQuestionsByVote',
			'getQuestionsByGroup'
		]),
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row)
		},
		handleCurrentChange(val) {
			this.currentRow = val
		},
		onCatchGroup(e) {
			this.newGroup.value = e
		},
		onCatchInput(e) {
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
				this.addLobaQuestion(this.newQ)
			}
			this.newQ = {}
			this.qSubmitted = true
		},
		checkForm() {
			this.errors = []
			if (this.newTitle === '' || this.newGroup.value === 0) {
				this.errors.push('fill those')
			}
			if (this.qSubmitted) {
				this.errors.push('you already submitted')
			}
		},
		handleClick(index) {
			if (!this.voted) {
				this.voteLobaQuestion(index)
				this.voted = true
			} else {
				this.errors.push('you already voted')
			}
		}
	}
}
</script>
<style scoped>
.el-table {
	margin-top: 20px;
	color: black;
}
.el-button {
	font-family: inherit;
	color: inherit;
}
ul > li {
	color: white;
	border: 2px solid black;
}
</style>
