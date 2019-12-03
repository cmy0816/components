<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 11:00:18
 * @LastEditTime: 2019-12-03 11:17:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="proofread">
    <div class="search">
      <input
        v-model.trim="vnos"
        @touchstart.prevent="showSoftKey"
        type="text"
        disabled
        placeholder="请输入车牌号"
      />
      <span @click="goBack" class="btn">返回</span>
    </div>
    <span>您输入的车牌号为{{vnos}}</span>
    <ProKeyboard
      v-if="isShowKeyboard"
      :vno="vnos"
      :dot="true"
      @hide="isShowKeyboard=false"
      @delete="onDelete"
      @input="onInput"
    />
  </div>
</template>
<style lang="scss" scoped>
.proofread {
  .search {
    height: 40px;
    padding: 5px;
    & > input {
      display: inline-block;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-left: 5px;
      padding-left: 10px;
      width: calc(100% - 60px);
    }
  }
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 14px;
  }
  input:disabled {
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    color: #aca899;
  }
  span.btn {
    height: calc(100% - 2px);
    background: #3385ff;
    width: 40px;
    float: right;
    margin-right: 5px;
    color: #fff;
    font-size: 0.24rem;
    line-height: 32px;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
  }
}
</style>

<script>
import ProKeyboard from "./KeyboardCom/ProKeyboard";
export default {
  components: {
    ProKeyboard
  },
  data() {
    return {
      vnos: "",
      isShowKeyboard: false,
      showVnos:"",
    };
  },
  methods: {
    onDelete(e) {
      this.vnos = this.vnos.substr(0, this.vnos.length - 1);
    },
    onInput(e) {
      this.vnos += e.name;
    },
    showSoftKey(e) {
        this.isShowKeyboard = true;
    },
    goBack() {
      this.$router.push('/');
    }
  },
  mounted() {}
};
</script>
