<template>
  <v-row>
    <v-app-bar app fixed flat color="lighten">
      <v-spacer />
      <v-spacer />
      <v-btn icon to="/reward">
        <v-icon> mdi-trophy-award </v-icon>
      </v-btn>

      <app-menu-settings />
    </v-app-bar>
    <v-col cols="12" class="text-center">
      <v-card
        elevation="1"
        width="160"
        height="190"
        class="mx-auto card--changleng"
        color="white"
      >
        <v-img
          width="35"
          height="35"
          :src="require(`~/assets/cal-star.png`)"
          class="mx-auto"
        ></v-img>

        <div class="text-body-2 mt-3 text-center font-weight-medium">
          {{ $t("DAILY_CHALLENGE")}}
        </div>
        <div class="text-caption secondary--text font-weight-regular">
          Tháng 4 18
        </div>
        
        <button
          class="play-challeng lighten text-body-2 text-center font-weight-regular blue--text text-uppercase"
          v-ripple
          @click="selLevel(2, true)"
        >
          {{ $t("PLAY") }}
        </button>
      </v-card>

      <h1 class="title font-weight-medium text-center">
        <span class="bluedark--text">Sudoku</span
        ><span class="blue--text">.</span
        ><span class="bluedark--text">com</span>
      </h1>

      <div class="btn--group mx-auto">
        <v-btn
          color="blue"
          block
          dark
          large
          v-if="$store.state.playground.inited"
        >
          <div>
            {{ $t("CONTINUE_THE_GAME") }}
            <div class="text-caption status-continue">
              <v-icon size="1.3em">mdi-clock-outline</v-icon>
              {{ time }} - {{ level }}
            </div>
          </div>
        </v-btn>
        <v-btn
          :color="$store.state.playground.inited ? `white` : `blue`"
          block
          large
          class="mt-sm-4"
          :class="{
            'blue--text': $store.state.playground.inited
          }"
          :dark="$store.state.playground.inited === false"
          @click="newGame"
        >
          {{ $t("NEW_GAME") }}
        </v-btn>
      </div>
    </v-col>

    <v-dialog max-width="330" v-model="dialogConfirmNewGame">
      <v-card class="px-4 py-7 text-center">
        <h3 class="font-weight-medium text-body-1 text-center by-7">
          Có một bàn đang chơi
        </h3>

        <v-layout class="mt-3">
          <v-flex>
            <div class="text-caption font-weight-regular text--secondary">
              Thời gian
            </div>
            <div class="text-body-2 font-weight-medium">{{ time }}</div>
          </v-flex>
          <v-flex>
            <div class="text-caption font-weight-regular text--secondary">
              Độ khó
            </div>
            <div class="text-body-2 font-weight-medium">{{ level }}</div>
          </v-flex>
        </v-layout>

        <div class="hint mt-9">
          <v-icon size="30"> mdi-home </v-icon>
          <div class="text-body-2 font-weight-medium black--text">
            Nếu bạn vẫn tiếp tục bàn chơi hiện tại sẽ bị xóa bỏ
          </div>
          <div class="text-12 font--secondary">
            Bạn sẽ không thể tiếp tục bàn chơi cũ sau khi tiếp tục
          </div>
        </div>

        <v-btn class="mt-8" block dark color="blue" @click="confirmNewGame">
          <v-icon> mdi-play </v-icon>
          Tiếp tục trò chơi
        </v-btn>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="drawSelLevel">
      <v-list>
        <v-subheader>Chọn cấp độ</v-subheader>
        <v-list-item
          v-for="(level, index) in $store.state.system.levels"
          :key="index"
          @click="selLevel(level.value)"
        >
          <v-list-item-title>{{ level.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </v-row>
</template>

<script>
import { timeToString } from "~/helpers";
import AppMenuSettings from "@/components/AppMenuSettings";

export default {
  components: {
    AppMenuSettings
  },
  data() {
    return {
      dialogConfirmNewGame: false,
      drawSelLevel: false
    };
  },
  computed: {
    time() {
      return timeToString(this.$store.state.playground.time);
    },
    level() {
      return this.$store.state.system.levels.find(
        item => item.value === this.$store.state.playground.level
      ).text;
    }
  },
  methods: {
    newGame() {
      if (this.$store.state.playground.inited) {
        this.dialogConfirmNewGame = true;
      } else {
        this.confirmNewGame();
      }
    },
    confirmNewGame() {
      this.drawSelLevel = true;
    },
    async selLevel(level, is_challenges = false) {
      await this.$store.dispatch("playground/new", {
        level,
        is_challenges
      });

      this.$router.push("/playground");
    }
  }
};
</script>

<style lang="scss" scoped>
.card--changleng {
  padding-top: 23px;
  border-radius: 5px;
  padding-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
}
.play-challeng {
  margin-top: 26px;
  width: 60px;
  height: 36px;
  border-radius: 3px;
  line-height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;

  &:hover {
    outline: none;
  }
}

.title {
  font-size: 34px !important;
  margin-top: 62px;
}

.btn--group {
  max-width: 360px;
  margin: 45px 40px 0 40px;
  > * + * {
    margin-top: 10px;
  }
}

.status-continue {
  color: rgba(255, 255, 255, 0.9);
  text-transform: initial;
}

.text-12 {
  font-size: 12px;
}
</style>
