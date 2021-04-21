<template>
  <v-app dark>
    <v-main fill-height class="lighten">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation
      app
      grow
      shift
      color="blue"
      v-if="$store.state.meta && $store.state.meta.noBottom !== true"
    >
      <v-btn to="/">
        <span> Trang chủ </span>
        <v-icon> mdi-home </v-icon>
      </v-btn>
      <v-btn to="/challenges">
        <span> Thử thách hàng ngày </span>
        <v-icon> mdi-calendar-plus </v-icon>
      </v-btn>
      <v-btn to="/statistical">
        <span> Thống kê </span>
        <v-icon> mdi-chart-box </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
