<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item
      v-for="(item,index) in itemArr"
      :key="index"
      :label="item.type == 'timebetween'?item.label+ ':':''"
    >
      <el-input v-if="item.type == 'text'" v-model="formInline[item.key]" :placeholder="item.label"></el-input>
      <el-select
        v-else-if="item.type == 'select'"
        v-model="formInline[item.key]"
        :placeholder="item.label"
      >
        <el-option
          v-for="items in item.options"
          :key="items.value"
          :label="items.label"
          :value="items.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-else-if="item.type == 'timebetween'"
        v-model="formInline[item.key[0]]"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-input v-else v-model="formInline[item.key]"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitC" size="mini">查询</el-button>
      <el-button type="primary" @click="reset" size="mini">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 后台管理系统筛选项和表格居多，每次都写又太麻烦，所以想写成一个公共的组件，每次只需要配置就可以了 cmy/2019/11/21
// label  就是label 没什么好说的 必填参数，没啥商量的
// type 默认为text--> 输入框 select--> 选择器 timebetween --> 时间范围（带时分秒）
// default 默认值 不写为""
// key 专递给后台的参数名
// options type为其他类型的时候 为必填参数 可选项
// 后期想到别的再加吧
export default {
  name: "Form",
  props: {
    itemArr: {
      type: Array,
      required: true,
      default: () => [
        {
          label: "",
          type: "",
          key: "",
          default: ""
        }
      ]
    },
    onSubmit: {
      type: Function,
      required: true,
      default: () => {}
    },
    resetF: {
      //清缓存使用
      type: Function,
      default: () => {}
    }
  },
  data() {
    let itemArr = this.itemArr;
    let formInline = {};
    itemArr.forEach(item => {
      if (item.type == "timebetween") {
        formInline[item.key[0]] = item.default ? item.default : "";
      } else {
        formInline[item.key] = item.default ? item.default : "";
      }
    });
    return {
      formInline
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    onSubmitC() {
      //提交
      let data = { ...this.formInline };
      this.itemArr.forEach(item => {
        if (item.type == "timebetween") {
          let arr = data[item.key[0]];
          if (Array.isArray(arr)) {
            data[item.key[0]] = arr[0];
            data[item.key[1]] = arr[1];
          }
        }
      });
      console.log(data, "提交的数据");
      this.onSubmit(data);
    },
    reset() {
      // 清空
      let form = this.formInline;
      for (let key in form) {
        form[key] = "";
      }
      this.formInline = form;
      this.resetF();
    }
  },
  mounted: function() {}
};
</script>
