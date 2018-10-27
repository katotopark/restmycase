<template>
  <el-header>
    <button type="button" name="button">
      <a href="#">Home</a>
    </button>
    <button type="button" name="button">
      <a href="#">AQP</a>
    </button>
    <button type="button" name="button">
      <a href="#">Wiki</a>
    </button>
    <button type="button" name="button">
      <a href="/about">About</a>
    </button>
  </el-header>
</template>
<script>
export default {
	name: '',
	data: () => ({})
}
</script>
<style scoped>
.el-header {
	background-color: white;
	height: 40px !important;
}
.el-header a {
	/* border: 2px solid red; */
	height: inherit;
	color: black;
	font-family: InputRegular;
	text-decoration: none;
	font-size: 1rem;
}
.el-header button {
	height: 100%;
	background-color: white;
	padding-right: 10px;
	border: 0px;
	/* border-left: 1px solid black; */
}
.el-header button:last-child {
	/* border-right: 1px solid black; */
}
.el-header button:active {
	background-color: black;
}
.el-header button a:active {
	color: white;
}
</style>
