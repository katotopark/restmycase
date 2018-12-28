<template>
  <div>
    <header-component/>
    <el-row type="flex" justify="center">
      <el-col id="content" :sm="16" :md="12">
        <error-component :err-arr="errors"/>
        <text-component
          :text-strings="textString"
          :style-obj="textStyle"/>
        <el-row class="input-group">
          <el-row id="input-component">
            <input-component
              :data-obj.sync="newLoc"
              :input-props="inputProps"
              :select-options="filterObj.options"
              @catch-input="onCatchInput"
              @catch-select="onCatchClass"/>
          </el-row>
          <el-row id="button-component">
            <button-component
              :labels="buttonLabels"
              @handle-click="onClick"/>
          </el-row>
        </el-row>
        <el-row id="table-component">
          <table-component
            :data-obj="locArr"
            :filter-obj="filterObj"
            @handle-click="onVote"
            @handle-filter="filterByClass"/>
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
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		HeaderComponent,
		ErrorComponent,
		TextComponent,
		InputComponent,
		ButtonComponent,
		TableComponent
	},
	data() {
		return {
			textString:
				"ALP is a collectively run pool of institutional locations. It stands for 'Autonomous Location Pool'. Here, you can log a new location or vote for one on the list.",
			inputProps: {
				name: { type: 'input' },
				address: { type: 'input' },
				class: { type: 'select' }
			},
			buttonLabels: ['Submit', 'Clear'],
			filterObj: {
				value: '',
				options: [
					{
						value: '1',
						label: 'Governmental'
					},
					{
						value: '2',
						label: 'Legal'
					},
					{
						value: '3',
						label: 'Medical'
					},
					{
						value: '4',
						label: 'Academic'
					},
					{
						value: '5',
						label: 'Professional'
					}
				]
			},
			locArr: [],
			newLoc: {
				name: '',
				address: '',
				class: '',
				voteCount: 0
			},
			newLocName: '',
			newLocAddress: '',
			newLocClass: {
				value: '',
				label: ''
			},
			voted: false,
			locSubmitted: false,
			errors: [],
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
		...mapState(['locationsArray'])
	},
	created() {
		this.setLocations()
		this.locArr = this.locationsArray
	},
	methods: {
		...mapActions(['setLocations', 'addLocation', 'voteLocation', 'addLoc']),
		onClick(e) {
			if (e.id == 0) this.onSubmit()
			else if (e.id == 1) this.onClear()
		},
		onCatchInput(e) {
			if (e.prop == 'name') this.newLocName = e.value
			else if (e.prop == 'address') this.newLocAddress = e.value
		},
		onCatchClass(e) {
			this.newLocClass.value = e.value
		},
		onClear() {
			this.newLoc = {}
		},
		onSubmit() {
			this.checkForm()
			if (this.errors.length == 0) {
				this.newLoc = {
					name: this.newLocName,
					address: this.newLocAddress,
					class: this.newLocClass.value,
					voteCount: 0
				}
				this.addLocation(this.newLoc) // should be removed after
				this.addLoc(this.newLoc)
				this.newLoc = {}
				this.locSubmitted = true
				console.log('location submitted')
			} else {
				this.newLoc = {
					name: this.newLocName,
					address: this.newLocAddress,
					class: this.newLocClass.value,
					voteCount: 0
				}
				this.locSubmitted = false
			}
		},
		checkForm() {
			this.errors = []
			if (
				this.newLocName === '' ||
				this.newLocAddress === '' ||
				this.newLocClass.value === ''
			) {
				this.locSubmitted = false
				this.errors.push('You need to fill in all the fields')
			}
			if (this.locSubmitted) {
				this.errors.push('You have already submitted')
			}
		},
		onVote(index) {
			console.log('clicked ', index)
			if (!this.voted) {
				this.voted = true
				this.voteLocation(index)
			} else {
				this.errors.push('You have already voted')
			}
		},
		filterByClass(e) {
			// should be the coming from the store/getters
			console.log('filtering by class', e)
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
