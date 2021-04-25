<template>
  <v-row>
    <v-col cols="12" class="px-0 pt-0">
      <v-app-bar app fixed elevation="1" color="appbar">
        <v-toolbar-title class="font-weight-medium">
          Thống kê
        </v-toolbar-title>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title color="blue">
            <v-tabs-slider color="blue"></v-tabs-slider>
            <v-tab
              v-for="(item, index) in $store.state.system.levels"
              :key="index"
              :value="item.value"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="({ value }, index) in $store.state.system.levels"
          :key="index"
        >
          <v-card>
            <v-list>
              <v-subheader> Game </v-subheader>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-apps
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Trò chơi đã bắt đầu
                </v-list-item-content>
                <v-list-item-action>
                  {{ getBattlesCount(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-chess-king
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Trò chơi đã thắng
                </v-list-item-content>
                <v-list-item-action>
                  {{ getBattlesCountWin(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-flag
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Tỉ lệ thắng
                </v-list-item-content>
                <v-list-item-action>
                  {{ getRatio(value) }}%
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-calendar-weekend-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Tỉ lệ tuần này
                </v-list-item-content>
                <v-list-item-action>
                  {{ getRatioWeek(value) }}%
                </v-list-item-action>
              </v-list-item>

              <v-subheader> Thời gian </v-subheader>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-clock-time-eleven-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Thời gian ngắn nhất
                </v-list-item-content>
                <v-list-item-action>
                  {{ timeToString(getTimeMin(value)) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-clock-start
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Thời gian trung bình
                </v-list-item-content>
                <v-list-item-action>
                  {{ timeToString(getTimeMedium(value)) }}
                </v-list-item-action>
              </v-list-item>

              <v-subheader> Điểm sô </v-subheader>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-star-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content> Điểm cao nhất </v-list-item-content>
                <v-list-item-action>
                  {{ getPoint(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-star-face
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content> Điểm trung bình </v-list-item-content>
                <v-list-item-action>
                  {{ getPointMedium(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-subheader> Chuỗi thắng liên tiếp </v-subheader>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Chuỗi thắng hiện tại
                </v-list-item-content>
                <v-list-item-action>
                  {{ getChainWin(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-chevron-double-right
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Chuỗi thắng tốt nhất
                </v-list-item-content>
                <v-list-item-action>
                  {{ getChainWinMax(value) }}
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-flag-remove-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Lượt thắng và không phạm lỗi
                </v-list-item-content>
                <v-list-item-action>
                  {{ getCountWinNotErr(value) }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import { timeToString } from "~/helpers";

export default {
  data: () => ({
    tab: null
  }),
  computed: {
    battles() {
      return this.$store.state["battles-complete"].planks;
    }
  },
  methods: {
    timeToString,
    getBattlesCount(level) {
      return this.battles.filter(item => item.level === level).length;
    },
    getBattlesCountWin(level) {
      return this.battles.filter(
        item => item.level === level && item.is_success
      ).length;
    },
    getRatio(level) {
      return Math.round(
        (this.getBattlesCountWin(level) / this.getBattlesCount(level)) * 100
      );
    },
    getRatioWeek(value) {
      const month = new Date().getMonth();
      const dayNow = new Date().getDay();
      let result = 0;
      let count = 0;

      for (let day = 0; day < dayNow; day++) {
        this.battles.forEach((prev, item) => {
          const date = new Date(item.time);
          if (
            (item.level === value && item.value === date.getMonth()) ===
              month &&
            date.getDay() === day
          ) {
            count++;
            if (item.is_success) {
              result++;
            }
          }
        }, 0);
      }

      for (let day = dayNow; day < 7; day++) {
        result += this.battles.reduce((prev, item) => {
          const date = new Date(item.time);
          if (
            (item.level === value && item.value === date.getMonth()) ===
              month &&
            date.getDay() === day
          ) {
            count++;
            if (item.is_success) {
              result++;
            }
          }
        }, 0);
      }

      return Math.round((result / count) * 100);
    },
    getTimeMin(value) {
      let min = Infinity;

      this.battles.forEach(item => {
        if (item.level === value && item.time < min) {
          miin = item.time;
        }
      });

      return min;
    },
    getTimeMedium(value) {
      return (
        this.battles.reduce((prev, { time, level }) => {
          if (value === level) {
            return prev + time;
          } else {
            return prev;
          }
        }, 0) / this.getBattlesCount(value)
      );
    },
    getPoint(value) {
      return this.battles.reduce((prev, { point, level }) => {
        if (level === value) {
          return point + prev;
        } else {
          return point;
        }
      }, 0);
    },
    getPointMedium(value) {
      return (this.getPoint(value) / this.getBattlesCount(value)).toFixed(2);
    },
    getChainWin(value) {
      let count = 0;

      JSON.parse(JSON.stringify(this.battles))
        .reverse()
        .some(item => {
          if (item.level === value && item.is_success) {
            count++;
          } else {
            return true;
          }
        });

      return count;
    },
    getChainWinMax(value) {
      const trains = [];

      let count = 0;
      for (
        let index = 0, length = this.battles.length;
        index < length;
        index++
      ) {
        if (
          this.battles[index].level === value &&
          this.battles[index].is_success
        ) {
          count++;
        } else {
          trains.push(count);
          count = 0;
        }
      }

      return Math.max(...trains);
    },
    getCountWinNotErr(value) {
      return this.battles.reduce((prev, item) => {
        if (item.level === value && item.length_wrong === 0) {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
    }
  }
};
</script>
