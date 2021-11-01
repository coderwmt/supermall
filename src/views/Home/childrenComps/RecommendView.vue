<template>
  <div class="recommend-view">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-view-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.recommend-view{
  display: flex;
  text-align: center;
  padding:10px 0 20px;
  border-bottom: 10px solid #eee;
}

.recommend-view-item{
  flex: 1;
  font-size: 12px;
}

.recommend-view-item img{
  width: 75px;
  height: 75px;
}
</style>
