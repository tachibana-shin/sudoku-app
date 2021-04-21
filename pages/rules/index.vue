<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-app-bar app fixed flat color="appbar">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">
          Luật chơi Sudoku
        </v-toolbar-title>
      </v-app-bar>

      <swiper
        class="main fill-height"
        :options="{
          spaceBetween: 15,
          pagination: {
            el: '.pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next'
          },
          breakpoints: {
            960: {
              slidesPerView: 3
            },
            600: {
              slidesPerView: 2
            },
            1: {
              slidesPerView: 1
            }
          }
        }"
        @slideChange="slideChange"
        ref="swiper"
      >
        <swiper-slide>
          <v-img
            :src="require(`~/assets/rules/1.png`)"
            :aspect-ratio="1"
          ></v-img>

          <div class="text-body-2 font-weight-regular mt-2">
            Câu đố Sudoku bắt đầu với một bảng kẻ ô, trong đó một số ô đã được
            điền số, tùy thuộc vào độ khó của trò chơi. Một câu đố được hoàn
            thành là câu đố trong đó mỗi số từ 1 đến 9 chỉ xuất hiện một trong 9
            <span class="orange--text">hàng</span>,
            <span class="danger--text">cột</span> và
            <span class="success--text">khối</span>.
            <br />
            Phân tích bảng để tìm ra số có thể phù hợp cho từng ô.
          </div>
        </swiper-slide>
        <swiper-slide>
          <v-img :src="require(`~/assets/rules/2.png`)"></v-img>
          <v-img :src="require(`~/assets/rules/b2.png`)" width="100%"></v-img>
        </swiper-slide>
        <swiper-slide>
          <v-img :src="require(`~/assets/rules/3.png`)"></v-img>
          <v-img :src="require(`~/assets/rules/b3.png`)" width="100%"></v-img>
        </swiper-slide>
      </swiper>

      <v-app-bar app fixed flat color="appbar" bottom>
        <v-btn
          text
          v-if="activeIndex < length - 1"
          @click="$refs.swiper.$swiper.slideTo(2)"
        >
          Bỏ qua
        </v-btn>
        <v-btn icon v-else></v-btn>
        <v-spacer></v-spacer>
        <div>
          <div class="pagination"></div>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon class="swiper-button-next" v-if="activeIndex < length - 1">
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
        <v-btn text v-else @click="$router.back()"> Xong </v-btn>
      </v-app-bar>
    </v-col>
  </v-row>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import {
  Swiper as SwiperCore,
  Pagination,
  Mousewheel,
  Autoplay,
  Navigation
} from "swiper";

SwiperCore.use([Pagination, Mousewheel, Autoplay, Navigation]);

export default {
  meta: {
    noBottom: true
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      activeIndex: 0,

      length: 3
    };
  },
  methods: {
    slideChange({ activeIndex }) {
      if (innerWidth > 600) {
        activeIndex++;
      }

      if (innerWidth > 960) {
        activeIndex++;
      }
      this.activeIndex = activeIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination::v-deep {
  .swiper-pagination-bullet {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
