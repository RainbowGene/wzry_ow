<template>
  <!-- 文章详情页 -->
  <div class="page-article" v-if="articleModel">
    <div class="d-flex px-2 py-3 border-bottom">
      <div class="iconfont icon-back px-2 text-info-1" @click="$router.go(-1)"></div>
      <strong class="flex-1 fs-xl text-info-1">{{articleModel.title}}</strong>
      <div class="text-grey fs-xs pr-2">{{articleModel.createdAt | formatData}}</div>
    </div>
    <div class="article_body p-3 fs-lg" v-html="articleModel.body"></div>
    <div>
      <div class="d-flex ai-center px-2 border-top py-3">
        <i class="iconfont icon-icon-test"></i>
        <strong class="text-info-1 fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <!-- 这里要监听才能刷新组件，因为路由跳转的就是该组件，而该组件已经被创建，不会刷新 -->
        <router-link
          class="py-1 px-3"
          tag="div"
          :to="`/article/${item._id}`"
          v-for="(item,i) in articleModel.related"
          :key="i"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    id: { required: true } // 第二种接收，要在组件加载时加上 props:true 属性允许接收
  },
  data() {
    return {
      articleModel: null
    };
  },
  filters: {
    formatData(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  watch: {
    // id:'fetch' // 简写
    id() {
      this.fetchDefail();
    }
  },
  created() {
    // this.id = this.$route.params.id; // 第一种接收参数
    this.fetchDefail();
  },
  methods: {
    async fetchDefail() {
      const res = await this.$http.get(`article/${this.id}`);
      this.articleModel = res.data;
      // console.log(this.articleModel);
    }
  }
};
</script>
<style lang='scss'>
// 图片太大设置宽度  且这里不能写 scope
.page-article {
  .icon-back {
    font-size: 1.5rem;
  }
  .article_body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>