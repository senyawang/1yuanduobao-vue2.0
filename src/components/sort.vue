<template>
    <div class="bodyer ui-flex-box">
        <header class="mint-header is-fixed" @keyup.enter='searchEvent' style="z-index:9;">
            <div class="mint-header-button is-left" @click='routeBack'>
                <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon">
                    <i class="mintui mintui-back"></i>
                </span> 
                </button>
            </div>  

            <mt-search v-model="searchValue" :result.sync="result"></mt-search>

            <div class="mint-header-button is-right">
                <router-link to='/cart'>
                <span :data-num='cartNum' class="icon cart-white J_cartNumber"></span>
                </router-link>
            </div>
        </header>

        <mt-navbar v-model="selected">
          <mt-tab-item v-for='item in categoryList' :id="item.id">{{item.title}}</mt-tab-item>
          <!-- <mt-tab-item id="-1">人气</mt-tab-item>
          <mt-tab-item id="1">最新</mt-tab-item>
          <mt-tab-item id="2">进度</mt-tab-item>
          <mt-tab-item id="3">高价</mt-tab-item>
          <mt-tab-item id="14">低价</mt-tab-item> -->
        </mt-navbar>

        <div class="product-cont ui-flex-item">
             <mt-loadmore 
                :autoFill='false' 
                :bottom-method="loadBottom" 
                @bottom-status-change="handleBottomChange" 
                :bottom-all-loaded="allLoaded" 
                ref="loadmore">
            <ul class="ui-pro-list column2">
                <li v-for='item in productList' class="ui-pl-item">
                    <a href="#">
                        <img :src="item.listImg" alt="">
                        <p class="text-ellipsis">{{item.title}}</p>
                    </a>
                        
                        <div class="ui-flex-box">
                            <div class="ui-flex-item">
                                <p class="c-gray">开奖进度 4%</p>
                                <div class="progress">
                                    <div style="width:50%;" class="progress-bar"></div>
                                </div>
                            </div>
                            
                            <span @click="add2Cart(item.productId, item.periodId,item.limitCount)" class="icon i-cart"></span>
                        </div>
                    
                </li>
            </ul>
            </mt-loadmore>
        </div>

    </div>
</template>

<script>

import Vue from 'vue'

import { Navbar, TabItem } from 'mint-ui';
import { Indicator } from 'mint-ui';

import { Loadmore } from 'mint-ui';


import { Search } from 'mint-ui';

import localStorage from '../utils/localStorage.js'

Vue.component(Search.name, Search);

Vue.component(Loadmore.name, Loadmore);

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);


const proList = './product/period_list.html'

let params1 = '?asign=f6a05001687a4fc0799a6fb7126a5092&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1481030581&toPage=0&version=1.0'

export default {
    name: 'sort',
    replace: false,
    components: {
        
    },
    data() {
        return {
            selected: "1",
            searchValue: '',
            result: [],
            
            categoryList: [],
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
        // Indicator.open()

        let ct = window.localStorage.getItem('CATEGORY')
        ct = JSON.parse(ct)

        this.categoryList = ct
    
        this.getProductList(-1)

        // this.$nextTick(function () {
        //     this.selected = '-1'
        // })

    },
    computed: {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'getBannerList',
        selected: function (val) {
            console.log(val)
            this.getProductList(val)

            // this.selected = '-1'
        }
    },
    methods: {
        
        getProductList(id,page){

            let self = this

            Vue.http.get(proList+params1+"&categoryId="+id)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    self.productList = response.periodList

                    Indicator.close()
                    
                })
        },
        searchEvent(){
            console.log('search')
            this.$router.push({path: '/search', query: {keyword: this.searchValue}})
        },

        routeBack(){
            this.$router.back()
        },
        
        handleBottomChange(status) {
            this.bottomStatus = status;
          },
          loadBottom() {
            setTimeout(() => {
              // let lastValue = this.list[this.list.length - 1];
              // if (lastValue < 40) {
                // for (let i = 1; i <= 10; i++) {
                //   this.productList.push(i);
                // }
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
.mint-navbar{
    width: 7em;
    height: calc(100vh - 90PX);
    overflow-y: scroll; 
    flex-direction: column;
    
    .mint-tab-item{
        display: block;
        flex: 1 30px 30px;
        border-bottom: 1px solid #e5e5e5;
        border-right:1px solid #d2d2d2;
        &.is-selected{
            border-right: 1px solid #fff;
            border-bottom: 1px solid #e5e5e5!important;
        }
    }
}

</style>