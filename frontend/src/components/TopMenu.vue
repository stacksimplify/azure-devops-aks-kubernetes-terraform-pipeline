<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="0">
      <router-link to="/">Ship Manager</router-link>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">Ships</template>
      <el-menu-item index="2-1">
        <router-link to='/ships/new'>New Ship</router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        <router-link to='/ships'>Inspect Ship</router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">Ports</template>
      <el-menu-item index="3-1">
        <router-link to='/ports/new'>New Port</router-link>
      </el-menu-item>
      <el-menu-item index="3-2">
        <router-link to='/ports'>Inspect Port</router-link>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="4" class="version" disabled>v{{ version }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '0',
      activeIndex2: '0',
      version: require('../../package.json').version
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}

.version {
  color: white;
  cursor: default !important;
  float: right !important;
}
</style>
