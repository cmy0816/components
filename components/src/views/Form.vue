<template>
  <div class="form">
    <Form :itemArr="itemArr" :onSubmit="onSubmit" :resultF="resultF"/>
    <p>提交的数据<pre>
      {{JSON.stringify(data,null,2)}}</pre>
      </p>
    <el-button type="primary" @click="goBack" size="mini">返回</el-button>
    <p>配置项格式<br/>
    <pre>{{JSON.stringify(itemArr,null,2)}}</pre>
    </p>
  </div>
</template>
<script>
const itemArr = [
  {
    label: "姓名",
    type: "text",
    key: "name",
    default: ""
  },
  {
    label: "数据接入时间",
    type: "timebetween",
    key: ["startDate", "endDate"],
    default: ""
  },
  {
    label: "车辆分类",
    type: "select",
    key: "vehicleType",
    default: "",
    options: [
      {
        value: "1",
        label: "普通货车"
      },
      {
        value: "2",
        label: "厢式货车"
      }
    ]
  }
];
import Form from "./FormCom/Form";
export default {
  components: {
    Form
  },
  data(){
    return {
      data:{},
      itemArr:itemArr
    }
  },
  methods:{
    onSubmit(data){
      this.data = data
    },
    resultF(){

    },
    goBack(){
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scrope>
.form{
  padding:50px;
}
</style>