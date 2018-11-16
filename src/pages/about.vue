<template>
  <div>
    <header-component/>
    <el-row>
      <el-col :span="12" :offset="6">
        <ul>
          <li>RMC is a decentralized infrastructure for bureaucratic commodification.</li>
          <li>RMC is an individual revolt. It is a circumvention platform.</li>
          <li>RMC is an autonomous organization. It is distributed, yet collective.</li>
          <li>RMC is uncategorized. It is a meandering narrative.</li>
          <li>RMC is a versatile hack. It is independent and stand-alone.</li>
          <li>RMC is an exploitative tool. It doesn't abide typologies.</li>
          <li>RMC is disruptive. It bends structures to its needs.</li>
          <li>RMC is a resentful acceptance. It proposes no solution but an escape.</li>
          <li>RMC is immutable. It is here to stay.</li>
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
		return {}
	}
}
</script>
<style scoped>
ul li {
	list-style-type: none;
	font-family: InputRegular;
	font-size: 1.2rem;
	margin-bottom: 8px;
	padding: 5px 5px 5px 5px;
}
ul li:hover {
	background-color: black;
	color: white;
}
</style>
