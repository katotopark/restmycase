<template>
  <el-row type="flex" justify="center">
    <el-col :span="24">
      <el-button @click="goFullscreen">[]</el-button>
      <loba-loba-component :questions="qArray" :group="group" next="loba2"/>
    </el-col>
  </el-row>
</template>
<script>
import LobaLobaComponent from '../../components/LobaLobaComponent.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	components: {
		LobaLobaComponent
	},
	data() {
		return {
			qArray: [],
			group: {
				value: 'A',
				label: 'space'
			},
			position: {
				lat: 'unknown lat',
				long: 'unknown long'
			},
			geostatus: 'Geostatus unknown'
		}
	},
	computed: {
		...mapState(['questionsArray']),
		...mapGetters(['getQuestionsByGroup'])
	},
	created() {
		this.setQuestions()
		this.formatLobaQuestions()
		this.qArray = this.getQuestionsByGroup(this.group.value)

		if (process.client) {
			/*if (typeof JASON !== 'undefined') {
				JASON.call({
					type: '$util.alert',
					options: { title: 'alert', description: 'this is an alert' }
				})
			}*/
		}
	},
	mounted() {
		if (process.client && navigator.geolocation) {
			// alert('test')
			this.geostatus = 'geolocation is available'
			navigator.geolocation.getCurrentPosition(
				position => {
					this.geostatus = 'geolocation has been received'
					this.position.lat = position.coords.latitude
					this.position.long = position.coords.longitude
				},
				error => {
					this.geostatus =
						'geolocation returned an error: ' + JSON.stringify(error)
				}
			)
		} else {
			this.geostatus = 'geolocation not available'
		}
	},
	methods: {
		...mapActions(['setQuestions', 'formatLobaQuestions']),
		goFullscreen() {
			function enterFullscreen(element) {
				if (element.requestFullscreen) {
					element.requestFullscreen()
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen()
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen()
				} else if (element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen()
				}
			}

			enterFullscreen(document.documentElement)
		}
	}
}
</script>
<style scoped>
</style>
