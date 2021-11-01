<template>
<nav-bar>
  <div slot="left" class="back" @click="backClick">
    <img src="~assets/img/common/back.svg" alt="">
  </div>
  <div slot="center" class="title">
    <div v-for="(item,index) in titles"
         :key="index"
         class="title-item"
         :class="{active:currentIndex === index}"
         @click="itemClick(index)">{{item}}</div>
  </div>
</nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue"

export default {
  name: "DetailNavBar",
  data () {
    return {
      titles:["商品","参数","评论","推荐"],
      currentIndex:0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.title{
  display: flex;
  font-size: 13px;
  text-align: center;
}

.title-item{
  flex:1;
}

.active{
  color:var(--color-high-text)
}

.back{
  text-align: center;
}

.back img{
  margin-top: 13px;
}
</style>
