<template>
  <div>
    <header-component/>
    <el-row>
      <el-col :span="12" :offset="6">
        <new-question :data-obj="locDataObj" :group-options="locClass"/>
        <table-component :props-arr="tableProps" :data-obj="tableData"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import NewQuestion from '../components/NewQuestion.vue'
import TableComponent from '../components/TableComponent.vue'
import Faker from 'faker'

export default {
	components: {
		HeaderComponent,
		NewQuestion,
		TableComponent
	},
	data() {
		return {
			tableProps: [
				{ value: 'Name', width: '80' },
				{ value: 'Address', width: '200' },
				{ value: 'Class' }
			],
			tableData: [
				{ Name: 'yoyo', Address: 'yoyotown', Class: '2' },
				{ Name: 'yoyo', Address: 'yoyotown', Class: '2' },
				{ Name: 'yoyo', Address: 'yoyotown', Class: '2' },
				{ Name: 'yoyo', Address: 'yoyotown', Class: '2' },
				{ Name: 'yoyo', Address: 'yoyotown', Class: '2' }
			],
			locDataObj: {
				title: '',
				group: ''
			},
			locClass: [
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
		}
	},
	created() {
		let someLong = Faker.address.longitude()
		let someLat = Faker.address.latitude()
		let someStr = Faker.address.streetAddress()
		console.log('longitude: ', someLong)
		console.log('latitude: ', someLat)
		console.log('address: ', someStr)
	}
}
</script>
<style scoped>
</style>
