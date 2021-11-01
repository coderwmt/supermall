<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :class="tab-control"
                   :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isFixed"
                   ></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :class="tab-control"
                   :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue"

import HomeSwiper from "./childrenComps/HomeSwiper.vue";
import RecommendView from "./childrenComps/RecommendView.vue";
import FeatureView from "./childrenComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

import { debounce } from "common/utils.js"

export default {
  name: "Home",
  data() {
    return {
      titles: ["流行", "新款", "精选"],
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffsetTop:0,
      isFixed:false,
      saveY:0,
      tab: "",
      control: "",
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated () {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getSaveY()
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    // 监听img图片加载完成
    this.$bus.$on("itemImageLoad",() => {
      refresh()
    })

  },
  methods: {
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    // 监听事件的方法:
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      if(-position.y>1000){
        this.isShowBackTop = true
      }else{
        this.isShowBackTop = false
      }

      this.isFixed = (-position.y) > this.tabOffsetTop
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    // 请求数据的方法：
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page = this.goods[type].page + 1;
        this.$refs.scroll.finishPullUp()
      });
    },
  }
};
</script>
<style scoped>
.home {
  /* padding-top: 44px; */
  height: 100vh;
  position:relative;
}

.home-nav {
  background-color: var(--color-tint);
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  color:#fff;
  text-align: center;
}

.tab-control{
  position:relative;
  z-index: 1000;
}

.content{
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
