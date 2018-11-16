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
