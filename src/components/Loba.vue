<template>
  <el-row :gutter="20">
    <el-col :span="16" :offset="4">
      <div class="grid-content bg-col">
        <h3>Loba_{{ parent }}</h3>
        <el-form ref="lobaForm" label-width="120px">
          <loba-question v-for="(q, i) in qArr" :key="q.key" :loba-data="qArr[i]" @catch-input="onCatchInput"/>
          <el-form-item>
            <el-button type="info" icon="el-icon-check" circle @click="onSubmit"/>
            <el-button type="info" icon="el-icon-delete" circle @click="onReset('lobaForm')"/>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import LobaQuestion from './LobaQuestion.vue'

export default {
	components: {
		LobaQuestion
	},
	props: {
		parent: {
			default: '',
			type: String
		},
		qArr: {
			default: null,
			type: Array
		}
	},
	data() {
		return {
			localLobaScore: 0
		}
	},
	computed: {},
	methods: {
		onCatchInput(e) {
			this.localLobaScore += e
			console.log(e, this.localLobaScore)
		},
		onNext() {
			console.log('Next Loba')
		},
		onSubmit() {
			console.log(`Form submitted! Total score: ${this.localLobaScore}`)
		},
		onReset() {
			// this.$refs[formName].resetFields()
			console.log('Form reset!')
		}
	}
}
</script>
<style scoped>
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
.bg-col {
	border: 1px solid black;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
</style>
