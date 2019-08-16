<template>
  <div id="app">
    <!--    <img src="./assets/logo.ico">-->
    <!--    <header-nav></header-nav>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

  import headerNav from '@/components/header-nav'

  export default {
    name: 'App',
    components: {
      headerNav
    }
  }
</script>

<style>
</style>
