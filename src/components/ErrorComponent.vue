<template>
  <div v-if="errArr.length !== 0">
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
	font-size: 1.1rem;
	font-family: InputRegular;
	margin-top: 10px;
	margin-bottom: 10px;
	background-color: white;
	width: 100%;
	padding: 5px;
	list-style-type: none;
	color: black;
}
</style>
