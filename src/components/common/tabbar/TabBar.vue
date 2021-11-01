<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
};
</script>
<style scoped>
#tabbar {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 49px;
  background-color: #f6f6f6;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
}
</style>
