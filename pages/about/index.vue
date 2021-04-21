<template>
  <v-row>
    <v-col cols="12">
      <v-app-bar app fixed flat color="appbar">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">
          Giới thiệu Trò chơi
        </v-toolbar-title>
      </v-app-bar>

      <div class="d-flex px-4 py-6 information appbar ma-n3">
        <div>
          <v-img
            width="70"
            height="70"
            :aspect-ratio="1"
            :src="require(`~/assets/logo.png`)"
          ></v-img>
        </div>
        <div style="padding-left: 18px">
          <h1 class="title font-weight-medium text-truncate">
            Sudoku.com - Câu đố Kinh điển
          </h1>
          <h2 class="text-body-1 font-weight-regular">Phiên bản 3.7.3</h2>
          <div class="text--secondary font-weight-regular copyright">
            (c) 2017-2021 Easybrain Ltd.
            <br />
            Mọi quyền được bảo lưu.
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="pt-4 lighten">
        <v-list color="lighten">
          <template v-for="(item, index) in items">
            <v-divider v-if="item.divider" :key="index"></v-divider>
            <v-list-item v-else :key="index">
              <v-list-item-content>
                <v-list-item-title> {{ item.text }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  meta: {
    noBottom: true
  },
  data() {
    return {
      items: [
        {
          text: "Trò chơi khác của Easybrain"
        },
        {
          text: "Truy cập Easybrain.com"
        },
        {
          text: "Easybrain trên Facebook"
        },
        { divider: true },
        {
          text: "Điều khoản dịch vụ"
        },
        {
          text: "Chính sách Quyền Riêng tư"
        },
        {
          text: "Cài đặt quyền riêng tư"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  margin-top: 7px;
}
.copyright {
  font-size: 13px;
  margin-top: 10px;
}
</style>
