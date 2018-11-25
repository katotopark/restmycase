<template>
  <div>
    <header-component/>
    <el-row type="flex" justify="center">
      <el-col :sm="16" :md="12">
        <error-component :err-arr="errors"/>
        <text-component :text-strings="textString"/>
        <new-input-component id="new-input" :data-obj="newLoc" :select-options="locClassArr" :input-props="inputProps" @catch-input-a="onCatchName" @catch-input-b="onCatchAddress" @catch-select="onCatchClass" @submit="onSubmit" @clear="onClear"/>
        <table-component :props-arr="tableProps" :data-obj="locArr" @handle-click="handleClick"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import NewInputComponent from '../components/NewInputComponent.vue'
import TableComponent from '../components/TableComponent.vue'
import TextComponent from '../components/TextComponent.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import Faker from 'faker'
// import VueMomentLib from 'VueMomentLib'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		HeaderComponent,
		NewInputComponent,
		ErrorComponent,
		TableComponent,
		TextComponent
	},
	data() {
		return {
			textString:
				"ALP is an address pool for institutional locations. It stands for 'Autonomous Location Pool'. Here, you can log a new location or vote for one on the list.",
			tableProps: [
				{ value: 'name', width: '100' },
				{ value: 'address', width: '' },
				{ value: 'class' },
				{ value: 'voteCount' }
			],
			inputProps: {
				inputA: 'name',
				inputB: 'address',
				select: 'class'
			},
			locClassArr: [
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
			],
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
			errors: []
		}
	},
	computed: {
		...mapState(['locationsArray'])
		// date() {
		// 	// return this.$moment(Date.now()).format()
		// 	return this.$time(Date.now()).format('DD/MM') // moment (alias)
		// }
	},
	created() {
		let someLong = Faker.address.longitude()
		let someLat = Faker.address.latitude()
		let someStr = Faker.address.streetAddress()
		console.log('longitude: ', someLong)
		console.log('latitude: ', someLat)
		console.log('address: ', someStr)

		this.setLocations()
		this.locArr = this.locationsArray

		// console.log(Object.values(this.inputProps))
		// console.log(Object.values(this.tableData))
	},
	methods: {
		...mapActions(['setLocations', 'addLocation', 'voteLocation']),
		onCatchName(e) {
			this.newLocName = e
			console.log('got name: ', this.newLocName)
		},
		onCatchAddress(e) {
			this.newLocAddress = e
			console.log('got address: ', this.newLocAddress)
		},
		onCatchClass(e) {
			this.newLocClass.value = e
			console.log('got class: ', this.newLocClass.value)
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
				this.addLocation(this.newLoc)
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
		handleClick(index) {
			console.log('clicked ', index)
			if (!this.voted) {
				this.voted = true
				this.voteLocation(index)
			} else {
				this.errors.push('You have already voted')
			}
		}
	}
}
</script>
<style scoped>
#new-input {
	margin-top: 30px;
	margin-bottom: 30px;
}
ul#errors {
	padding-left: 0px;
	font-size: 1rem;
	font-family: InputRegular;
	margin-top: 0px;
	margin-bottom: 0px;
}
</style>
