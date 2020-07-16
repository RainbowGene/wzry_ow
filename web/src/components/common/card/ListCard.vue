<template>
  <!-- 卡片列表组件 -->
  <div>
    <card :icon="icon" :title="title">
      <div class="nav d-flex jc-between py-2">
        <div
          class="nav_item"
          :class="{active:active === i}"
          v-for="(item,i) in categories"
          :key="i"
          @click="$refs.list.swiper.slideTo(i)"
        >
          <div class="nav_link">{{item.name}}</div>
        </div>
      </div>
      <div class="pt-2">
        <!-- :options="{autoHeight:true}" 设置后每个swiper-slide只按自身内容决定高度 -->
        <swiper
          :options="{autoHeight:true}"
          ref="list"
          @slide-change="()=>active=$refs.list.swiper.realIndex"
        >
          <swiper-slide v-for="(item,i) in categories" :key="i">
            <slot name="items" :category="item"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      default: []
    }
  },
  components: {
    Card
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>