<template>
    <div class="rect">
        <a class="link" @click="toPage(one)" v-for="(one,index) in pages" :key="index">{{one.name}}</a>
    </div>
</template>

<script>
    export default {
        name:"Home.vue",
        data(){
            return {
                pages:[
                    {path:'/keyboard',name:'移动端车牌号虚拟键盘'},
                    {path:'/form',name:'PC后台筛选框'}
                ],
            };
        },
        components:{},
        computed:{},
        watch:{},
        methods:{
            toPage:function(one){
                this.$router.push(one.path);
            }
        },
        mounted:function(){
        }
    }
</script>

<style lang="scss" scoped>
    .rect{
        padding:10px;
    }
    a.link{
        cursor:pointer;
        list-style:none;
        display:inline-block;
        margin-right:10px;
        color:blue;
        &:hover{
            text-decoration:underline;
        }
    }
</style>