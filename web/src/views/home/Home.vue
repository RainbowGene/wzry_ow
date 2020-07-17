<template>
  <div>
    <!-- 幻灯片 -->
    <swiper :options="swiperOptinos">
      <swiper-slide>
        <img class="w-100" src="../../assets/img/1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../assets/img/2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../assets/img/3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3" slot="pagination"></div>
    </swiper>
    <!-- weiper end -->
    <!-- 导航菜单 -->
    <div class="nav_icons bg-white mt-3 pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav_item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <!-- 收起 -->
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 导航菜单 end -->
    <!-- 卡片组件 -->
    <list-card icon="LC_icon_menu_line" :categories="newsCats" title="新闻资讯">
      <!-- 父组件可以直接拿到子组件的某个循环体 -->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news,i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | formatDate}}</span>
        </router-link>
      </template>
    </list-card>
    <list-card icon="card-hero" :categories="heroList" title="英雄列表">
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <router-link
            tag="div"
            :to="`/hero/${hero._id}`"
            class="p-2 text-center"
            style="width:20%"
            v-for="(hero,i) in category.heroList"
            :key="i"
          >
            <img class="w-100" :src="hero.avatar" alt />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </list-card>
    <!-- <card icon="LC_icon_menu_line" title="英雄列表"></card>
    <card icon="LC_icon_menu_line" title="精彩视频"></card>
    <card icon="LC_icon_menu_line" title="图文攻略"></card>-->
  </div>
</template>

<script>
// npm install vue-awesome-swiper@3.1.3 --save
// npm i dayjs --save 格式化日期
import dayjs from "dayjs";
import ListCard from "@/components/common/card/ListCard";
export default {
  data() {
    return {
      swiperOptinos: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroList: []
    };
  },
  components: {
    ListCard
  },
  created() {
    this.fetchNewsList();
    this.fetchHeroList();
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    // 获取新闻列表
    async fetchNewsList() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    // 获取英雄列表
    async fetchHeroList() {
      const res = await this.$http.get("heroes/list");
      this.heroList = res.data;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/var.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav_icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  text-align: center;
  .nav_item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>