<template>
    <div class="bodyer">
        <mt-navbar v-model="selected" class='vux-1px-b'>
          <mt-tab-item id="1">进行中</mt-tab-item>
          <mt-tab-item id="2">已揭晓</mt-tab-item>
          <mt-tab-item id="3">已中奖</mt-tab-item>
        </mt-navbar>

        <ul v-if='selected==1' class="pub-list">
            <li v-for='(item, index) in productList' class="pl-item ">
                <router-link 
                        @click.native='linkProduct(index)'
                        class='ui-flex-box'
                        :to='{
                            name: "product", 
                            params: {
                                periodId: item.periodId
                            }
                        }'>
                <img class="img" :src="item.listImg"  alt="">
                <div class="ui-flex-item">
                    <h3>{{item.title}}</h3>
                    <p>期号: {{item.periodId}}</p>
                    <div v-if='item.status==0' class="progress">
                        <div :style='{width:item.percent+"%"}' class="progress-bar"></div>
                    </div>
                    <p>总需{{item.totalCount}}份 <span class="fr"> 剩余{{item.totalCount-item.curCount}}份</span></p>
                    <p>本期购买{{item.buyCount}}份</p>
                    <p v-if='item.status==1'>揭晓倒计时 <span class="J_timeDown" data-time='item.countDown'></span></p>
                </div>
                </router-link>
            </li>
            
        </ul>
        <ul v-if='selected==2' class="pub-list">
            <li v-for='item in productList' class="pl-item ui-flex-box">
                <img class="img" :src="item.listImg"  alt="">
                <div class="ui-flex-item">
                    <h3>{{item.title}}</h3>
                    <p>期号: {{item.periodId}}</p>
                    <p>总需{{item.totalCount}}份 </p>
                    <p>本期购买{{item.buyCount}}份 <span class="fr c-red">查看号码</span></p>
                    <div class="winner-info">
                        <p>获得者: <span class="name">{{item.user.nickName}}</span></p>
                        <p>本期购买<span class="c-red">{{item.user.luckyBuyCount}}</span>份 </p>
                        <p>幸运号码 <span class="c-red">{{item.luckyCode}}</span></p>
                        <p>揭晓时间: {{formatDate(item.awardTime)}}</p>
                    </div>
                </div>

            </li>
            
        </ul>
        <ul v-if='selected==3' class="pub-list">
            <li v-for='item in productList' class="pl-item ui-flex-box">
                <img class="img" :src="item.listImg" alt="">
                <div class="ui-flex-item">
                    <h3>{{item.title}}</h3>
                    <p>期号: {{item.periodId}}</p>
                    <p>幸运号码 <span class="c-red">{{item.luckyCode}}</span></p>
                    <p><span class="c-red">恭喜您夺宝成功，填写地址，奖品立即送出</span></p>
                    <p>本期购买{{item.buyCount}}份</p>

                    <div class="status vux-1px-t">
                        <span class="fr c-red">等待奖品派发</span>
                    </div>
                </div>

                <span class="i-zhongjiang"></span>
            </li>
            
        </ul>

        <div v-if='productList.length==0' class="empty">
            <img src="../../assets/img/nothing2.png" width="90" alt="">
            <p>这里什么都没有哦</p>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'

import { Indicator } from 'mint-ui';
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

const proList = './user/profile/partake_period_list.html'

export default {
    name: 'hostory',
    replace: false,
    components: {
        
    },
    data() {
        return {
            selected: '1',
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
    
        this.getProductList(1)

        // this.$nextTick(function () {
        //     this.selected = '-1'
        // })

    },
    computed: {

    },
    watch: {
        selected: function (val) {
            console.log(val)
            this.getProductList(val)
            // this.selected = '-1'
        }
    },
    methods: {
        
        getProductList(id){

            let self = this

            Vue.http.get(proList+self.params+"&type="+id)
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
.mint-navbar{
    /*border-bottom: 1PX solid #ccc;*/
}
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
    .i-zhongjiang{
        position: absolute;
        width: 144px;
        height: 100px;
        right: 10px;
        top: 20px;
        background: url(../../assets/img/flag-gxzj.png) no-repeat;
        background-size: 100%;
    }
    .progress{
        margin: 10px 0;
    }
    .timedown{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        font-size: 50px;
        color: #d43d3d;
    }
    .fr{
        float: right;
    }
    .img{
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }
}

.winner-info{
    padding: 10px;
    background: #f2f2f2;
    margin-top: 10px;
    .name{
        color: #333;
    }
}
.status{
    margin-top: 10px;
    line-height: 3;
}
.empty{
    text-align: center;
    line-height: 2;
    padding-top: 200px;
    color: #999;
}
</style>