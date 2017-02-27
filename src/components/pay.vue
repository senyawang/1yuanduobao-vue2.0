<template>
    <div class="bodyer">

        <div class="pay-way">
            <p class="paymoney">选择支付方式支付：<span class="c-red">￥{{totalMoney}}</span></p>
            
            <mt-cell title="金币" :label='"共"+coin'>
                <label>
                  <span class="paycount"> <span class="c-red">{{totalMoney}}</span>金币</span>
                <span class="mint-radio is-right"><input type="radio" checked="checked" class="mint-radio-input" value="coin"> <span class="mint-radio-core"></span></span>
              
              </label>
              <img style="float:left;margin-right:10px;" slot="icon" src="../assets/img/icon-coin.png" width="35">
            </mt-cell>
        </div>

        <div class="fixed-btn" >
            <div class="ui-flex-box">
                <mt-button class="ui-flex-item" @click="payMoney" size="large" type='danger'>立即支付</mt-button>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.paymoney{
    padding: 20px;
}
.paycount{
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    line-height: 20PX;
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
import { Radio } from 'mint-ui';
import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);

Vue.component(Radio.name, Radio);

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
import localStorage from './../utils/localStorage.js'

const payUrl = './order/place/create_order.html'
const userUrl = './user/profile/user_info.html'

    export default {
        data(){
            return {
                value: 'coin',
                coin: '',
                options: [
                  // {
                  //   label: '被禁用',
                  //   value: '值F',
                  //   disabled: true
                  // },
                  // {
                  //   label: '选项A',
                  //   value: '值A'
                  // },
                  {
                    label: '金币',
                    value: 'coin'
                  }
                ],
                localCart: localStorage.get('CART')
            }
        },
        created(){

            this.getUserInfo()

        },
        computed: {
            totalMoney(){
                let tm = 0
                for (var i = 0; i < this.localCart.length; i++) {
                    tm += this.localCart[i].count*1
                }
                return tm.toFixed(2)
            }
        },
        watch: {
            $route(){
                this.localCart = localStorage.get('CART') || []
            },
            shoppingCart(){
                console.log(1111)
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
                let self = this
                let cart = localStorage.get('CART')

                let st = JSON.stringify(cart)
                let param = self.params+'&periods='+encodeURIComponent(st)+'&payType=0'


                let url = 'http://jyapi.test.1yuantaohuo.com'+payUrl+param

                Vue.http.get( (url) )
                    .then(function (data) {
                        let response = (JSON.parse(data.body)).data

                        // alert('success')
                        localStorage.del('CART')

                        self.$router.push({path: '/success'})
                        
                    })
            },
            getUserInfo(){

                let self = this
                Vue.http.get(userUrl+self.params)
                    .then(function (data) {
                        let response = (JSON.parse(data.body)).data

                        self.coin = response.coinAmount
                        
                    })
            }
            
        }
    }
</script>