<template>
    <div style="position:absolute;">
        <div class="b-map-tip-wrapper">
            <template v-if="info!=null">
                <div class="b-tip-title">
                    <span class="b-title">{{info.title}}</span>
                    <div class="b-close" @click="closeMe"></div>
                </div>
                <div class="b-tip-content">
                    <div v-if="info.startTime">停车开始时间：{{info.startTime}}</div>
                    <div v-if="info.endTime">停车结束时间：{{info.endTime}}</div>
                    <div v-if="info.durationText">停车时长：{{info.durationText}}</div>
                    <div v-if="info.address">停车位置：{{info.address}}</div>
                </div>
            </template>
            <div class="b-map-tip-down"></div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';

    //自定义覆盖物
    function ComplexCustomOverlay(point,opts){
        this._point=point;
        this._options=opts || {};
    }

    ComplexCustomOverlay.prototype=new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize=function(map){
        var that=this;
        this._map=map;

        let baiduTip=new BaiduTipCtr();
        baiduTip.info=this._options;
        baiduTip.$on('close',function(){
            map.removeOverlay(that);
        });
        baiduTip.$mount();
        this._div=baiduTip.$el;
        map.getPanes().labelPane.appendChild(this._div);
        this.addEventListener('remove',function(){
            baiduTip.$destroy();
        });
        return this._div;
    }
    ComplexCustomOverlay.prototype.getMap=function(){
        return this._map;
    };
    ComplexCustomOverlay.prototype.draw=function(){
        var map=this._map;
        var pixel=map.pointToOverlayPixel(this._point);
        this._div.style.left=pixel.x+"px";
        this._div.style.top=pixel.y+"px";
    };

    export {ComplexCustomOverlay};

    let BaiduTip={
        name:"BaiduTip",
        props:{
            info:{
                type:Object,
                default:function(){
                    return {
                        title:'',
                        startTime:'',
                        endTime:'',
                        durationText:'',
                        address:''
                    };
                }
            }
        },
        data(){
            return {};
        },
        components:{},
        computed:{},
        watch:{},
        methods:{
            closeMe(){
                this.$emit('close',{});
            }
        },
        mounted:function(){
        }
    };
    let BaiduTipCtr=Vue.extend(BaiduTip);
    export default BaiduTip;
</script>

<style lang="scss" scoped>
    /*地图tip筐样式开始*/
    .b-map-tip-wrapper{
        width:370px;
        position:absolute;
        margin-left:-185px;
        bottom:0;
        font-size:14px;
        user-select:none;
        .b-tip-title{
            height:30px;
            line-height:30px;
            background-color:#303846;
            color:#fff;
            padding-left:10px;
            padding-right:10px;
            position:relative;
        }
        .b-close{
            position:absolute;
            top:10px;
            right:10px;
            width:12px;
            height:12px;
            background-color:transparent;
            cursor:pointer;
            transform:rotate(45deg);
            &:after{
                position:absolute;
                content:"";
                width:12px;
                height:2px;
                top:5px;
                left:0;
                background-color:#fff;
            }
            &:before{
                position:absolute;
                content:"";
                width:2px;
                height:12px;
                top:0;
                left:5px;
                background-color:#fff;
            }
        }
        .b-map-tip-down{
            position:absolute;
            bottom:0;
            left:50%;
            margin-left:-11px;
            width:22px;
            height:20px;
            background-image:url(../assets/images/map/map_tip_down.png);
        }

        .b-tip-content{
            border-bottom:1px solid #ABA9A9;
            border-left:1px solid #ABA9A9;
            border-right:1px solid #ABA9A9;
            padding-top:6px;
            background-color:#fff;
            margin-bottom:18px;
            > div{
                line-height:30px;
                padding-left:10px;
                padding-right:10px;
            }
        }
    }
</style>