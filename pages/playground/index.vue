<template>
  <v-row v-if="$store.state.playground.inited">
    <v-col cols="12">
      <v-app-bar app fixed flat color="appbar">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">
          Sudoku.com
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon> mdi-palette </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="
            $store.commit(`playground/setPlaying`, !playground.playing);
            sound(`button`);
          "
        >
          <v-icon>
            {{ playground.playing ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>

        <v-dialog max-width="330" v-model="paused">
          <v-card class="px-4 py-7 text-center">
            <h3 class="font-weight-medium text-body-1 text-center by-7">
              Tạm dừng
            </h3>

            <v-layout class="mt-3">
              <v-flex>
                <div class="text-caption font-weight-regular text--secondary">
                  Thời gian
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ playground.time | timeToString }}
                </div>
              </v-flex>
              <v-flex>
                <div class="text-caption font-weight-regular text--secondary">
                  Độ khó
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ levelName }}
                </div>
              </v-flex>
            </v-layout>

            <div class="hint mt-9">
              <v-icon size="30"> mdi-home </v-icon>
              <div class="text-body-2 font-weight-medium black--text">
                Chủ đề màu sắc
              </div>
              <div class="text-12 font--secondary">
                Các chủ đề màu sắc khác nhau có thể làm cho trò chơi thỏa mái
                hơn
              </div>
            </div>

            <v-btn class="mt-8" block dark color="blue" @click="paused = false">
              <v-icon> mdi-play </v-icon>
              Tiếp tục trò chơi
            </v-btn>
          </v-card>
        </v-dialog>

        <app-menu-settings />
      </v-app-bar>

      <v-row>
        <v-col cols="12" md="6">
          <div
            class="header d-flex text-body-2 font-weight-regular justify-space-between"
          >
            <div>{{ levelName }}</div>
            <div v-if="$store.state.settings.limit_wrong">Số lỗi {{ playground.length_wrong }}/3</div>
            <div v-if="$store.state.settings.show_point">
              <v-icon size="1.3em" color="inherit"> mdi-star-outline </v-icon>
              {{ $store.getters["playground/point"] }}
            </div>
            <div v-if="$store.state.settings.stop_watch">
              <v-icon size="1.3em" color="inherit"> mdi-clock-outline </v-icon>
              {{ playground.time | timeToString }}
            </div>
          </div>

          <div class="board mt-2">
            <div class="board__inner">
              <div class="board--row" v-for="rowIndex in 9" :key="rowIndex">
                <div
                  class="board--col board--col--color"
                  v-for="colIndex in 9"
                  :key="colIndex"
                  :class="{
                    'border-top': (rowIndex - 1) % 3 === 0,
                    'border-top-none': (rowIndex - 1) % 3 !== 0,

                    'border-left': (colIndex - 1) % 3 === 0,
                    'border-left-none': (colIndex - 1) % 3 !== 0,

                    'border-bottom': rowIndex === 9,
                    'border-bottom-none': rowIndex % 3 === 0 && rowIndex < 9,

                    'border-right': colIndex === 9,
                    'border-right-none': colIndex % 3 === 0 && colIndex < 9,

                    //// instance for ops

                    ...(playground.offsetHover
                      ? {
                          'board--col__hover':
                            playground.offsetHover.y + 1 === rowIndex &&
                            playground.offsetHover.x + 1 === colIndex,
                          'board--col__same-group': isSameGroup(
                            playground.offsetHover.x,
                            playground.offsetHover.y,
                            colIndex - 1,
                            rowIndex - 1
                          ) && $store.state.settings.highlight_by_regison,
                          'board--col__like':
                            playground.board[playground.offsetHover.y][
                              playground.offsetHover.x
                            ].value &&
                            playground.board[playground.offsetHover.y][
                              playground.offsetHover.x
                            ].value ===
                              playground.board[rowIndex - 1][colIndex - 1]
                                .value && $store.state.settings.lighlight_num_repeat,
                          'board--col__conflic': $store.state.settings.auto_check_wrong && conflic(
                            playground.offsetHover.x,
                            playground.offsetHover.y,
                            colIndex - 1,
                            rowIndex - 1
                          )
                        }
                      : {}),
                    ///validate
                    ...(playground.board[rowIndex - 1][colIndex - 1]
                      .readonly !== true && $store.state.settings.auto_check_wrong
                      ? {
                          'board--col__validate': validate(
                            colIndex - 1,
                            rowIndex - 1
                          ),
                          'board--col__invalidate': invalidate(
                            colIndex - 1,
                            rowIndex - 1
                          )
                        }
                      : {})
                  }"
                  v-on:[eventHandleSelection]="
                    $store.commit(`playground/setOffsetHover`, {
                      x: colIndex - 1,
                      y: rowIndex - 1
                    })
                  "
                >
                  <template v-if="!paused">
                    <div
                      class="board--grid-note"
                      v-if="
                        playground.note[rowIndex - 1][colIndex - 1].length > 0
                      "
                    >
                      <div
                        class="board--grid-note--row"
                        v-for="row in 3"
                        :key="row"
                      >
                        <div
                          class="board--grid-note--col d-flex align-center justify-center"
                          v-for="col in 3"
                          :key="col"
                        >
                          {{
                            playground.note[rowIndex - 1][
                              colIndex - 1
                            ].includes((row - 1) * 3 + col)
                              ? (row - 1) * 3 + col
                              : null
                          }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex board--text align-center justify-center"
                      v-else
                    >
                      {{ playground.board[rowIndex - 1][colIndex - 1].value }}
                    </div>
                    <!-- item -->
                  </template>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 pt-md-3">
          <div
            class="tools-group d-flex align-center justify-space-between text-center mx-sm-4"
          >
            <button
              v-ripple
              @click="
                $store.commit(`playground/restore`, -1);
                sound(`undo`);
              "
            >
              <v-icon size="1.5em">
                mdi-undo
              </v-icon>
              <br />
              Hoàn tác
            </button>
            <button
              v-ripple
              @click="
                playground.offsetHover &&
                  eraser(playground.offsetHover.x, playground.offsetHover.y);
                sound(`erase`);
              "
            >
              <v-icon size="1.5em"> mdi-eraser </v-icon>
              <br />
              Tẩy
            </button>
            <button
              v-ripple
              @click="
                $store.commit(`playground/setNote_Mode`, !playground.note_mode);
                sound(playground.note_mode ? `pencil_on` : `pencil_off`);
              "
            >
              <div class="icon--note-mode">
                <v-icon size="1.5em"> mdi-pen </v-icon>
                <span class="font-weight-bold">
                  {{ playground.note_mode ? "ON" : "OFF" }}
                </span>
              </div>
              Ghi chú
            </button>
            <button
              v-ripple
              @click="
                $store.commit(`playground/hint`);
                sound(`hint`);
              "
            >
              <v-badge
                color="#0e47a1"
                :content="`${playground.hint}`"
                bordered
                class="badge"
              >
                <v-icon size="1.5em"> mdi-lightbulb-on-outline </v-icon>
              </v-badge>
              <br />
              Gợi ý
            </button>
          </div>

          <div
            class="keyboad-number d-flex align-center justify-space-between mx-3 mt-3"
          >
            <button
              class="number"
              v-for="number in 9"
              :key="number"
              v-ripple
              @click="
                $store.dispatch(`playground/insert`, number);
                keyBoardClick();
              "
            >
              {{ number }}
            </button>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-snackbar v-model="snackbarState">
      {{ snackbarMessage }}
    </v-snackbar>

    <v-dialog
      max-width="330"
      :value="playground.is_success || playground.is_failed"
    >
      <v-card class="px-4 py-7 text-center">
        <h3 class="font-weight-medium text-body-1 text-center by-7">
          Kết thúc
        </h3>

        <v-layout class="mt-3">
          <v-flex>
            <div class="text-caption font-weight-regular text--secondary">
              Thời gian
            </div>
            <div class="text-body-2 font-weight-medium">
              {{ playground.time | timeToString }}
            </div>
          </v-flex>
          <v-flex>
            <div class="text-caption font-weight-regular text--secondary">
              Độ khó
            </div>
            <div class="text-body-2 font-weight-medium">
              {{ levelName }}
            </div>
          </v-flex>
        </v-layout>

        <div class="hint mt-9">
          <v-icon size="30">
            {{
              playground.is_success
                ? "mdi-emoticon-tongue-outline"
                : "mdi-emoticon-confused-outline"
            }}}
          </v-icon>
          <div class="text-body-2 font-weight-medium black--text">
            {{ playground.is_success ? "Bạn đã thắng" : "Bạn đã thua" }}
          </div>
          <div class="text-12 font--secondary">
            Bạn đã ghi được {{ $store.getters["playground/point"] }}
          </div>
        </div>

        <v-btn
          class="mt-8"
          to="/"
          block
          dark
          color="blue"
          @click="paused = false"
        >
          <v-icon> mdi-home </v-icon>
          Trang chủ
        </v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppMenuSettings from "@/components/AppMenuSettings";
