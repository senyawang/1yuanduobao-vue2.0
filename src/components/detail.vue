<template>
    <div class="bodyer">
        <div class="page-swipe box-space" :style='{"height": swipeHeight+"px"}'>
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for='item in productData.loopImageList'>
                <img :src="item" alt="">
              </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="pro-info">
            <div class="title">
                <span v-if='productData.status==0' class="status"> 进行中</span>
                <span v-if='productData.status==1' class="status"> 已满标</span>
                <span v-if='productData.status==2' class="status"> 已开奖</span>
                {{productData.title}}
            </div>
            <p>期次 {{productData.periodId}}</p>
            <div class="progress">
                <div :style="{'width': productData.percent+'%'}" class="progress-bar"></div>
            </div>
            <div class="ui-flex-box">
                <div class="ui-flex-item">已购买：{{productData.curCount}}</div>
                <div class="ui-flex-item">总需：{{productData.totalCount}}份</div>
                <div class="ui-flex-item">剩余 {{productData.totalCount-productData.curCount}}</div>
            </div>
        </div>

        <div class="ui-box">
            <div v-if='productData.status==1' class="waiting">
                <p>期号：{{productData.periodId}}</p>
                <p>揭晓倒计时：
                    <count-down class='timedown' :text="productData.status==1?'等待开奖':'已开奖'" :endtime="productData.awardTime*1+productData.countDown*1" :servertime='productData.awardTime*1' :id="productData.periodId"></count-down>
                </p>
            </div>
            <div v-if='productData.status==2' class="detail-card">
                <div class="ui-flex-box">
                    <img src="lastPeriod.user.portrait" alt="" class="avatar">
                    <div class="ui-flex-item">
                        获奖者:{{lastPeriod.user.nickName}}<br>
                        期号：{{lastPeriod.periodId}}<br>
                        本期购买：{{lastPeriod.luckyBuyCount}}份<br>
                        揭晓时间：{{formDate(lastPeriod.awardTime)}}
                    </div>
                </div>
                <div class="lucky-num">
                    幸运号码：<span>{{productData.luckyCode}}</span>
                    <mt-button @click.native="" size="small" type='danger' plain>计算详情</mt-button>
                </div>
                
                <span class="flag-hjz"></span>
                <!-- <span class="flag-sqjx"></span> -->

            </div>

            <p class="notice">声明：所有商品抽奖活动与苹果公司（Apple lnc）无关</p>
        </div>

        <div v-if='productData.myBuyCount' class="ui-box box-padding">
            <p>您购买了{{productData.myBuyCount}}份</p>
            <p>
            <a class="link-more" href="#">查看全部</a>
            夺宝号码 {{productData.myBuyCode}} </p>
            
        </div>

        <div class="ui-box">
            <mt-cell title="往期揭晓" is-link>
              <span slot="icon" class="icon i-wqjx"></span>
            </mt-cell>
            <mt-cell title="参与记录">
              <span slot="icon" class="icon i-history"></span>
            </mt-cell>
        </div>

        <div class="record-cont" ref="wrapper">
            <mt-loadmore 
                :autoFill='true' 
                :bottom-method="fetchRecordList" 
                :bottom-all-loaded="allLoaded" 
                :bottomPullText='bottomPullText'
                ref="loadmore">

            <ul class="record-list">
                <li v-for='item in recordList'>
                    <img :src="item.user.portrait" alt="" class="avatar">
                    <h4>{{item.user.nickName}}</h4>
                    <p v-html='item.userIp'></p>
                    <p>参与时间 {{item.buyTime}}</p>
                    <p>本期购买：{{item.buyCount}}份</p>
                </li>
            </ul>
            </mt-loadmore>
        </div>

        <div class="fixed-btn">
            <div class="ui-flex-box">
                <div class="cart-num v-middle">
                    <router-link to='/cart'>
                    <span :data-num="cartNum" class="icon i-cart J_cartNumber"></span>
                    </router-link>
                </div>
                <div class="ui-flex-item">
                    <mt-button @click="add2Cart(productData.productId, item.periodId, productData.limitCount)" size="large" type='danger' plain>加入清单</mt-button>
                </div>
                <div class="ui-flex-item">
                    <router-link to='/cart'>
                    <mt-button @click="add2Cart(productData.productId, item.periodId, productData.limitCount)" size="large" type='danger'>立即购买</mt-button>
                    <router-link to='/cart'>
                </div>
            </div>
        </div>


    </div>
</template>

