<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childrenComponents/DetailNavBar.vue";
import DetailSwiper from "./childrenComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenComponents/DetailGoodsInfo.vue"

import Scroll from "components/common/scroll/Scroll.vue";

import { getDetail, Goods, Shop } from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo
      console.log(res);
    });
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
};
</script>
<style scoped>
#detail{
  height: 100vh;
  position:relative;
}

.content{
  position: absolute;
  overflow: hidden;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
