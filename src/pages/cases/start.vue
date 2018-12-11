<template>
  <div class="container">
    <el-button id="fullscreen" @click="goFullscreen"/>
    <el-row v-if="!started" type="flex" justify="center">
      <el-col :span="12">
        <el-row type="flex" justify="center">
          <el-button id="commodification" @click="handleClick">Start Commodification</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-else type="flex" justify="center">
      <el-col :span="12">
        <el-row id="dissection-component" type="flex" justify="center">
          <dissection-component/>
        </el-row>
        <el-row class="location-text" type="flex" justify="center">
          <span v-if="!gotLoc">
            <text-component :text-strings="geoMessage" :style="textStyle"/>
          </span>
          <span v-else>
            <text-component :text-strings="locStrings" :style="textStyle"/>
          </span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DissectionComponent from '../../components/DissectionComponent.vue'
import TextComponent from '../../components/TextComponent.vue'

export default {
	components: {
		DissectionComponent,
		TextComponent
	},
	data() {
		return {
			position: {
				lat: 'unknown lat',
				long: 'unknown long'
			},
			geostatus: 'Geostatus unknown',
			started: false,
			gotLoc: false,
			geoMessage: 'Getting coordinates...',
			textStyle: {
				fontFamily: 'InputMonoCondensedLightItalic',
				fontSize: '1.1rem',
				marginTop: '20px',
				marginBottom: '5px',
				wordWrap: 'breakword'
			}
		}
	},
	computed: {
		locStrings() {
			let lat = this.position.lat.toFixed(7)
			let long = this.position.long.toFixed(7)
			const composedString = `Latitude: ${lat}, Longitude: ${long}`
			return composedString
		}
	},
	mounted() {
		if (process.client && navigator.geolocation) {
			this.geostatus = 'geolocation is available'
			navigator.geolocation.getCurrentPosition(
				position => {
					this.geostatus = 'geolocation has been received'
					this.position.lat = position.coords.latitude
					this.position.long = position.coords.longitude
					this.gotLoc = true
				},
				error => {
					this.geostatus =
						'geolocation returned an error: ' + JSON.stringify(error)
				}
			)
		} else {
			this.geostatus = 'geolocation not available'
			this.gotLoc = false
		}
	},
	methods: {
		handleClick() {
			this.started = true
			const func = () => {
				this.$router.push('/cases/loba1')
				console.log('now we start')
			}
			setTimeout(func, 5000)
		},
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
#dissection-component {
	margin-top: 75px;
}
.el-button#fullscreen {
	border: 0px;
	border-radius: 0px;
	background-color: rgb(247, 244, 204);
	margin: 0px;
	width: 100%;
	height: 4rem;
}
.el-button#fullscreen:hover {
	background-color: black;
}
.el-button#commodification {
	border-radius: 0px;
	font-family: InputMonoCondensed;
	font-size: 1.6rem;
	padding: 8px;
	background-color: rgb(247, 244, 204);
	color: black;
	border: 2px solid black;
	width: 40%;
	height: 15rem;
	margin-top: 75px;
	hyphens: auto;
	display: block;
	white-space: normal !important;
	word-wrap: break-word;
	line-height: 40px;
	text-align: center;
	letter-spacing: 4px;
	/* border-bottom: 0.5px solid white; */
}

.el-button#commodification:hover {
	color: white;
	background: black;
	border-radius: 0px !important;
	font-family: InputMonoCondensedItalic;
}
</style>
