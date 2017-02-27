<template>
    <div class="bodyer">
        <div class="page-swipe">
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for='item in banner'>
                <a :href='item.targetUrl'>
                <img :src="item.img" alt="">
                </a>
              </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="toutiao ui-flex-box">
        <!-- <button @click="show = !show">
            Toggle render
          </button> -->
            <transition
                    
            <div v-show='show' class="i-tt"><img src="../assets/img/dbtt.png" width="41" alt=""></div>
            </transition>
            <!-- <ul class="toutiao-list ui-flex-item"> -->
                <transition-group 
                    tag='ul'  
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutUp"
                    name='list-complete'
                    class="toutiao-list ui-flex-item">
                <li v-for='item in lamplist' class="list-complete-item" v-bind:key='item' v-html='item.title'>
                </li>
                </transition>
            <!-- </ul> -->
        </div>

        <div class="zxjx box-space">
            <ul class="ui-pro-list column3">
                <li v-for='item in timeDown' class="ui-pl-item">
                    <a href="#">
                        <img :src="item.listImg" alt="">
                        <p class="text-ellipsis">{{item.title}}</p>
                        <p><count-down class='timedown' :text="item.status==1?'等待开奖':'已开奖'" :endtime="item.awardTime*1+item.countDown*1" :servertime='item.awardTime*1' :id="item.periodId"></count-down></p>
                    </a>
                </li>

            </ul>
        </div>

        <mt-navbar v-model="selected">
          <mt-tab-item id="1003">人气</mt-tab-item>
          <mt-tab-item id="1004">最新</mt-tab-item>
          <mt-tab-item id="1005">进度</mt-tab-item>
          <mt-tab-item id="1006">高价</mt-tab-item>
          <mt-tab-item id="1007">低价</mt-tab-item>
        </mt-navbar>

        <div class="product-cont">
             <!-- <mt-loadmore :autoFill='true' :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
            <ul class="ui-pro-list column2">
                <li v-for='(item,index) in productList' class="ui-pl-item">
                    <router-link 
                        @click.native='linkProduct(index)'
                        :to='{
                            name: "product", 
                            params: {
                                periodId: item.periodId
                            }
                        }'>
                        <img :src="item.listImg" alt="">
                        <p class="text-ellipsis">{{item.title}}</p>
                    </router-link>
                        
                        <div class="ui-flex-box">
                            <div class="ui-flex-item">
                                <p class="c-gray">开奖进度 4%</p>
                                <div class="progress">
                                    <div style="width:50%;" class="progress-bar"></div>
                                </div>
                            </div>
                            <mt-button @click="add2Cart(item.productId, item.periodId, item.limitCount)" size='small' type='danger' plain>加入清单</mt-button>
                        </div>
                    
                </li>
            </ul>
            <!-- </mt-loadmore> -->
        </div>

    </div>
</template>

<script>

import Vue from 'vue'
import store from '../vuex/store.js'
import { Swipe, SwipeItem } from 'mint-ui';

import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
import { Indicator } from 'mint-ui';

import { Loadmore } from 'mint-ui';

import { Button } from 'mint-ui';

import CountDown from './common/countDown.vue'


Vue.component(Button.name, Button);

Vue.component(Loadmore.name, Loadmore);

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

const configUrl = './sys/config.html'
const lampList = './product/lamp_list.html'
const timeDown = './product/finish_period_list.html'
const proList = './product/period_list.html'

let params = '?asign=5439f2bd4f2c463ce8172aee1a9c9b25&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&limit=4&os=IOS&t=1481024101&version=1.0'

let params1 = '?asign=07a71f8180b3cc376b5aba8979d3aa2d&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1481025662&tabId=1003&version=1.0'

