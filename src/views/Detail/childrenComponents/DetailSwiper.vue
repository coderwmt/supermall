<template>
<swiper class="detail-swiper">
  <swiper-item v-for="(item,index) in topImages" :key="index">
    <img :src="item">
  </swiper-item>
</swiper>
</template>
<script>
import { Swiper,SwiperItem } from "components/common/swiper/index.js"

export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>
.detail-swiper{
  height: 250px;
  overflow: hidden;
}
</style>
