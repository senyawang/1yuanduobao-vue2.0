<template>
    <div class="bodyer">

        <div v-if='shoppingCart.length!=0'>
            <div class="cart-list">
                <div class="ui-flex-box" v-for='(item,index) in shoppingCart'>
                    <div class="v-middle" v-show='editStatus'>
                        <label class="mint-checklist-label">
                            <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" :value="item.periodId" v-model='selected'> 
                                <span class="mint-checkbox-core"></span>
                            </span>
                        </label>
                    </div>
                    <img :src="item.listImg" alt="" class="img">
                    <div class="ui-flex-item">
                        <h2>{{item.title | add}}</h2>
                        <p class="c-gray">总需{{item.totalCount}}/剩余 <span class="c-red">{{item.totalCount*1-item.curCount*1}}</span></p>
                        <div class="pi-spinner" data-id="item.periodId">
                          <span @click="minusProduct(index)" class="icon i-minus"></span>
                      
                          <input 
                            :data-max='item.totalCount*1-item.curCount*1' 
                            class="number" 
                            @keyup='countChange(item.limitCount, index, $event)' v-model="item.value"></input>

                          <span @click="addProduct(index)" class="icon i-plus"></span>
                          <span class="baowei" @click='baowei(index)'>包尾</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- cart-list -->

            <div v-show='editStatus' class="fixed-btn">
                <div class="ui-flex-box">
                    <div class="v-middle" >
                        <label class="mint-checklist-label">
                            <span class="mint-checkbox">
                                <input 
                                    ref='btnAll'
                                    @click='selectAlll'
                                    type="checkbox" 
                                    class="mint-checkbox-input"
                                    > 
                                <span class="mint-checkbox-core"></span>
                            </span>
                        </label>
                    </div>
                    <div class="ui-flex-item">
                        <p>全选</p>
                        <p>共选择{{selected.length}}件商品</p>
                        
                    </div>
                    <mt-button class="cart-btn" @click="delCart" plain size="large" type='danger'>删除</mt-button>
                </div>
            </div>

            <div v-if='!editStatus' class="fixed-btn" >
                <div class="ui-flex-box">
                    
                    <div class="ui-flex-item">
                        <p>共 {{ shoppingCart.length }} 件商品</p>
                        <p>总计：<span class="c-red">￥{{totalMoney}}</span></p>
                    </div>
                    <mt-button class="cart-btn" @click="payMoney" size="large" type='danger'>立即购买</mt-button>
                </div>
            </div>
        </div>

        <div v-else class="empty-cart ui-flex-box">
            <div class="ui-flex-item v-middle">
                <div class="dib">
                    <img src="../assets/img/cart-empty.png" width="90" alt="">
                    <p>您的清单啥也没有</p>
                    <router-link to='/'>
                    <mt-button class="cart-btn" type='danger'>立即夺宝</mt-button>
                    </router-link>
                </div>
            </div>
            <div class="guess-recommend">
                <h2>猜你喜欢</h2>
                <ul class="ui-pro-list column3">
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
                           <div class="progress">
                                <div style="width:50%;" class="progress-bar"></div>
                            </div>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.empty-cart{
    height: calc(100vh - 40PX - 26PX - 55px);
    flex-direction: column;
    align-content: stretch;
    align-items: center;
    .guess-recommend{
        width: 100%;
        height: 340px;
        padding: 20px;
        background: #FFF;
        border-top: 1px solid #ccc;
        .progress{
            margin-top: 10px;
        }
    }
    .ui-flex-item{
        align-self: center;
    }
    .ui-pl-item{
        border: 0 none;
        
    }
    .dib{
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 3;
        color: #999;
    }
}
.cart-list{
    background: #FFF;
    margin-bottom: 140px;
    .ui-flex-box{
        padding: 30px;
        border-bottom: 1PX solid #e5e5e5;
    }
    .img{
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }
    .radio{
        vertical-align: middle;
    }
    
}
.fixed-btn{
    bottom: 26PX;
    margin-bottom: 55px;
    font-size: 32px;
    .cart-btn{
        width: 240px;
    }
}
    
</style>
<script>
import Vue from 'vue'

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
import localStorage from './../utils/localStorage.js'

