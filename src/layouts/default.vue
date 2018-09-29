<template>
  <div>
    <nuxt/>
  </div>
</template>

<style src="element-ui/lib/theme-chalk/index.css">
</style>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
@import url('https://fonts.googleapis.com/css?family=Inconsolata');

html {
	font-family: 'Inconsolata', monospace;
	font-size: 16px;
	background-color: rgb(0, 0, 0);
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	/* margin: 0; */
}

.button--green {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #3b8070;
	color: #3b8070;
	text-decoration: none;
	padding: 10px 30px;
}

.button--green:hover {
	color: #fff;
	background-color: #3b8070;
}

.button--grey {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #35495e;
	color: #35495e;
	text-decoration: none;
	padding: 10px 30px;
	margin-left: 15px;
}

.button--grey:hover {
	color: #fff;
	background-color: #35495e;
}
</style>
