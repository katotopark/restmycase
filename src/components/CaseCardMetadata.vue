<template>
  <!-- <transition v-if="true" name="fade" type="transition"> -->
  <div v-if="true" id="transition">
    <el-row>
      <el-col :span="24">
        <div class="content">
          <!-- <h5>ipfsHash: {{ ipfsHash }}</h5>
          <h5>txHash: {{ txHash }}</h5>
          <h5>blockHash: {{ blockHash }}</h5>
          <h5>data: {{ bytes }}</h5> -->
          <h5>ipfsHash: {{ hash }}</h5>
          <h5>data: {{ bytes }}</h5>
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- </transition> -->
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
	},
	data() {
		return {
			bytes: [],
			hash: ''
		}
	},
	watch: {
		async theCase() {
			await this.composeMetadata()
		}
	},
	methods: {
		...mapActions(['getCaseHash', 'caseHashToData']),
		async composeMetadata() {
			this.hash = await this.getCaseHash(this.theCase.id)
			let data = await this.caseHashToData(this.hash)
			this.bytes = Object.values(data)
			console.log('data: ', this.bytes)
		}
	}
}
</script>
<style scoped>
div.content {
	margin-top: 5%;
	border: 0px solid white;
	height: 50%;
	color: white;
	font-size: 1.1rem;
}
h5 {
	margin: 0px;
	padding: 4px 4px;
	/* border-bottom: 1px solid white; */
}
.fade-enter-active {
	transition: all 0.8s ease;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
