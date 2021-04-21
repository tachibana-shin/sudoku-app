<template>
  <v-row>
    <v-col cols="12">
      <v-app-bar app fixed flat color="appbar">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">
          Phần thưởng
        </v-toolbar-title>
      </v-app-bar>

      <v-row>
        <v-col cols="6" sm="4" md="3" v-for="(item, index) in 12" :key="index">
          <v-card class="text-center py-3" elevation="1">
            <v-icon
              size="100px"
              :color="isCompleted(item) ? `yellow darken-1` : undefined"
            >
              mdi-trophy-award
            </v-icon>
            <div class="font-weight-medium text-body-2">Tháng {{ item }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  meta: {
    noBottom: true
  },
  methods: {
    isCompleted(month) {
      const dateBattles = [];

      this.$store.state["battles-complete"].planks.forEach(({ created }) => {
        const date = new Date(created);

        if (date.getMonth() + 1 === month) {
          dateBattles.push(date.getDate());
        }
      });

      let countDateMonth = 0;
      if (month === 2) {
        countDateMonth = 28;
      } else {
        if (month <= 7) {
          if (month % 2 === 1) {
            countDateMonth = 31;
          } else {
            countDateMonth = 30;
          }
        } else {
          if (month % 2 === 0) {
            countDateMonth = 31;
          } else {
            countDateMonth = 30;
          }
        }
      }

      for (let date = 1; date <= countDateMonth; date++) {
        if (dateBattles.includes(date) === false) {
          return false;
        }
      }

      return true;
    }
  }
};
</script>
