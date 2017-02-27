<template>
    <div class="bodyer">

        <header @keyup.enter='searchEvent' class="mint-header is-fixed" style="z-index:9;">
            <div class="mint-header-button is-left" @click='routeBack'>
                <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon">
                    <i class="mintui mintui-back"></i>
                </span> 
                </button>
            </div>  

            <mt-search 
                ref='searchComponent'
                v-model="keyword"
                :placeholder="keyword"
                > 
            </mt-search>

            <div class="mint-header-button is-right">
                <router-link to='/cart'>
                <span :data-num='cartNum' class="icon cart-white J_cartNumber"></span>
                </router-link>
            </div>
        </header>

        <ul class="pub-list">
            <li v-for='(item,index) in productList' class="pl-item ">
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

        <div v-if='!productList || productList.length==0' class="empty">
            <img src="../assets/img/nothing2.png" width="90" alt="">
            <p>没有您要的结果</p>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'

import { Indicator } from 'mint-ui';
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

const proList = './product/period_list.html'

export default {
    name: 'hostory',
    replace: false,
    components: {
        
    },
    data() {
        return {
            keyword: this.$route.query.keyword,
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
        Indicator.open()
    
        this.getProductList()

        

    },
    mounted(){
        this.$refs.searchComponent.$data.visible = true;
    },
    computed: {
        // keyword(){
            
        //         return this.$route.query.keyword
            
        // }
    },
    watch: {
        keyword(val){
            
            this.$router.push({path: '/search', query: {keyword: val}})
            
        }
    },
    methods: {
        searchEvent(){
            this.getProductList()
        },
        getProductList(){

            let self = this

            Vue.http.get(proList+self.params+"&keyword="+self.keyword)
                .then(function (data) {
                    let response = (JSON.parse(data.body)).data

                    self.productList = response.periodList

                    Indicator.close()
                    
                })
        },
        linkProduct (index) {
            console.log(index)
            window.localStorage.setItem('PRODUCTDATA', JSON.stringify(this.productList[index]))
        },
        routeBack(){
            this.$router.back()
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