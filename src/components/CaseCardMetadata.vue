<template>
  <div v-if="byteSort.length > 0" :style="styleObj" class="content">
    <el-row v-if="theCase" id="transition" >
      <div style="background-color: black; width:100%; height:3rem;" >
        <p class="title">_METADATA</p>
      </div>
      <el-col :span="22" :offset="1">
        <el-row>
          <div ref="dataRef">
            <p><span>{{ byteSort }}</span></p>
          </div>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-row>
          <el-button @click="handleClick">Next</el-button>
        </el-row>
      </el-col>
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
		}
		// long: {
		// 	required: false,
		// 	default: 400,
		// 	type: Number
		// }
	},
	data() {
		return {
			newBytes: [],
			hash: '',
			counter: 1,
			dataSize: 180,
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
	updated() {
		this.$nextTick(() => {
			this.ySize = this.long
			// console.log('height is ', this.height)
			// console.log(this.$refs.dataRef.clientHeight)
		})
		// console.log(this.long)
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
.content {
	/* border: 2px solid black; */
}
span {
	border-bottom: 2px solid black;
}
p.title {
	color: white;
	margin: 0px 5px;
	font-size: 1.2rem;
}

p {
	font-size: 1.1rem;
	font-family: InputMonoCondensed;
	color: black;
	margin-bottom: 20px;
	width: 100%;
	line-height: 40px;
}

.el-button {
	width: 100%;
	border: 0px;
	border-top: 2px solid black;
	border-radius: 0px;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	height: 80px;
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

/* .el-button:visited {
	color: black;
	background-color: rgb(247, 244, 204);
} */
</style>
