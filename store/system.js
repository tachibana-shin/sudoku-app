export const state = () => ({
  playing: false,
  levels: [
    { text: "Nhanh", value: 0 },
    { text: "Dễ", value: 1 },
    { text: "Trung bình", value: 2 },
    { text: "Khó", value: 3 },
    { text: "Chuyên gia", value: 4 },
    { text: "Khổng lồ", value: 5 }
  ],
  lang: "vi-VN"
});

export const mutations = {
  setPlaying(state, value) {
    state.playing = value;
  }
};
