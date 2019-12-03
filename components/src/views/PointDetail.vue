<template>
    <div class="point-detail">
        <div class="tags">
            <div class="tag-item" @click="tabIndex=one.idx;" :class="tabIndex==one.idx ? 'active' : ''" v-for="one in tags">{{one.name}}</div>
        </div>
        <div v-show="tabIndex==0" class="list">
            <div class="list-inner">
                <el-table ref="trackTable" highlight-current-row :data="trackPageList" @cell-mouse-enter="updateAddress" height="100%" border style="width:100%" size="mini">
                    <el-table-column prop="time" label="上报时间" width="180">
                        <template slot-scope="scope">
                            {{formatTime(scope.row.time)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="mileage" label="GPS里程(公里)" width="140">
                        <template slot-scope="scope">
                            {{(scope.row.mileage/1000).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="speed" label="速度(km/h)" width="140"></el-table-column>
                    <el-table-column prop="address" label="位置描述">
                        <template slot-scope="scope">
                            {{scope.row.address ? scope.row.address : '鼠标划过获取'}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="list-pager">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="50"
                        layout="total, prev, pager, next"
                        :total="trackList ? trackList.length : 0">
                </el-pagination>
            </div>
        </div>
        <div v-show="tabIndex==1" class="list">
            <el-table ref="stopTable" highlight-current-row :data="stopList" height="100%" border style="width:100%" size="mini" @cell-mouse-enter="updateAddress">
                <el-table-column prop="durationText" label="停车时长" width="120"></el-table-column>
                <el-table-column prop="startTime" label="停车开始时间" width="180"></el-table-column>
                <el-table-column prop="endTime" label="停车结束时间" width="180"></el-table-column>
                <el-table-column prop="address" label="停车位置">
                    <template slot-scope="scope">
                        {{scope.row.address ? scope.row.address : '鼠标划过获取'}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { Button, Select,Option,Table,TableColumn,Input,Radio,RadioButton,RadioGroup,Pagination,DatePicker} from 'element-ui';

    Vue.component(Button.name, Button);
    Vue.component(Input.name,Input);
    Vue.component(Select.name, Select);
    Vue.component(Option.name, Option);
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(Pagination.name, Pagination);
    Vue.component(DatePicker.name, DatePicker);

    import {formatDate} from '../utils/util.js';
    export default {
        name:"PointDetail",
        props:{
            trackList:{
                type:Array,
                default:null
            },
            //根据trackIndex来选中某行/翻页到某页
            trackIndex:{
                type:Number,
                default:0
            },
            stopList:{
                type:Array,
                default:null
            },
            //根据 stopUid来选中 某行
            stopUid:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                tabIndex:0,
                tags:[{name:"位置明细",idx:0},{name:"停留点",idx:1}],
                currentPage:1
            };
        },
        components:{},
        computed:{
            trackPageList(){
                if(this.trackList){
                    return this.trackList.slice((this.currentPage-1)*50,this.currentPage*50);
                }else{
                    return null;
                }
            }
        },
        watch:{
            trackIndex(newVal,oldVal){
                //newVal 是数组的索引值
                this.currentPage=Math.ceil((newVal+1)/50);
                let row=this.trackList ? this.trackList[newVal] : null;
                if(row){
                    this.$refs.trackTable.setCurrentRow(row);
                    this.$nextTick(()=>{
                        //滚动到合适的位置 36 是行高
                        let scroller=this.$refs.trackTable.$el.querySelector('.el-table__body-wrapper');
                        scroller.scrollTop=(newVal%50)*36;
                    });
                }
            },
            stopUid(newVal,oldVal){
                this.selectStopRow(newVal);
            }
        },
        methods:{
            handleSizeChange(val){
                //size 不发生变化 我已经顶死了50条每页
                //console.log('sizechange',val);
            },
            handleCurrentChange(val){
                //console.log('currchange',val);
                this.currentPage=val;
            },
            selectStopRow(uid){
                if(!this.stopList){
                    return;
                }
                let row=this.stopList.find(item=>{
                    return item.uid==uid;
                });
                if(row){
                    this.$refs.stopTable.setCurrentRow(row);
                }
            },
            formatTime(date){
                return formatDate(date);
            },
            updateAddress(row, column, cell, event){
                //console.log(row, column, cell, event);
                if(column.property=='address'){
                    if(!row.address && !row.sending){
                        let myGeo;
                        if(this.myGeo){
                            myGeo=this.myGeo;
                        }else{
                            myGeo=new BMap.Geocoder();
                            this.myGeo=myGeo;
                        }
                        // 根据坐标得到地址描述 使用百度的服务
                        row.sending=true;
                        myGeo.getLocation(new BMap.Point(row.lng,row.lat),function(result){
                            row.sending=false;
                            if(result){
                                row.address=result.address;
                            }
                        });
                    }
                }
            }
        },
        mounted:function(){
            window.pd=this;
        }
    }
</script>

<style lang="scss" scoped>
    .point-detail{
        position:relative;
        width:100%;
        height:100%;
        .tags{
            height:38px;
            position:relative;
            z-index:100;
            font-size:0;
            .tag-item{
                line-height:38px;
                font-size:14px;
                color:#333;
                display:inline-block;
                vertical-align:top;
                padding:0 15px;
                position:relative;
                background-color:#fff;
                border:1px solid #C9CBC6;
                border-top:none;
                margin-left:-1px;
                cursor:pointer;
                &.active{
                    color:#3385ff;
                    border-bottom:1px solid #fff;
                }
            }
        }
        .list{
            position:absolute;
            top:38px;
            left:0;
            right:0;
            bottom:0;
            .list-inner{
                position:absolute;
                top:0;
                left:0;
                bottom:36px;
                right:0;
            }
            .list-pager{
                position:absolute;
                bottom:0;
                height:36px;
                left:0;
                right:0;
            }
        }
    }
</style>