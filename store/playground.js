import createBoard from "~/helpers/alogrim";

const NOTE_DEFAULT = [
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []]
];

export const state = () => ({
  inited: false,
  playing: false, /// boolean

  is_challenges: null,
  board: null, /// Array<Array<number></number>>
  created: null, /// Date.now()
  level: -1, /// number
  time: null, /// Date.now()
  limit_wrong: null, /// boolean
  length_wrong: -1, /// number
  hint: -1, /// number
  note_mode: null, /// boolean

  offsetHover: null, /// object { x, y }
  note: null, /// Array of Array of Array<9>

  is_failed: false,
  is_success: false,

  history: [] /// array
});

export const getters = {
  getGroup: () => ({ x, y }) => ~~(y / 3) * 3 + ~~(x / 3),
  validate: ({ board }, getters, { settings: { advanced } }) => ({ x, y }) => {
    const { value, def } = board[y][x];
    if (advanced === false) {
      return value ? value === def : true;
    }

    if (value) {
      const validateX = !board[y].some((item, xIndex) => {
        return xIndex !== x && item.value === value;
      });
      if (validateX === false) {
        return false;
      }

      const validateY = !board.some((row, yIndex) => {
        return yIndex !== y && row[x].value === value;
      });
      if (validateY === false) {
        return false;
      }

      const group = getters.getGroup(x, y);
      const yStart = ~~((group + 1) / 3) * 3;
      const xStart = (group % 3) * 3;

      for (let offsetY = 0; offsetY < 3; offsetY++) {
        for (let offsetX = 0; offsetX < 3; offsetX++) {
          if (xStart + offsetX !== x && yStart + offsetY !== y) {
            if (board[yStart + offsetY][xStart + offsetX].value === value) {
              return false;
            }
          }
        }
      }
    }
    return true;
  },
  point({ board }) {
    return board.reduce((prev, row) => {
      return (
        prev +
        row.reduce((prev, col) => {
          if (col.value === col.def && col.readonly !== true) {
            return prev + 100;
          } else {
            return prev;
          }
        }, 0)
      );
    }, 0);
  }
};

let interval;
export const mutations = {
  clear(thisState) {
    Object.assign(thisState, state());
  },
  new(state, { is_challenges, level, limit_wrong }) {
    state.inited = true;
    state.playing = false;
    state.is_challenges = is_challenges;
    state.board = createBoard(level); /// 0 - 5
    state.created = Date.now();
    state.level = level;
    state.time = 0;
    state.limit_wrong = limit_wrong;
    state.length_wrong = 0;
    state.hint = process.env.COUNT_HINT_DEFAULT;
    state.note_mode = false;
    state.offsetHover = null;
    state.note = JSON.parse(JSON.stringify(NOTE_DEFAULT));
    state.history = [];

    state.is_success = false;
    state.is_failed = false;
    // state.limit_wrong =
  },
  setOffsetHover(state, payload) {
    state.offsetHover = payload;
  },
  backup({ history, board, note }, { x, y }) {
    history.push({
      x,
      y,
      value: board[y][x].value,
      note: [...note[y][x]]
    });
  },
  oddError(state) {
    state.length_wrong++;
  },
  insert({ board, note, note_mode, offsetHover }, which) {
    if (offsetHover) {
      const { x, y } = offsetHover;

      if (board[y][x].readonly === true) {
        console.warn(`This cell readonly, can't change. {${x}, ${y}}`);
      } else {
        this.commit("playground/backup", {
          x,
          y
        });
        if (note_mode) {
          const index = note[y][x].indexOf(which);
          if (index > -1) {
            note[y][x].splice(index, 1);
          } else {
            board[y][x].value = null;
            note[y][x].push(which);
          }
        } else {
          if (board[y][x].value === which) {
            //////// exists
            board[y][x].value = null;
          } else {
            board[y][x].value = which;

            if (!this.dispatch("playground/oddError", { x, y })) {
              this.dispatch("playground/done");
            }

            note[y][x].splice(0);
          }
        }
      }
    } else {
      console.warn(`You not selected cell.`);
    }
  },
  restore({ board, note, history }, length) {
    for (
      let index = history.length - 1, max = history.length + length;
      index >= max;
      index--
    ) {
      if (!(index in history)) {
        break;
      }
      const his = history[index];
      const { x, y, value } = his;

      note[y][x].splice(0);
      note[y][x].push(...his.note);
      board[y][x].value = value;
    }

    /// remove after restore
    history.splice(history.length + length);
  },
  setTime(state, value) {
    state.time = value;
  },
  setPlaying(state, value) {
    state.playing = value;

    if (value) {
      clearInterval(interval);

      let last = Date.now();
      interval = setInterval(() => {
        const now = Date.now();
        this.commit("playground/setTime", state.time + (now - last));
        last = now;
      }, 1e3);
    } else {
      clearInterval(interval);
    }
  },
  setNote_Mode(state, value) {
    state.note_mode = value;
  },
  eraser({ offsetHover, board, note }) {
    if (offsetHover) {
      const { x, y } = offsetHover;

      if (board[y][x].readonly === true) {
        console.warn(`This cell readonly, can't change. {${x}, ${y}}`);
      } else {
        if (board[y][x].value || note[y][x].length > 0) {
          this.commit("playground/backup", { x, y });

          board[y][x].value = null;
          note[y][x].splice(0);
        }
      }
    }
  },
  hint(state) {
    const { offsetHover, board, hint } = state;
    if (offsetHover) {
      const { x, y } = offsetHover;

      if (board[y][x].readonly === true) {
        console.warn(`This cell readonly, can't change. {${x}, ${y}}`);
      } else {
        if (hint < 1) {
          console.warn(`hint = 0 not active`);
        } else {
          board[y][x].value = board[y][x].def;
          board[y][x].readonly = true;
          state.hint--;
        }
      }
    }
  },

  setReturn(state, value) {
    if (value) {
      state.is_success = true;
    } else {
      state.is_failed = true;
    }
  }
};

export const actions = {
  new(
    {
      commit,
      rootState: {
        settings: { limit_wrong }
      }
    },
    { is_challenges = false, level }
  ) {
    commit("new", {
      is_challenges,
      level,
      limit_wrong
    });
  },
  done({ state, commit, getters }) {
    if (state.length_wrong > 3) {
      ///// wrong
      commit("setReturn", false);
      commit(
        "battles-complete/push",
        {
          ...state
        },
        { root: true }
      );
    } else {
      /// success { root: true })
      commit("setReturn", true);
      if (
        !state.board.some(row => {
          return row.some(col => col.value !== col.def);
        })
      ) {
        commit(
          "battles-complete/push",
          {
            ...state,
            point: getters["playground/point"]
          },
          { root: true }
        );
      }
    }
  },
  oddError({ state, getters, dispatch, commit }, { x, y }) {
    if (getters.validate({ x, y }) === false) {
      commit("oddError");

      if (state.length_wrong > 3) {
        dispatch("done");
        return true;
      }
    }
  }
};
