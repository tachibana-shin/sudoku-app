const properties = [
  {
    text: "Hiệu ứng âm thanh",
    prop: "sound",
    def: true
  },
  {
    text: "Thời gian chờ màn hình",
    prop: "time_wait_screen",
    def: false
  },/////////////
  {
    text: "Đồng hồ bấm giờ",
    prop: "stop_watch",
    def: true
  },
  {
    divider: true
  },
  {
    text: "Hiển thị điểm",
    prop: "show_point",
    sub: "Hiển thị số điểm dạt được trong trò chơi",
    def: true
  },
  {
    text: "Nhập số trước",
    prop: "extend_step",
    sub: "Nhấn và giữ một số để khóa và sử dụng số đó cho nhiều ô.",
    def: false
  },
  {
    text: "Giới hạn lỗi",
    prop: "limit_wrong",
    sub: "Giới hạn số lỗi có thể mắc phải ở mức 3 lỗi trong một ván chơi.",
    def: true
  },
  {
    text: "Tự động kiểm tra lỗi",
    prop: "auto_check_wrong",
    sub: "Đánh dấu các số không khớp với lời giải sudoku cuối cùng.",
    def: true,
    validate(_vm) {
      if (_vm.limit_wrong === true) {
        return true;
      }

      return undefined; // 0x0
    }
  },
  {
    text: "Ẩn các số đã dùng",
    prop: "hidden_num_used",
    sub: "Ẩn các số đã được đặt trong 9 ô khác nhau.",
    def: true
  },///////////
  {
    text: "Bôi đậm trùng lặp",
    prop: "bold_num_repeat",
    sub: "Bôi đạm những số lặp lại trong cùng một hàng, cột và khối.",
    def: true
  },//////
  {
    text: "Tô sáng theo vùng",
    prop: "highlight_by_regison",
    sub: "Tô sáng một khối, cột hay hàng của ô được chọn.",
    def: true
  },
  {
    text: "Tô sáng những số giống nhau",
    prop: "lighlight_num_repeat",
    sub: "Khi bạn chọn một ô có số, những số giống số đó sẽ được tô sáng.",
    def: true
  },
  {
    text: "Tự động xóa ghi chú",
    prop: "auto_rm_note",
    sub:
      "Khi một số được điền vào ô, xóa số đó ở tất cả các ghi chú trong cùng một hàng, cột hoặc trong khối",
    def: true
  },
  {
    text: "Chế độ nâng cao",
    prop: "advanced",
    sub: "Chế độ này sẽ không cho bạn biết bạn đẫ điền đúng chưa",
    def: false
  },
  {
    divider: true
  },
  {
    text: "Gỡ bỏ quảng cáo",
    noSwitch: true
  },
  {
    text: "Khôi phục đơn hàng",
    noSwitch: true
  }
];

export const state = () => {
  const state = {};

  properties.forEach(({ prop, def }) => {
    if (prop) {
      state[prop] = def;
    }
  });

  state.properties = properties;

  return state;
};

export const mutations = {
  set(state, { prop, value }) {
    state[prop] = value;
  }
};
