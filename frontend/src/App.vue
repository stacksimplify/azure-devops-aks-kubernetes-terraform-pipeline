<template>
  <div>
    <top-menu></top-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'

export default {
  name: 'app',
  components: {
    'top-menu': TopMenu
  }
}
</script>

<style lang='scss'>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  color: #2c3e50;
  text-align: center;
}
</style>
