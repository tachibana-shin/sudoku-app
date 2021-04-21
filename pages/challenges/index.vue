<template>
  <v-row>
    <v-col cols="12" class="px-0 pt-0">
      <v-app-bar app fixed elevation="1" color="blue" dark>
        <v-toolbar-title class="font-weight-medium">
          Thử thách hàng ngày
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon to="/reward">
          <v-icon> mdi-trophy-award </v-icon>
        </v-btn>
      </v-app-bar>

      <v-card flat class="wrap">
        <v-card-text class="card-text pt-0 px-0">
          <div class="header blue">
            <div class="bg">
              <img
                class="bg-1"
                :src="require('@/assets/rays_circle_1_5x.png')"
              />
              <img
                class="bg-2"
                :src="require('@/assets/rays_circle_2_5x.png')"
              />
              <img
                class="bg-3"
                :src="require('@/assets/rays_circle_dark_1_5x.png')"
              />
              <img
                class="bg-4"
                :src="require('@/assets/rays_circle_dark_2_5x.png')"
              />
            </div>
            <img class="cup" :src="cupImage" />
          </div>
          <v-date-picker
            :allowed-dates="filterDate"
            class="mx-auto"
            :min="`${now.year}-01-01`"
            :max="`${now.year}-${now.month}-31`"
            v-model="date"
            no-title
            full-width
            reactive
            :locale="$store.state.system.lang"
            :picker-date.sync="picker"
          ></v-date-picker>
          <div class="play-btn">
            <v-btn color="blue" block dark large @click="newGame">
              Chơi
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { now } from "~/helpers";

export default {
  data() {
    return {
      date: now().toString(),
      picker: [now().year, now().month].join("-")
    };
  },
  computed: {
    now,
    cupImage() {
      const [, month] = this.picker.split("-");
      return require(`~/assets/cup_${+month}.png`);
    }
  },
  methods: {
    filterDate(e) {
      const [year, month, day] = e.split("-");

      return (
        new Date(`${month}/${day}/${year}`).getTime() <=
        new Date(`${this.now.month}/${this.now.day}/${this.now.year}`).getTime()
      );
    },
    async newGame() {
      await this.$store.dispatch("playground/new", {
        level: 2,
        is_challenges: true
      });

      this.$router.push("/playground");
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  z-index: 0;

  .card-text {
    .header {
      height: 250px;
      padding-top: (250 / 360 * 100%);
      overflow: hidden !important;
      position: relative;

      .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 0;

        * {
          position: absolute;
          left: -10%;
          width: 120%;
          top: -36.4%;
          opacity: 0.8;
          //filter: blur(1px);
        }

        .bg-3 {
          z-index: 1;
        }

        .bg-1 {
          z-index: 2;
        }

        .bg-4 {
          z-index: 3;
        }

        .bg-2 {
          z-index: 4;
        }

        .bg-1,
        .bg-3 {
          animation: rotate-360 20s linear infinite;
        }

        .bg-2,
        .bg-4 {
          animation: rotate-360 20s reverse linear infinite;
        }

        @keyframes rotate-360 {
          from {
            transform: rotate(0);
          }

          to {
            transform: rotate(360deg);
          }
        }
      }

      .cup {
        position: absolute;
        bottom: 15px;
        max-width: 150px;
        max-height: 200px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .play-btn {
      margin: 10px 15px;
    }
  }
}
</style>
