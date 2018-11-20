<template>
  <div>
    <header-component/>
    <el-row type="flex" justify="center">
      <el-col :sm="22" :md="16">
        <div class="manifesto-header"/>
        <ul>
          <li v-for="elem in manifesto" :key="elem.key">{{ elem }}</li>
          <!-- <li>RMC is a decentralized infrastructure for bureaucratic commodification.</li>
          <li>RMC is an individual revolt. It is a circumvention platform.</li>
          <li>RMC is an autonomous organization. It is distributed, yet collective.</li>
          <li>RMC is uncategorized. It is a meandering narrative.</li>
          <li>RMC is a versatile hack. It is independent and stand-alone.</li>
          <li>RMC is an exploitative tool. It doesn't abide typologies.</li>
          <li>RMC is disruptive. It bends structures to its needs.</li>
          <li>RMC is a resentful acceptance. It proposes no solution but an escape.</li>
          <li>RMC is immutable. It is here to stay.</li> -->
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
	components: {
		HeaderComponent
	},
	data() {
		return {
			manifesto: [
				'RMC is a decentralized infrastructure for bureaucratic commodification.',
				'RMC is an individual revolt. It is a circumvention platform.',
				'RMC is an autonomous organization. It is distributed, yet collective.',
				'RMC is uncategorized. It is a meandering narrative.',
				'RMC is a versatile hack. It is independent and stand-alone.',
				"RMC is an exploitative tool. It doesn't abide typologies.",
				'RMC is disruptive. It bends structures to its needs.',
				'RMC is a resentful acceptance. It proposes no solution but an escape.',
				'RMC is immutable. It is here to stay.'
			]
		}
	}
}
</script>
<style scoped>
.el-col div {
	width: 100%;
	height: 60px;
	background-color: black;
	border: 0px;
}
.el-col ul {
	padding-left: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
.el-col {
	margin-top: 40px;
	border: 2px solid black;
	padding-left: 0px;
}
ul li {
	list-style-type: none;
	font-family: InputMonoCondensed;
	font-size: 1.2rem;
	padding: 10px 5px 10px 20px;
	line-height: 30px;
}
ul li:hover {
	background-color: black;
	color: white;
	font-family: InputMonoCondensedItalic;
}
</style>