import { timeToString } from "~/helpers";

export default {
  meta: {
    noBottom: true
  },
  components: {
    AppMenuSettings
  },
  data() {
    return {
      snackbarMessage: null,
      snackbarState: false
    };
  },
  computed: {
    playground() {
      return this.$store.state.playground;
    },
    eventHandleSelection() {
      return this.$device.isMobile ? "mouseover" : "click";
    },
    levelName() {
      return this.$store.state.system.levels.find(
        item => item.value === this.$store.state.playground.level
      ).text;
    },
    paused: {
      set(value) {
        this.$store.commit("playground/setPlaying", !value);
      },
      get() {
        return !this.playground.playing;
      }
    }
  },
  watch: {
    "playground.is_success"(value) {
      if (value) {
        this.sound("win");
      }
    }
  },
  methods: {
    getGroup(x, y) {
      return this.$store.getters["playground/getGroup"]({ x, y });
    },
    isSameGroup(x1, y1, x, y) {
      //// get from by x1 y1
      return (
        this.getGroup(x1, y1) === this.getGroup(x, y) || x1 === x || y1 === y
      );
    },
    eraser(x, y) {
      if (this.playground.board[y][x].readonly === true) {
        this.snackbarMessage = "Không thể xóa ô mặc định";
        this.snackbarState = true;
      } else {
        this.$store.commit("playground/eraser");
      }
    },

    validate(x, y) {
      return this.$store.getters["playground/validate"]({ x, y });
    },
    invalidate(x, y) {
      return !this.validate(x, y);
    },
    conflic(x1, y1, x2, y2) {
      return (
        this.playground.board[y1][x1].value &&
        this.isSameGroup(x1, y1, x2, y2) &&
        this.playground.board[y1][x1].value ===
          this.playground.board[y2][x2].value
      );
    },

    sound(name) {
      if (this.$store.state.settings.sound === true) {
        this.$sounds[name].play();
      }
    },

    keyBoardClick() {
      if (this.playground.offsetHover) {
        const { value, def, readonly } = this.playground.offsetHover;

        if (readonly) {
          this.sound("error");
        } else {
          this.sound(this.playground.note_mode ? "edit__note" : "edit_value");
        }
      }
    }
  },
  filters: {
    timeToString
  },
  beforeCreate() {
    this.$store.commit("playground/setPlaying", false);
  }
};
</script>