const cartProUrl = './product/period_list.html'
const recommendUrl = './product/recommend_list.html'

    export default {
        data(){
            return {
                currentId: '',
                items: [],
                selectAll: '',
                trueValue: 'true',
                falseValue: 'false',
                editStatus: false,
                selected: [],
                periodIdList: [],
                curLimit: '',
                productList: [
                    // {
                    //     "totalCount": "7688",
                    //     "curCount": "333",
                    //     "limitCount": "1",
                    //     "defaultCount": "5",
                    //     "startTime": "1478854382000",
                    //     "status": "0",
                    //     "percent": "4",
                    //     "periodId": "403879",
                    //     "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909J2TJZ4IB.jpg",
                    //     "loopImageList": [
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//2016090934Z1O0QZ.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909WY7CY702.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909ZHMT5Q8Q.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909AKHZGFQ7.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909I1A5V3OV.jpg"

                    //     ],
                    //     "productId": "1613",
                    //     "title": "Apple苹果 iPhone7 Plus 32G版手机（颜色随机）",
                    //     "labelLT": "",
                    //     "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                    // }, {
                    //     "totalCount": "8588",
                    //     "curCount": "0",
                    //     "limitCount": "1",
                    //     "defaultCount": "5",
                    //     "startTime": "1478854379000",
                    //     "status": "0",
                    //     "percent": "0",
                    //     "periodId": "403878",
                    //     "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    //     "loopImageList": [
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    //     ],
                    //     "productId": "1612",
                    //     "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    //     "labelLT": "",
                    //     "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                    // },{
                    //     "totalCount": "8588",
                    //     "curCount": "0",
                    //     "limitCount": "1",
                    //     "defaultCount": "5",
                    //     "startTime": "1478854379000",
                    //     "status": "0",
                    //     "percent": "0",
                    //     "periodId": "403878",
                    //     "listImg": "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909E81Y1CK4.jpg",
                    //     "loopImageList": [
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609095ZFIKC7G.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909OTD8TXRF.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//201609097SP0QKWC.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909NQUT4ZE5.jpg",
                    //         "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909S8Q9DHDS.jpg"

                    //     ],
                    //     "productId": "1612",
                    //     "title": "Apple苹果 iPhone7 256G版手机（颜色随机）",
                    //     "labelLT": "",
                    //     "labelRB": "http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/img/icon/new.png"
                    // }
                ],
                shoppingCart: [
                    // {
                    //     periodId: "211354",
                    //     listImg: "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909J2TJZ4IB.jpg",
                    //     totalCount: "8",
                    //     title: "Apple苹果 iPhone7 Plus 32G版手机（颜色随机）",
                    //     curCount: '3',
                    //     limitCount: '1',
                    //     value: 1
                    // },
                    // {
                    //     periodId: "211323",
                    //     listImg: "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160908NXO6OXKC.jpg",
                    //     totalCount: "80",
                    //     title: "Apple苹果 iPhone7 Plus 32G版手机",
                    //     curCount: '50',
                    //     limitCount: '10',
                    //     value: 10
                    // },
                    // {
                    //     periodId: "210754",
                    //     listImg: "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160909J2TJZ4IB.jpg",
                    //     totalCount: "8",
                    //     title: "Apple苹果 iPhone7 Plus 32G版手机",
                    //     curCount: '3',
                    //     limitCount: '1',
                    //     value: 1
                    // },
                    // {
                    //     periodId: "541323",
                    //     listImg: "http://fengkuaangimg.img-cn-beijing.aliyuncs.com//20160908NXO6OXKC.jpg",
                    //     totalCount: "180",
                    //     title: "Apple苹果 iPhone7 ",
                    //     curCount: '50',
                    //     limitCount: '10',
                    //     value: 10
                    // }

                ],
                localCart: localStorage.get('CART') || []

            }
        },
        created(){

            let scl = this.shoppingCart.length
            for(let i=0;i<scl;i++){
                this.shoppingCart[i].value = this.shoppingCart[i].limitCount
            }
            this.getCartData()
            this.getProductList()

        },
        computed: {
            totalMoney(){
                let tm = 0
                for (var i = 0; i < this.shoppingCart.length; i++) {
                    tm += this.shoppingCart[i].value*1
                }
                return tm.toFixed(2)
            }
        },
        watch: {
            $route(){
                this.localCart = localStorage.get('CART') || []
            },
            totalMoney(){
                console.log(1111)
                let newLocalCart = []

                for(let i=0;i<this.shoppingCart.length;i++){

                        let obj = {}

                        obj.productId = this.shoppingCart[i].productId
                        obj.periodId = this.shoppingCart[i].periodId
                        obj.count = this.shoppingCart[i].value

                        newLocalCart.push(obj)
                }

                localStorage.set('CART', newLocalCart)
            },
            selected(val){
                if(val.length<this.shoppingCart.length){
                    this.$refs.btnAll.checked = false
                }else if(val.length===this.shoppingCart.length){
                    this.$refs.btnAll.checked = true
                }
            }

        },
        methods: {
            payMoney(){
                let options = {}
                this.$router.push({path: "pay"})
            },
            linkProduct (index) {
                console.log(index)
                window.localStorage.setItem('PRODUCTDATA', JSON.stringify(this.productList[index]))
            },
            getCartData(){

                if(!this.localCart.length) return
                let self = this
                // let pages = page || ""
                let proIds = []
                for (var i = 0; i < this.localCart.length; i++) {
                    proIds.push(this.localCart[i].productId)
                }


                let params = this.params + '&productIds=' + proIds

                Vue.http.get(cartProUrl+params)
                    .then(function (data) {
                        let response = (JSON.parse(data.body)).data

                        for (var i = 0; i < response.periodList.length; i++) {
                            response.periodList[i].value = response.periodList[i].limitCount
                        }

                        self.shoppingCart = response.periodList
                        
                    })
            },
            getProductList(){

                let self = this
                Vue.http.get(recommendUrl+self.params)
                    .then(function (data) {
                        let response = (JSON.parse(data.body)).data

                        self.productList = response.periodList
                        self.productList.length = 3
                        
                    })
            },
            delCart(){
                let scl = this.shoppingCart.length

                let str = this.selected.join(',')

                let indexAry = []

                let newLocalCart = []

                for(let i=0;i<this.shoppingCart.length;i++){

                    if(!str.includes(this.shoppingCart[i].periodId)){

                        let obj = {}

                        indexAry.push(this.shoppingCart[i])

                        obj.productId = this.shoppingCart[i].productId
                        obj.periodId = this.shoppingCart[i].periodId
                        obj.count = this.shoppingCart[i].value

                        newLocalCart.push(obj)
                    }
                }

                this.shoppingCart = indexAry
                localStorage.set('CART', newLocalCart)
                this.selected = []

            },
            selectAlll($event){
                let self = $event.target
                if(self.checked){
                    let scl = this.shoppingCart.length
                    this.selected = []

                    for(let i=0;i<scl;i++){
                        this.selected.push(this.shoppingCart[i].periodId)
                    }
                }else{
                    this.selected = []
                }
            },
            countChange(limit, index, $event){

                let self = $event.target

                let val = self.value

                let max = self.getAttribute('data-max')

                // 如果输入数值大于剩余数量
                if(val*1 > max) {
                    this.shoppingCart[index].value = max
                    return
                }

                if(limit==1){
                    if(val<1) self.value = 1
                    return
                }

                // 限制输入数值是10的倍数
                if(val%10!=0){
                    self.value = val - val%10 + 10
                }
                
            },
            addProduct(index){

                let cur = this.shoppingCart[index]
                if(cur.value>=cur.totalCount-cur.curCount) return
                if(cur.limitCount == 1){
                    cur.value ++
                }else{
                    cur.value = cur.value*1 + 10
                }
                
            },
            minusProduct(index){
                let cur = this.shoppingCart[index]
                if(cur.limitCount == 1){
                    if(cur.value<=1) return
                    cur.value --
                }else{
                    if(cur.value<=10) return
                    cur.value = cur.value*1 - 10
                }
                

            },
            baowei(index){
                let cur = this.shoppingCart[index]
                cur.value = cur.totalCount-cur.curCount
            },
            updateLocalCart(){

            }
        }
    }
</script>