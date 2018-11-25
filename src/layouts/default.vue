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
@font-face {
	font-family: InputMonoCondensedLight;
	src: url('../assets/Input_Fonts/InputMono/InputMonoCondensed/InputMonoCondensed-Light.ttf');
}
@font-face {
	font-family: InputMonoCondensed;
	src: url('../assets/Input_Fonts/InputMono/InputMonoCondensed/InputMonoCondensed-Regular.ttf');
}
@font-face {
	font-family: InputRegular;
	src: url('../assets/InputMono-Regular.ttf');
}
@font-face {
	font-family: InputMonoCondensedItalic;
	src: url('../assets/Input_Fonts/InputMono/InputMonoCondensed/InputMonoCondensed-Italic.ttf');
}
@font-face {
	font-family: InputMonoCondensedLightItalic;
	src: url('../assets/Input_Fonts/InputMono/InputMonoCondensed/InputMonoCondensed-LightItalic.ttf');
}

html {
	font-family: 'InputMonoCondensed', monospace;
	font-size: 16px;
	background-color: rgb(247, 244, 209);
	color: black;
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
body {
	margin: 0px;
	padding-bottom: 30px;
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

/* Custom form styles */

.el-select .el-input__inner,
textarea {
	border: 2px solid black !important;
	border-radius: 0px !important;

	font-family: 'InputMonoCondensed', monospace !important;
}

.el-table__body td {
	border-bottom: 2px solid black;
}
.el-table__body tr:last-child td {
	border-bottom: 0px !important;
}

.el-table__body tr:not(:nth-last-child(2)),
.el-table__body td {
	background-color: rgb(247, 244, 204) !important;
	color: black !important;
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td,
.el-table__body tr.hover-row.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
	color: white !important;
	background-color: black !important;
	border-bottom: 0px;
}

.el-table__header tr,
.el-table__header th {
	color: white !important;
	background-color: black !important;
}
</style>
