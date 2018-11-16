<template>
  <div v-if="byteSort.length > 0" :style="styleObj" class="content">
    <el-row v-if="theCase" id="transition" >
      <el-row>
        <div ref="dataRef">
          <span>{{ byteSort }}</span>
        </div>
      </el-row>
      <el-row>
        <el-button @click="handleClick">Next</el-button>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	props: {
		// fade: {
		// 	required: true,
		// 	type: Boolean
		// },
		// showMetadata: {
		// 	required: true,
		// 	type: Boolean
		// }
		theCase: {
			required: true,
			type: Object
		},
		long: {
			required: false,
			default: 400,
			type: Number
		}
	},
	data() {
		return {
			newBytes: [],
			hash: '',
			counter: 1,
			dataSize: 80,
			ySize: 0,
			styleObj: ''
		}
	},
	computed: {
		byteSort() {
			let output = []
			output = this.newBytes.slice(
				this.dataSize * (this.counter - 1),
				this.dataSize * this.counter
			)
			output.toString()
			return output
		}
	},
	watch: {
		async theCase() {
			await this.composeMetadata()
		},
		ySize() {
			this.styleObj = `height: ${this.ySize}px;`
		}
	},
	mounted() {
		//do something after mounting vue instance
	},
	updated() {
		this.$nextTick(() => {
			this.ySize = this.long
			// console.log('height is ', this.height)
			// console.log(this.$refs.dataRef.clientHeight)
		})
		console.log(this.long)
	},

	methods: {
		...mapActions(['getCaseHash', 'caseHashToData']),
		async composeMetadata() {
			this.hash = await this.getCaseHash(this.theCase.id)
			let data = await this.caseHashToData(this.hash)
			let bytes = Object.values(data)
			this.newBytes = bytes
			// console.log('data: ', this.bytes)
		},
		handleClick() {
			this.counter <= 50 ? this.counter++ : console.log('end of the line')
		}
	}
}
</script>
<style scoped>
span {
	border-bottom: 2px solid black;
	font-size: 1.1rem;
	color: black;
	margin-bottom: 20px;
	width: 100%;
	line-height: 40px;
}

.el-button {
	width: 100%;
	border: 0px;
	border-radius: 0px;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	height: 4rem;
	margin-top: 10px;
	color: black;
	background-color: rgb(247, 244, 204);
	position: relative;
}
.el-button:hover {
	color: white;
	background-color: black;
	font-family: InputMonoCondensedItalic;
}

.el-button:visited {
	color: black;
	background-color: rgb(247, 244, 204);
}
</style>
