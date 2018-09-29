<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <ul>
        <li v-for="err in errors" :key="err.key" style="list-style-type: none">{{ err }}</li>
      </ul>
      <new-question :data-obj.sync="newQ" :group-options="groups" @catch-input="onCatchInput" @submit="onSubmit" @clear="onClear" @catch-group="onCatchGroup"/>
      <el-table id="questions-table" ref="singleTable" :data="questionData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column width="40" type="index" label="#"/>
        <el-table-column prop="title" label="QUESTIONS"/>
        <el-table-column prop="group" width="60" label="GROUP"/>
        <el-table-column width="60" prop="voteCount" label="VOTES"/>
        <el-table-column
          fixed="right"
          label="Up!Up!"
          width="90">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleClick(scope.$index, questionData)">
              <i class="el-icon-plus"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import NewQuestion from '../components/NewQuestion.vue'
import Faker from 'faker'

export default {
	components: {
		NewQuestion
	},
	data() {
		return {
			questionData: [],
			groups: [
				{
					value: 1,
					label: 'space'
				},
				{
					value: 2,
					label: 'clerk'
				},
				{
					value: 3,
					label: 'individual'
				}
			],
			newQ: {
				id: 0,
				title: '',
				group: null,
				voteCount: 0
			},
			currentRow: null,
			newGroup: {
				value: 0,
				label: ''
			},
			newTitle: '',
			voted: false,
			qSubmitted: false,
			errors: []
		}
	},
	created() {
		for (let i = 0; i < 3; i++) {
			this.questionData[i] = {
				id: 0,
				title: Faker.lorem.sentence(),
				group: 1,
				voteCount: 0
			}
		}
	},
	methods: {
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
					id: this.questionData.length + 1,
					title: this.newTitle,
					group: this.newGroup.value,
					voteCount: 0
				}
				this.questionData.push(this.newQ)
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
				this.questionData[index].voteCount++
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
