<template>
  <v-menu bottom left transition="slide-y-reverse-transition" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon> mdi-cog </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in settings" :key="i" :to="item.href">
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          text: "Cài đặt",
          href: "/settings"
        },
        {
          text: "Luật chơi Sudoku",
          href: "/rules"
        },
        {
          text: "Trợ giúp",
          href: "/help"
        },
        {
          text: "Giới thiệu trò chơi",
          href: "/about"
        }
      ]
    };
  }
};
</script>
