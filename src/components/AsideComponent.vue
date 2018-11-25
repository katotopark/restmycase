<template>
  <el-menu :max="1" :min="0" background-color="rgb(247, 244, 204)">
    <el-menu-item v-for="(elem,i) in asideObj" :key="elem.key" :index="i.toString()">
      <el-button :style="elem.style" @click="$emit('handle-filter', elem)">{{ elem.optionName }}</el-button>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
	data() {
		return {
			checked: [],
			asideOptions: ['Class', 'Duration', 'Distance', 'LobaLoba'],
			asideObj: {}
		}
	},
	computed: {},
	created() {
		this.asideObj = this.asideOptions.map((opt, i) => {
			let output = {}
			output.optionName = opt
			output.id = i + 1
			output.clicked = false
			output.style = ''
			return output
		})
	},
	methods: {
		handleClick(index) {
			let styleObj = `
          background-color: black;
          font-family: InputMonoCondensedItalic;
          color: white;`

			if (this.asideObj[index].clicked === false) {
				this.asideObj.forEach(x => {
					x.clicked = false
					x.style = ''
				})
				this.asideObj[index].clicked = true
				this.asideObj[index].style = styleObj
			} else if (this.asideObj[index].clicked === true) {
				this.asideObj.forEach(x => {
					x.clicked = false
				})
				this.asideObj[index].style = ''
			}
			// console.log(this.asideObj[index])
		}
	}
}
</script>
<style scoped>
.el-button {
	width: 100%;
	padding: 0px;
	height: 100%;
	background-color: rgb(247, 244, 204);
	color: black;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	border-radius: 0px;
	border: 0px;
	text-align: left;
	padding-left: 20px;
}
.el-button:hover {
	color: white;
	background-color: black;
	font-family: InputMonoCondensedItalic;
	border: 0px;
}
.el-menu-item div p {
	width: 100%;
	background-color: black;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	color: white;
	text-align: left;
	margin-top: 0px;
	hyphens: auto;
	word-wrap: break-word;
	height: 100%;
}
.el-menu-item {
	padding: 0px !important;
}
.el-menu {
	/* padding-top: 150px; */
	height: 100%;
	border-right: 2px solid black;
}
</style>
