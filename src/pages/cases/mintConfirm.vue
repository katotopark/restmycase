<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-col :span="24" class="container">
        <el-row v-if="!confirmed" type="flex" justify="center">
          <el-col :span="20">
            <el-row justify="center" type="flex">
              <dissection-component/>
            </el-row>
            <el-row>
              <text-component id="text-component" :style-obj="textStyle" :text-strings="txString"/>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24" class="container">
            <el-row type="flex" justify="center" class="card">
              <el-col :span="16">
                <case-card
                  v-if="propCheck"
                  :the-case="theCase"/>
                <el-button @click="handleClick">View Case</el-button>
              </el-col>
            </el-row>
            <el-row class="text">
              <case-card-metadata :the-case="theCase"/>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CaseCard from '../../components/CaseCard.vue'
import CaseCardMetadata from '../../components/CaseCardMetadata.vue'
import DissectionComponent from '../../components/DissectionComponent.vue'
import TextComponent from '../../components/TextComponent.vue'

export default {
	components: {
		CaseCard,
		DissectionComponent,
		CaseCardMetadata,
		TextComponent
	},
	data() {
		return {
			theCase: {},
			confirmed: false,
			lobas: {},
			propCheck: false,
			txString: 'Waiting for the transaction...',
			geoString: 'Checking location with ALP...',
			geoCheck: false,
			textStyle: {
				fontFamily: 'InputMonoCondensedLightItalic',
				fontSize: '1.1rem',
				marginTop: '20px',
				marginBottom: '15px',
				wordWrap: 'breakword',
				textAlign: 'center'
			}
		}
	},
	computed: {
		...mapState(['formObj', 'ipfsHash', 'txHash', 'blockHash'])
	},
	watch: {
		async txHash() {
			this.theCase = await this.composeCaseCard()
		},
		async theCase() {
			let lobas = await this.theCase.lobas
			let distance = await this.theCase.tDistance
			let duration = await this.theCase.tDuration

			if (
				lobas !== undefined &&
				distance !== undefined &&
				duration !== undefined
			) {
				this.propCheck = true
				console.log('prop check: ', this.propCheck)
			} else {
				this.propCheck = false
			}
		}
	},
	methods: {
		...mapActions(['caseHashToData', 'getCaseId']),
		async composeCaseCard() {
			this.confirmed = true

			let caseID = await this.getCaseId(this.ipfsHash)
			let data = await this.caseHashToData(this.ipfsHash)
			let parsedData = JSON.parse(data.toString('utf8'))

			console.log('parsed data is', parsedData)

			let theCase = Object.assign(parsedData, {
				id: caseID
			})

			// return theCase
			this.lobas = theCase.lobas
			return theCase
		},
		handleClick() {
			console.log('button clicked')
			let id = this.theCase.id
			if (id !== null) {
				this.$router.push(`/cases/${id}`)
			} else {
				console.log('no id.')
			}
		}
	}
}
</script>
<style scoped>
.container {
	margin-top: 50px;
}
.text {
	/* max-width: 500px; */
	/* word-wrap: break-word; */
	border: 2px solid black;
	color: black;
	margin-bottom: 50px;
}
.card {
	margin-bottom: 40px;
}
.el-button {
	border-radius: 0px;
	font-family: InputMonoCondensed;
	font-size: 1.1rem;
	padding: 8px;
	background-color: rgb(247, 244, 204);
	color: black;
	border: 2px solid black;
	width: 100%;
	height: 4rem;
	margin-top: 10px;
	display: block;
	white-space: normal !important;
	word-wrap: break-word;
}
.el-button:hover,
.el-button:focus {
	background: black;
	color: white;
	font-family: InputMonoCondensedItalic;
}
</style>
