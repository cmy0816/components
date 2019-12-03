<template>
  <div class="truck-keyboard" @click.stop="stopBubble" v-show="showKey">
    <div class="close" @click="hideKeyboard"></div>
    <div class="board" v-show="currBoard=='city'">
      <div class="line" v-for="(line,index) in city" :key="index">
        <div
          class="item"
          v-for="(city,indey) in line"
          @click="clickCity(city)"
          :title="city.name"
          :key="indey"
        ></div>
      </div>
    </div>
    <div class="board" v-show="currBoard=='letter'">
      <div class="line" v-for="(line,index) in letter" :key="index">
        <div
          class="item"
          :class="itemCls(one)"
          @click="clickLetter(one)"
          v-for="(one,indey) in line"
          :title="one.name"
          :key="indey"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import "./ProKeyboard.scss";
export default {
  props: {
    dot: Boolean,
    vno: String,
    isShow: {
      type: Boolean,
      default: false
    },
    hideList:Function
  },
  data: function() {
    return {
      currBoard: "city",
      city: [
        [
          { name: "京", key: "0", dsb: 0 }, //dsb === 1 禁止点击  0 可点击
          { name: "津", key: "1", dsb: 0 },
          { name: "渝", key: "2", dsb: 0 },
          { name: "沪", key: "3", dsb: 0 },
          { name: "冀", key: "4", dsb: 0 },
          { name: "晋", key: "5", dsb: 0 },
          { name: "辽", key: "6", dsb: 0 },
          { name: "吉", key: "7", dsb: 0 }
        ],
        [
          { name: "黑", key: "8", dsb: 0 },
          { name: "苏", key: "9", dsb: 0 },
          { name: "浙", key: "10", dsb: 0 },
          { name: "皖", key: "11", dsb: 0 },
          { name: "闽", key: "12", dsb: 0 },
          { name: "赣", key: "13", dsb: 0 },
          { name: "鲁", key: "14", dsb: 0 },
          { name: "豫", key: "15", dsb: 0 }
        ],
        [
          { name: "鄂", key: "16", dsb: 0 },
          { name: "湘", key: "17", dsb: 0 },
          { name: "粤", key: "18", dsb: 0 },
          { name: "琼", key: "19", dsb: 0 },
          { name: "川", key: "20", dsb: 0 },
          { name: "贵", key: "21", dsb: 0 },
          { name: "云", key: "22", dsb: 0 },
          { name: "陕", key: "23", dsb: 0 }
        ],
        [
          { name: "甘", key: "24", dsb: 0 },
          { name: "青", key: "25", dsb: 0 },
          { name: "蒙", key: "26", dsb: 0 },
          { name: "桂", key: "27", dsb: 0 },
          { name: "宁", key: "28", dsb: 0 },
          { name: "新", key: "29", dsb: 0 },
          { name: "藏", key: "31", dsb: 0 },
          { name: "←", key: "38" }
        ]
      ],
      letter: [
        [
          { name: "1", key: "0", dsb: 0 },
          { name: "2", key: "1", dsb: 0 },
          { name: "3", key: "2", dsb: 0 },
          { name: "4", key: "3", dsb: 0 },
          { name: "5", key: "4", dsb: 0 },
          { name: "6", key: "5", dsb: 0 },
          { name: "7", key: "6", dsb: 0 },
          { name: "8", key: "7", dsb: 0 },
          { name: "9", key: "8", dsb: 0 },
          { name: "0", key: "9", dsb: 0 }
        ],
        [
          { name: "A", key: "10", dsb: 0 },
          { name: "B", key: "11", dsb: 0 },
          { name: "C", key: "12", dsb: 0 },
          { name: "D", key: "13", dsb: 0 },
          { name: "E", key: "14", dsb: 0 },
          { name: "F", key: "15", dsb: 0 },
          { name: "G", key: "16", dsb: 0 }
        ],
        [
          { name: "H", key: "17", dsb: 0 },
          { name: "I", key: "18", dsb: 1 },
          { name: "J", key: "19", dsb: 0 },
          { name: "K", key: "20", dsb: 0 },
          { name: "L", key: "21", dsb: 0 },
          { name: "M", key: "22", dsb: 0 },
          { name: "N", key: "23", dsb: 0 }
        ],
        [
          { name: "O", key: "24", dsb: 1 },
          { name: "P", key: "25", dsb: 0 },
          { name: "Q", key: "26", dsb: 0 },
          { name: "R", key: "27", dsb: 0 },
          { name: "S", key: "28", dsb: 0 },
          { name: "T", key: "29", dsb: 0 },
          { name: "U", key: "30", dsb: 0 }
        ],
        [
          { name: "V", key: "31", dsb: 0 },
          { name: "W", key: "32", dsb: 0 },
          { name: "X", key: "33", dsb: 0 },
          { name: "Y", key: "34", dsb: 0 },
          { name: "Z", key: "35", dsb: 0 },
          //{ name: "下一辆", key: "36", dsb: 1 },
          { name: "←", key: "38" }
        ]
      ],
      showKey: true
    };
  },
  created: function() {
    var t = this;
    t.docTap = function(e) {
      t.$emit("hide", {});
    };
    t.onPageBack = function(e) {
      history.pushState(null, null, document.URL);
      t.$emit("hide", {});
    };
    //document.body.addEventListener("click", t.docTap);
    this.changeStatus(this.vno);
    //下面的 try catch 是为了在
    try {
      // disable history.back
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", t.onPageBack);
    } catch (e) {}
  },
  beforeDestroy: function() {
    try {
      window.removeEventListener("popstate", this.onPageBack);
      history.back();
    } catch (e) {}
    //document.body.removeEventListener("click", this.docTap);
  },
  methods: {
    changeStatus: function(newVal) {
      //根据vno来启用/禁用 某些键 dot 是指 是否有 '下一辆' 按钮
      if (this.dot) {
        var arr = newVal.split(",");
        var vno = arr[arr.length - 1];
        if (vno.length == 0) {
          this.currBoard = "city";
        } else {
          this.currBoard = "letter";
          if (vno.length == 1) {
            //数字禁用,字母启用,下一辆禁用
            this.letter.forEach(function(list, i) {
              list.forEach(function(item) {
                //删除键不包含在内
                if (item.hasOwnProperty("dsb")) {
                  if (i == 0) {
                    //数字禁用
                    item.dsb = 1;
                  } else {
                    // O                   I               下一辆
                    if (item.key != 24 && item.key != 18 && item.key != 36) {
                      //字母启用
                      item.dsb = 0;
                    } else {
                      //O I 下一辆 禁用
                      item.dsb = 1;
                    }
                  }
                }
              });
            });
          } else {
            if (vno.length == 7) {
              //数字禁用,字母禁用,下一辆启用
              this.letter.forEach(function(list, i) {
                list.forEach(function(item) {
                  //删除键不包含在内
                  if (item.hasOwnProperty("dsb")) {
                    if (item.key != 36) {
                      //除了下一辆 都 禁用
                      item.dsb = 1;
                    } else {
                      //下一辆 启用
                      item.dsb = 0;
                    }
                  }
                });
              });
            } else {
              //数字禁用,字母启用,下一辆禁用
              this.letter.forEach(function(list) {
                list.forEach(function(item) {
                  if (item.hasOwnProperty("dsb")) {
                    // O                   I               下一辆
                    if (item.key != 24 && item.key != 18 && item.key != 36) {
                      item.dsb = 0;
                    } else {
                      item.dsb = 1;
                    }
                  }
                });
              });
            }
          }
        }
      } else {
        if (newVal.length == 0) {
          this.currBoard = "city";
        } else {
          this.currBoard = "letter";
          if (newVal.length == 1) {
            //禁用数字 启用字母 禁用'下一辆'
            this.letter.forEach(function(arr, i) {
              arr.forEach(function(item) {
                if (item.hasOwnProperty("dsb")) {
                  if (i == 0) {
                    item.dsb = 1;
                  } else {
                    //  O                    I           下一辆
                    if (item.key != 24 && item.key != 18 && item.key != 36) {
                      item.dsb = 0;
                    } else {
                      item.dsb = 1;
                    }
                  }
                }
              });
            });
          } else {
            if (newVal.length == 7) {
              this.letter.forEach(function(arr) {
                arr.forEach(function(item) {
                  if (item.hasOwnProperty("dsb")) {
                    item.dsb = 1;
                  }
                });
              });
            } else {
              this.letter.forEach(function(arr) {
                arr.forEach(function(item) {
                  if (item.hasOwnProperty("dsb")) {
                    if (item.key != 24 && item.key != 18 && item.key != 36) {
                      item.dsb = 0;
                    } else {
                      item.dsb = 1;
                    }
                  }
                });
              });
            }
          }
        }
      }
    },
    stopBubble: function(e) {},
    hideKeyboard: function() {
      if (this.isShow) {
        this.hideList();
        //this.showKey = false;
      } else {
        this.$emit("hide", {});
      }
    },
    clickCity: function(city) {
      if (city.key == 38) {
        //回退键 删除
        this.$emit("delete", {});
      } else {
        this.currBoard = "letter";
        this.$emit("input", city);
      }
    },
    clickLetter: function(letter) {
      if (letter.dsb != 1) {
        if (letter.key == 38) {
          //回退键 删除
          this.$emit("delete", {});
        } else {
          if (letter.key != 36) {
            this.$emit("input", letter);
          } else {
            this.$emit("input", { name: "," });
          }
        }
      }
    },
    itemCls: function(one) {
      var arr = [];
      if (one.dsb == 1) {
        arr.push("dis");
      }
      if (one.key == 36) {
        arr.push("s");
      }
      return arr;
    }
  },
  watch: {
    vno: function(newVal, oldVal) {
      this.changeStatus(newVal);
    }
  }
};
</script>