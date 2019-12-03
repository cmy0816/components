<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                    <router-view/>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    import {list} from './router.js';

    export default {
        name:"App",
        data(){
            return {
                transitionName:'slide-left',
                list:list
            };
        },
        watch:{
            list(newVal,oldVal){
                //加了动态效果,可不怎么明显
                if(newVal.action=='go'){
                    this.transitionName='slide-left';
                }else{
                    this.transitionName='slide-right';
                }
            }
        },
        mounted(){
            window.app=this;
        }
    };
</script>
<style lang="scss">
    #app{
        font-family:'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
        color:#2c3e50;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        overflow:hidden;
    }
    div,ul,li,input{
        box-sizing:border-box;
        font-size:14px;
    }
    input[type=button],input[type=submit],input[type=reset],input[type=search]{
        appearance:none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .slide-left-leave-active,.slide-right-leave-active{
        transition: all 1.5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
    }
</style>
