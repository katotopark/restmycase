<template>
  <el-row>
    <el-form :model="dataObj">
      <div class="container">
        <!-- <el-row v-if="!selectOptions">
          <el-row class="input-label">
            <h2>_{{ inputProps.toUpperCase() }}</h2>
          </el-row>
          <el-row class="input-text" type="flex" justify="center" >
            <el-col :span="20">
              <el-form-item>
                <el-input v-model="dataObj.inputProps" :placeholder="inputProps" type="textarea" @change="$emit('catch-input', dataObj.inputProps)"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row v-else-if="selectOptions">
          <el-row class="input-label">
            <h2>_{{ inputProps.toUpperCase() }}</h2>
          </el-row>
          <el-row class="input-text" type="flex" justify="center" >
            <el-col :span="20">
              <el-form-item>
                <el-select v-model="dataObj.inputProps" :placeholder="inputProps" style="width: 100%;" @change="$emit('catch-input', dataObj.inputProps)">
                  <el-option v-for="elem in selectOptions" :key="elem.key" :value="elem.value" :label="`${elem.value}: ${elem.label}`"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row> -->
        <el-row class="input-label">
          <h2>_{{ inputProps.inputA.toUpperCase() }}</h2>
        </el-row>
        <el-row :gutter="10" class="input-text">
          <el-col :span="22" :offset="1">
            <el-form-item>
              <el-input v-model="dataObj[inputProps.inputA]" :placeholder="inputProps.inputA" type="textarea" @change="$emit('catch-input-a', dataObj[inputProps.inputA])"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="routePath" class="input-label">
          <h2>_{{ inputProps.inputB.toUpperCase() }}</h2>
        </el-row>
        <el-row v-if="routePath" :gutter="10">
          <el-col :span="22" :offset="1">
            <el-form-item>
              <el-input v-model="dataObj[inputProps.inputB]" :placeholder="inputProps.inputB" type="textarea" @change="$emit('catch-input-b', dataObj[inputProps.inputB])"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-label">
          <h2>_{{ inputProps.select.toUpperCase() }}<span v-if="showLabel && labelString !== ''">{{ labelString }}</span></h2>
        </el-row>
        <el-row :gutter="10" class="input-text">
          <el-col :span="22" :offset="1">
            <el-form-item size="large" label="">
              <el-select v-model="dataObj[inputProps.select]" :placeholder="inputProps.select" style="width: 100%;" @change="$emit('catch-select', dataObj[inputProps.select])">
                <el-option v-for="(item) in selectOptions" :key="item.value" :value="item.value" :label="item.label"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-form-item>
          <el-col :span="12">
            <el-button type="submit" @click="$emit('submit')">Submit</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="submit" @click="$emit('clear')">Clear</el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </el-row>
</template>
<script>
export default {
	props: {
		dataObj: {
			required: true,
			type: Object
		},
		selectOptions: {
			required: true,
			type: Array
		},
		inputProps: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			selectInput: '',
			showLabel: false,
			labelString: ''
		}
	},
	computed: {
		routePath() {
			return this.$router.currentRoute.path == '/alp/' ? true : false
		}
	},
	watch: {
		selectInput() {
			let input = this.dataObj[this.inputProps.select]

			if (input !== '' && input !== undefined) {
				this.showLabel = true

				const prop = this.inputProps.select
				let propFormat
				if (this.inputProps.select !== 'group') {
					propFormat = prop[0].toUpperCase()
				} else if (this.inputProps.select == 'group') {
					propFormat = prop[0]
				}

				const val = this.dataObj[this.inputProps.select]
				this.labelString = `: ${propFormat}.${val}`
			} else {
				this.showLabel = false
				this.labelString = ''
			}
		}
	},
	updated() {
		this.selectInput = this.dataObj[this.inputProps.select]
	}
}
</script>
<style scoped>
.el-option {
	background-color: green;
}
.container {
	border: 2px solid black;
	height: 100%;
	margin-bottom: 10px;
}
.input-text {
	/* border-bottom: 2px solid black; */
	/* margin-bottom: 5px; */
}
.el-button {
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	margin-top: 0.1rem;
	border-radius: 0px;
	width: 100%;
	height: 4rem;
	border: 0px;
	background-color: rgb(247, 244, 204);
	color: black;
	border: 2px solid black;
}
.el-button:hover {
	background-color: black;
	color: white;
	font-family: InputMonoCondensedItalic;
}
.el-button:visited {
	color: black;
	background-color: rgb(247, 244, 204);
	font-family: InputMonoCondensed;
}
.input-label h2 {
	font-size: 1.1rem;
	font-family: InputMonoCondensed;
	background-color: black;
	color: white;
	width: 100%;
	padding: 5px 5px;
	margin-top: 0px;
	/* margin-bottom: 15px; */
	/* border: 2px solid red; */
}
</style>
