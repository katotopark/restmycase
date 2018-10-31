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
        <new-input-component id="new-input" :data-obj="newLoc" :select-options="locClassArr" :input-props="inputProps" @catch-input-a="onCatchName" @catch-input-b="onCatchAddress" @catch-select="onCatchClass" @submit="onSubmit" @clear="onClear"/>
        <table-component :props-arr="tableProps" :data-obj="tableData" :voteable="true"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import NewInputComponent from '../components/NewInputComponent.vue'
import TableComponent from '../components/TableComponent.vue'
import Faker from 'faker'

export default {
	components: {
		HeaderComponent,
		NewInputComponent,
		TableComponent
	},
	data() {
		return {
			tableProps: [
				{ value: 'name', width: '80' },
				{ value: 'address', width: '200' },
				{ value: 'class' }
			],
			tableData: [
				{ name: 'yoyo', address: 'yoyotown', class: '2' },
				{ name: 'yoyo', address: 'yoyotown', class: '2' },
				{ name: 'yoyo', address: 'yoyotown', class: '2' },
				{ name: 'yoyo', address: 'yoyotown', class: '2' },
				{ name: 'yoyo', address: 'yoyotown', class: '2' }
			],
			inputProps: {
				inputA: 'name',
				inputB: 'address',
				select: 'class'
			},
			newLoc: {
				name: '',
				address: '',
				class: ''
			},
			newLocName: '',
			newLocAddress: '',
			newLocClass: {
				value: '',
				label: ''
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
			locSubmitted: false,
			errors: []
		}
	},
	created() {
		let someLong = Faker.address.longitude()
		let someLat = Faker.address.latitude()
		let someStr = Faker.address.streetAddress()
		console.log('longitude: ', someLong)
		console.log('latitude: ', someLat)
		console.log('address: ', someStr)
	},
	methods: {
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
					class: this.newLocClass.value
				}
				this.tableData.push(this.newLoc)
				this.newLoc = {}
				this.locSubmitted = true
				console.log('location submitted')
			} else {
				this.newLoc = {
					name: this.newLocName,
					address: this.newLocAddress,
					class: this.newLocClass.value
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
		}
	}
}
</script>
<style scoped>
#new-input {
	margin-top: 30px;
}
ul#errors {
	padding-left: 0px;
	font-size: 1rem;
	font-family: InputRegular;
	margin-top: 0px;
	margin-bottom: 0px;
}
</style>
