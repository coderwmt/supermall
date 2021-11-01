<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tabbar class="main-tabbar"></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/MainTabbar/MainTabbar.vue";

export default {
  name: "App",
  components: {
    MainTabbar,
  },
};
</script>

<style>
@import "./assets/css/base.css";

.main-tabbar {
  z-index: 1001;
}
</style>