<style lang='scss' scoped>
.record-cont{
    overflow: scroll;
    /*padding-bottom: 100px;*/
}
.record-list{
    margin: 0 20px 20px 100px;
    border-left: 1px solid #ccc;
    li{
        position: relative;
        padding: 20px 20px 20px 80px;
    }
    .avatar{
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        left: -50px;

    }
}

.pro-info{
    text-align: left;
    padding: 20px;
    color: #999;
    background: #FFF;
    .title{
        color: #333;
        margin-bottom: 10px;
    }
    .status{
        padding: 6px 15px;
        background: green;    
        color: #FFF;
        border-radius: 10px;
    }
    .ui-flex-item{
        &:nth-child(2){
            text-align: center;
        }
        &:last-child{
            text-align: right;
        }
    }
}
.progress{
    height: 20px;
    margin: 10px 0;
    .progress-bar{
        height: 20px;
    }
}

.detail-card{
    position: relative;
    width: 718px;
    height: 256px;
    padding: 12px;
    margin: 16px;
    background: url(../assets/img/detail-card-bg.png) no-repeat;
    background-size: 100%;
    text-align: left;
    .ui-flex-box{
        height: 164px;
    }
    .avatar{
        width: 100px;
        height: 100px;
        margin: 30px 50px;
        border-radius: 50%;
    }
    .lucky-num{
        padding: 0 20px;
        color: #FFF;
        line-height: 68px;
        span{
            font-size: 34px;
        }
    }
    .mint-button--small{
        float: right;
        height: 54px;
        margin-top: 7px;
        border-color: #fff;
        color: #FFF;
    }
    .flag-hjz{
        position: absolute;
        left: 0;
        top: 0;
        width: 83px;
        height: 96px;
        background: url(../assets/img/flag-hjz.png) no-repeat;
        background-size: 100%;
    }
    .flag-sqjx{
        position: absolute;
        right: 30px;
        top: 0;
        width: 48px;
        height: 148px;
        background: url(../assets/img/flag-sqjx.png) no-repeat;
        background-size: 100%;
    }
}
.notice{
    color: #000;
    text-align: center;
    padding-bottom: 10px;
}
.link-more{
    float: right;
    color: #d43d3d;
}
</style>

<script>

import Vue from 'vue'
import store from '../vuex/store.js'
import { Swipe, SwipeItem } from 'mint-ui';

import { Indicator } from 'mint-ui';

import { Loadmore } from 'mint-ui';

import { Button } from 'mint-ui';

import { Cell } from 'mint-ui';

import CountDown from './common/countDown.vue'

Vue.component(Cell.name, Cell);

Vue.component(Button.name, Button);

Vue.component(Loadmore.name, Loadmore);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

const detailUrl = './product/period_info.html'

const record = './product/partake_record_list.html'

export default {
    name: 'index',
    replace: false,
    components: {
        CountDown
    },
    data() {
        return {
            swipeHeight: 200,
            productData: '',
            allLoaded: false,
            bottomStatus: '',
            recordList: [],
            page: 1,
            lastPeriod: '',
            periodId: this.$route.params.periodId,
            wrapperHeight: 500,
            bottomPullText: '上拉刷新'
        }
    },
    beforeMount(){
        // this.fetchRecordList()
    },

    created(){

        this.getDetail()

        // let data = window.localStorage.getItem('PRODUCTDATA') || ''
        // this.productData = JSON.parse(data)


        let ww = window.outerWidth
        this.swipeHeight = ww*340/640

        this.fetchRecordList()
        console.log(this.productData)

    },
    mounted() {
      // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },

    computed: {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        
    },
    methods: {
        getDetail(){
            let self = this

            Vue.http.get(detailUrl+this.params+"&periodId=" + this.periodId)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data
                    self.productData = response.period
                    self.lastPeriod = response.lastPeriod
                })
        },
        fetchRecordList(){
            let self = this

            Vue.http.get(record+this.params+"&toPage="+self.page + "&periodId=" + this.productData.periodId)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    let rl = response.recordList.length

                    for(let i=0; i<rl; i++){
                        self.recordList.push(response.recordList[i])
                    }
                    
                    console.log(self.recordList)

                    self.$refs.loadmore.onBottomLoaded()

                    if(response.page.totalPage == self.page){
                        self.allLoaded = true
                        self.bottomPullText = '亲，没有了...'
                        return
                    }

                    self.page++

                    
                })
        },
        
        handleBottomChange(status) {
            this.bottomStatus = status;
          }
    }
    
}
</script>
