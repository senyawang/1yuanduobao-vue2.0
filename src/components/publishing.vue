<template>
    <div class="bodyer">
        <ul class="pub-list">
            <li v-for='item in productList' class="pl-item">
                <router-link class='ui-flex-box' :to='{
                            name: "product", 
                            params: {
                                periodId: item.periodId
                            }
                        }'>
                <img class="img" :src="item.listImg"  alt="">
                <div class="ui-flex-item">
                    <h3>{{item.title}}</h3>
                    <p>总需{{item.totalCount}}份</p>
                    <p>
                        <span class="icon clock"></span>
                        <!-- <span data-time='item.awardTime' class="timedown J_timeDown">09:20:23</span> -->
                        <count-down class='timedown' :text="item.status==1?'等待开奖':'已开奖'" :endtime="item.awardTime*1+item.countDown*1" :servertime='item.awardTime*1' :id="item.periodId"></count-down>
                    </p>
                </div>

                <span v-if='item.status==1' class="i-publishing"></span>
                </router-link>
            </li>
            <!-- <li class="pl-item ui-flex-box">
                <img class="img" src="../assets/images/pro.jpg"  alt="">
                <div class="ui-flex-item">
                    <h3>Apple苹果 iPhone7 Plus 32G版手机（颜色随机）</h3>
                    <p>总需2912份</p>
                    <p>
                        <span class="icon clock"></span>
                        <span data-time='19210233' class="timedown">正在计算中...</span>
                    </p>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script>

import Vue from 'vue'

import { Indicator } from 'mint-ui';

import CountDown from './common/countDown.vue'

const proList = './product/finish_period_list.html'

export default {
    name: 'sort',
    replace: false,
    components: {
        CountDown
    },
    data() {
        return {
            selected: "1",
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
        Indicator.open()

        let ct = window.localStorage.getItem('CATEGORY')
        ct = JSON.parse(ct)

        this.categoryList = ct
    
        this.getProductList()

        // this.$nextTick(function () {
        //     this.selected = '-1'
        // })

    },
    computed: {

    },
    watch: {
        
    },
    methods: {
        
        getProductList(id,page){

            let self = this

            Vue.http.get(proList+self.params)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    self.productList = response.periodList

                    Indicator.close()
                    
                })
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

// let getinfo = function(){

//     let p = new Promise()

//     p.then( data => resolve(data))
    
//     return p
// }

// 期望  getinfo() 执行后得到的是 data 

</script>
<style lang='scss' scoped>
.pub-list{
    .pl-item{
        position: relative;
        background: #FFF;
        padding: 30px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        h3{
            margin: 10px 0;
        }
        p{
            color: #999;
        }
    }
    .i-publishing{
        position: absolute;
        width: 126px;
        height: 126px;
        left: 0;
        top: 0;
        background: url(../assets/img/i-publishing.png) no-repeat;
        background-size: 100%;
    }
    
    .img{
        width: 200px;
        height: 200px;
        margin-right: 20px;
    }
}

</style>