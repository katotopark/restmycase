<template>
  <el-row type="flex" justify="center">
    <el-col :span="18">
      <el-row class="component">
        <input-comp
          :data-obj.sync="newQ"
          :input-props="inputProps"
          :select-options="filterObj.options"
          @catch-input="onCatchInput"
          @catch-select="onCatchSelect"/>
      </el-row>
      <el-row>
        <button-comp :labels="buttonLabels" @handle-click="onClick"/>
      </el-row>
      <el-row class="component">
        <table-comp
          :data-obj="qArr"
          :filter-obj="filterObj"
          @handle-click="onVote"
          @handle-filter="onHandleFilter"/>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ButtonComp from '../components/ButtonComp.vue'
import TableComp from '../components/TableComp.vue'
import InputComp from '../components/InputComp.vue'

export default {
	components: {
		TableComp,
		ButtonComp,
		InputComp
	},
	data() {
		return {
			buttonLabels: ['Submit', 'Clear'],
			qArr: [],
			filterObj: {
				value: '',
				options: [
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
						label: 'administered'
					}
				]
			},
			newQ: {
				value: '',
				group: '',
				voteCount: 0
			},
			newTitle: '',
			newGroup: '',
			inputProps: {
				value: { type: 'input' },
				group: { type: 'select' }
			}
		}
	},
	computed: {
		...mapState(['questionsArray']),
		...mapGetters(['getQuestionsByGroup'])
	},
	created() {
		this.setQuestions()
		this.qArr = this.questionsArray
	},
	methods: {
		...mapActions(['setQuestions', 'addQuestion', 'voteQuestion']),
		onClick(e) {
			if (e.id == 0) this.onSubmit()
			else if (e.id == 1) this.onClear()
		},
		onClear() {
			this.newQ = {}
		},
		onSubmit() {
			this.newQ = {
				value: this.newTitle,
				group: this.newGroup,
				voteCount: 0
			}
			this.addQuestion(this.newQ)
			console.log('submitted', this.newQ)
		},
		onVote(index) {
			console.log(index)
			this.voteQuestion(index)
		},
		onHandleFilter(e) {
			this.filterObj.value = e
			if (this.filterObj.value) {
				this.qArr = this.getQuestionsByGroup(this.filterObj.value)
			} else {
				this.qArr = this.questionsArray
			}
		},
		onCatchInput(e) {
			this.newTitle = e.value
		},
		onCatchSelect(e) {
			this.newGroup = e.value
		}
	}
}
</script>
<style>
.el-row.component {
	margin-top: 20px;
	margin-bottom: 40px;
}
</style>
