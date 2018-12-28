<template>
  <div>
    <header-component/>
    <el-row type="flex" justify="center">
      <el-col id="content" :sm="16" :md="12">
        <error-component :err-arr="errors"/>
        <text-component :text-strings="textString" :style-obj="textStyle"/>
        <el-row class="input-group">
          <el-row id="input-component">
            <input-component
              :data-obj.sync="newQ"
              :input-props="inputProps"
              :select-options="filterObj.options"
              @catch-input="onCatchTitle"
              @catch-select="onCatchGroup"/>
          </el-row>
          <el-row id="button-component">
            <button-component
              :labels="buttonLabels"
              @handle-click="onClick"/>
          </el-row>
        </el-row>
        <el-row id="table-component">
          <table-component
            :data-obj="qArr"
            :filter-obj="filterObj"
            @handle-click="onVote"
            @handle-filter="filterByGroup"/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import TextComponent from '../components/TextComponent.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import TableComponent from '../components/TableComponent.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		ErrorComponent,
		HeaderComponent,
		TextComponent,
		InputComponent,
		ButtonComponent,
		TableComponent
	},
	data() {
		return {
			textString:
				'AQP is a collectively run pool of questions. It stands for Autonomous Question Pool. Here, you can log a new question or vote for one on the list.',
			styleObj: 'height: 50px;',
			inputProps: {
				value: { type: 'input' },
				group: { type: 'select' }
			},
			buttonLabels: ['Submit', 'Clear'],
			newQ: {
				value: '',
				group: '',
				voteCount: 0
			},
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
			textStyle: {
				fontFamily: 'InputMonoCondensedLightItalic',
				fontSize: '1rem',
				marginTop: '20px',
				marginBottom: '40px',
				wordWrap: 'breakword'
			}
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
		...mapActions(['setQuestions', 'addQuestion', 'voteQuestion', 'addQ']),
		onCatchGroup(e) {
			this.newGroup.value = e.value
		},
		onCatchTitle(e) {
			this.newTitle = e.value
		},
		onClick(e) {
			if (e.id == 0) this.onSubmit()
			else if (e.id == 1) this.onClear()
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
				this.addQuestion(this.newQ) // should be removed after
				this.addQ(this.newQ)
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
		onVote(index) {
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
#content {
	margin-top: 20px;
}
.input-group {
	border: 2px solid black;
}
#button-component {
	margin-bottom: 20px;
	margin-top: 20px;
}
#input-component {
	border-bottom: 2px solid black;
}
</style>
