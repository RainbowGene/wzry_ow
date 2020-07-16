<template>
  <div class="container">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/img/logo.png" height="30" alt />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="bg-primary">立即下载</button>
    </div>
    <div class="nav bg-primary py-2">
      <div class="nav d-flex text-white jc-around">
        <div
          class="nav_item"
          @click="active = i"
          :class="{active:active == i}"
          v-for="(item,i) in linkList"
          :key="i"
        >
          <router-link class="nav-link" :to="item.src" tag="div">{{item.title}}</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        { src: "/home", title: "首页" },
        { src: "/tutorial", title: "攻略中心" },
        { src: "/race", title: "赛事中心" }
      ],
      active: 0
    };
  },

  components: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
// 较新设备支持的吸顶效果
.topbar {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>