export default {
    name: 'index',
    replace: false,
    components: {
        CountDown
    },
    data() {
        return {
            show: true,
            selected: '1003',
            banner: [],
            lamplist: [
                {
                    "periodId": "488835",
                    "productId": "1709",
                    "title": "1恭喜<font color='#519fff'>用户158****5764<\/font>获得汰渍 Tide 全效洗衣液",
                    "user": {
                        "userId": "12211517",
                        "portrait": "http://o8nxuxipm.bkt.clouddn.com/fengkuangduobaologo.jpg"
                    },
                    "event": {
                        "messageType": "22",
                        "data": {
                            "targetId": "488835"
                        }
                    }
                },{
                    "periodId": "488835",
                    "productId": "1709",
                    "title": "2恭喜<font color='#519fff'>用户158****5764<\/font>获得汰渍 Tide 全效洗衣液",
                    "user": {
                        "userId": "12211517",
                        "portrait": "http://o8nxuxipm.bkt.clouddn.com/fengkuangduobaologo.jpg"
                    },
                    "event": {
                        "messageType": "22",
                        "data": {
                            "targetId": "488835"
                        }
                    }
                },{
                    "periodId": "488835",
                    "productId": "1709",
                    "title": "3恭喜<font color='#519fff'>用户158****5764<\/font>获得汰渍 Tide 全效洗衣液",
                    "user": {
                        "userId": "12211517",
                        "portrait": "http://o8nxuxipm.bkt.clouddn.com/fengkuangduobaologo.jpg"
                    },
                    "event": {
                        "messageType": "22",
                        "data": {
                            "targetId": "488835"
                        }
                    }
                }, {
                    "periodId": "488029",
                    "productId": "1613",
                    "title": "4恭喜<font color='#519fff'>用户137****7110<\/font>获得Apple苹果 iPhone7 Plus 32G版手机（颜色随机）",
                    "user": {
                        "userId": "12305132",
                        "portrait": "http://image.aliulian.com/20160723UC54SLIX.png"
                    },
                    "event": {
                        "messageType": "22",
                        "data": {
                            "targetId": "488029"
                        }
                    }
                }
            ],
            timeDown: [
                {
                    "totalCount": "7688",
                    "curCount": "333",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854382000",
                    "status": "0",
                    "percent": "4",
                    "periodId": "403879",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909J2TJZ4IB.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//2016090934Z1O0QZ.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909WY7CY702.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909ZHMT5Q8Q.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909AKHZGFQ7.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909I1A5V3OV.jpg"

                    ],
                    "productId": "1613",
                    "title": "Apple苹果 iPhone7 Plus 32G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                }, {
                    "totalCount": "8588",
                    "curCount": "0",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854379000",
                    "status": "0",
                    "percent": "0",
                    "periodId": "403878",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    ],
                    "productId": "1612",
                    "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                },{
                    "totalCount": "8588",
                    "curCount": "0",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854379000",
                    "status": "0",
                    "percent": "0",
                    "periodId": "403878",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    ],
                    "productId": "1612",
                    "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                }
            ],
            productList: [
                {
                    "totalCount": "7688",
                    "curCount": "333",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854382000",
                    "status": "0",
                    "percent": "4",
                    "periodId": "403879",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909J2TJZ4IB.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//2016090934Z1O0QZ.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909WY7CY702.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909ZHMT5Q8Q.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909AKHZGFQ7.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909I1A5V3OV.jpg"

                    ],
                    "productId": "1613",
                    "title": "Apple苹果 iPhone7 Plus 32G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                }, {
                    "totalCount": "8588",
                    "curCount": "0",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854379000",
                    "status": "0",
                    "percent": "0",
                    "periodId": "403878",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    ],
                    "productId": "1612",
                    "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                },{
                    "totalCount": "8588",
                    "curCount": "0",
                    "limitCount": "1",
                    "defaultCount": "5",
                    "startTime": "1478854379000",
                    "status": "0",
                    "percent": "0",
                    "periodId": "403878",
                    "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    "loopImageList": [
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                        "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    ],
                    "productId": "1612",
                    "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    "labelLT": "",
                    "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                }
            ],
            allLoaded: false,
            bottomStatus: ''
        }
    },
    created(){
        Indicator.open()
        this.getBannerList()
        this.getLampList()
        // this.getTimeDown()
        // this.getProductList()
        let self = this
        setInterval(function() {
            let temp = self.lamplist.splice(0,1)
            let tl = self.lamplist.length
            self.lamplist[tl] = temp[0]
        },3000)
    },
    computed: {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'getBannerList',
        selected: function (val) {
            console.log(val)
            this.getProductList(val)
        }
    },
    methods: {

        getBannerList(){
            let self = this

            Vue.http.get(configUrl+params)
                .then(function (data) {
                    let response = data.body.data

                    self.banner = response.ads_1001

                    window.localStorage.setItem('CATEGORY', JSON.stringify(response.categoryList))
                    // console.log(response)
                    
                })
        },
        getLampList(){
            let self = this

            Vue.http.get(lampList+params)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    // self.lamplist = response.lampList

                })
                Indicator.close();
        },
        getTimeDown(){
            let self = this

            Vue.http.get(timeDown+params)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    self.timeDown = response.periodList
                    self.timeDown.length = 3
                    Indicator.close();
                })
        },
        getProductList(id,page){

            let self = this
            let pages = page || ""
            // +'tabId='+id+'toPage='+page
            Vue.http.get(proList+params1)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    self.productList = response.periodList
                    
                })
        },
        linkProduct (index) {
            console.log(index)
            window.localStorage.setItem('PRODUCTDATA', JSON.stringify(this.productList[index]))
        },
        remindApprover(){
            this.showLoading = true

            setTimeout(()=>{
                this.showLoading = false
                this.showToast = true
                    
            },1000)
            

        },
        handleBottomChange(status) {
            this.bottomStatus = status;
          },
          loadBottom() {
            setTimeout(() => {
              // let lastValue = this.list[this.list.length - 1];
              // if (lastValue < 40) {
                for (let i = 1; i <= 10; i++) {
                  this.productList.push(i);
                }
              // } else {
              //   this.allLoaded = true;
              // }
              this.$refs.loadmore.onBottomLoaded();
            }, 500);
          }
    }
    
}
</script>
<style lang='scss' scoped>
.page-swipe{
    height: 300px;
}
.toutiao{
    background: #FFF;
    padding: 10px;
    border-bottom: 1PX solid #e5e5e5;
    .i-tt{
        margin: 0 20px;
    }
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter{
    /*transform: translateY(30px);*/
}
.list-complete-enter-active, .list-complete-leave {
  /*transform: translateY(0);*/
}
.list-complete-leave-active {
  /*transform: translateY(-30px);*/
  /*margin-top: -30px;*/

}

.toutiao-list{
    overflow: hidden;
    height: 29PX;
    border-left: 1PX solid #e5e5e5;
    li{
        line-height: 29PX;
        word-wrap: nowrap;
    }
    span{
        color: #d43d3d;
    }
}
.zxjx{
    padding: 10px 0;
    background: #FFF;
    .time-down{
        display: block;
        margin: 10px 20px;
        text-align: center;
        background: #d43d3d;
        border-radius: 1em;
        color: #FFF;
    }
}
</style>