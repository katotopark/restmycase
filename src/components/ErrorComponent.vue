<template>
  <div v-if="errArr.length !== 0" class="container">
    <ul>
      <li v-for="err in errArr" :key="err.key">
        {{ err }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
	props: {
		errArr: {
			type: Array,
			required: true
		}
	},
	data() {
		return {}
	}
}
</script>
<style scoped>
ul {
	font-size: 1.2rem;
	font-family: InputMonoCondensed;
	margin-top: 0px;
	margin-bottom: 0px;
	background-color: none;
	width: 100%;
	padding: 5px;
	list-style-type: none;
	color: white;
	background-color: black;
}
.container {
	border: 2px solid black;
	text-align: center;
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
