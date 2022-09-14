<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped></style>
<style>
/* 暗黑主题 */
:root {
  --theme--font-color: white;
  --theme--bg-color: #212124;
  --theme--bg-color2: #28282b;
  --theme--bg-color3:#383838;
}

* {
  margin: 0;
  padding: 0%;
}
ul,
li {
  list-style: none;
}
#app {
  height: 100%;
  overflow-x: hidden;
}
body {
  height: 100%;
}
html {
  height: 100%;
  background-color: black;
}
</style>
