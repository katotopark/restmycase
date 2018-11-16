<template>
  <div :style="styleObj" class="content">
    <el-row v-if="theCase" id="transition" >
      <el-row>
        <span>{{ byteSort }}</span>
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
			required: true,
			type: Number
		}
	},
	data() {
		return {
			newBytes: [],
			hash: '',
			counter: 1,
			dataSize: 110,
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
			// console.log('ySize changed ', this.ySize)
			this.styleObj = `height: ${this.ySize}px; border: 2px solid black;`
			// console.log(this.styleObj)
		}
	},
	updated() {
		this.$nextTick(() => {
			this.ySize = this.long
			// console.log('height is ', this.height)
		})
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
	line-height: 2rem;
}
.el-col#next-array {
	/* border: 30px solid red; */
	/* height: 400px; */
}
.el-button {
	width: 100%;
	border: 0px;
	border-radius: 0px;
	font-family: inherit;
	height: 4rem;
	margin-top: 10px;
}
.el-button:hover {
	color: white;
	background-color: black;
}

.fade-enter-active {
	transition: all 0.8s ease;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