<style lang="scss" scoped>
.header {
  color: #757575;
}

$border-color: #616266;

.board {
  position: relative;
  width: 100%;
  max-width: 394px;
  margin: {
    left: auto;
    right: auto;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .board--row {
      height: (100% / 9);
      flex: 0 0 (100% / 9);
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: row;
    }
    .board--col {
      position: relative;
      height: 100%;
      width: (100% / 9);
      flex: 0 0 (100% / 9);
      border: 1px solid #bfc5cf;
      cursor: default;
    }
    .board--grid-note {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      &--row {
        position: relative;
        width: 100%;
        height: (100% / 3);
        flex: 0 0 (100% / 3);
        display: flex;
        flex-direction: row;
      }
      &--col {
        position: relative;
        height: 100%;
        width: (100% / 3);
        flex: 0 0 (100% / 3);
        text-align: center;
        vertical-align: middle;
        font-size: 13px;
        @media (max-width: 476px) {
          font-size: 12px;
        }
        @media (max-width: 407px) {
          font-size: 11px;
        }
        @media (max-width: 341px) {
          font-size: 8.9px;
        }
        @media (max-width: 280px) {
          font-size: 5px;
        }
      }
    }
    .board--text {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      font-size: 20px;
      text-align: center;
      @media (min-width: 350px) {
        font-size: 25px;
      }
      @media (min-width: 450px) {
        font-size: 35px;
      }
      @media (max-width: 280px) {
        font-size: 10px;
      }
    }
  }
}

.border-top {
  border-top: 2px solid $border-color !important;
}
.border-top-none {
  border-top: 0 !important;
}
.border-left {
  border-left: 2px solid $border-color !important;
}
.border-left-none {
  border-left: 0 !important;
}
.border-bottom {
  border-bottom: 2px solid $border-color !important;
}
.border-bottom-none {
  border-bottom: 0 !important;
}
.border-right {
  border-right: 2px solid $border-color !important;
}
.border-right-none {
  border-right: 0 !important;
}

.board--col {
  &--color:hover {
    background-color: #d8e9ef;
  }
  &__hover {
    background-color: #bbdefa !important;
  }
  &__same-group {
    background-color: #e2e7ed;
  }
  &__validate .board--text {
    color: #0e47a1;
  }
  &__invalidate .board--text {
    color: #f30506;
  }
  &__like {
    background-color: #c8d0dd;
  }
  &__conflic {
    background-color: #fdd4dc;
  }
}

.tools-group {
  font-size: 14px;
  color: #757575;
}

.badge::v-deep .v-badge__badge {
  top: -8px !important;
  min-width: 17px;
  height: 17px;
  padding: 4px 4px;
}

.tools-group {
  button {
    &,
    &:hover {
      outline: none;
    }
  }
  > button {
    width: (100% / 4);
    flex: 0 0 (100% / 4);
    display: inline-block;
  }
}

.icon--note-mode {
  position: relative;
  max-width: 80px;
  margin: 0 auto;

  span {
    position: absolute;
    bottom: 0px;
    right: 10px;
    @media (max-width: 330px) {
      right: 7px;
    }
    @media (max-width: 268px) {
      right: 0px;
    }
    font-size: 0.8em;
    text-transform: uppercase;
  }
}

.number {
  height: 38px;
  line-height: 38px;
  font-size: 32px;
  color: #0e47a1;
  width: (100% / 9);
  flex: 0 0 (100% / 9);
  outline: none;
  border-radius: 3px;
}
</style>
