<template>
	<div>

		<div class="ui-box success">
            <p>恭喜你，参与成功</p>
            <p>请等待系统为您揭晓</p>
			<p class="btn-area">
                <router-link to='/'>
                <mt-button type="danger" size='small'>继续夺宝</mt-button>
                </router-link>
                <router-link to='/mine/history'>
                <mt-button type="default" size="small">查看夺宝记录</mt-button>
                </router-link>    
            </p>
		</div>

        <div class="ui-box buy-info">
            <p>(第1002342期) 产品名称 10 份</p>
            <div class="ui-flex-box">
                <span>夺宝号码</span>
                <div class="ui-flex-item">
                    12341234 134123 1231345 045234<br>
                    12341234 134123 1231345 045234<br>
                </div>
            </div>
        </div>
		
	</div>
</template>

<script>

import Vue from 'vue'
import { Cell } from 'mint-ui';
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
const userUrl = './user/profile/user_info.html'
export default {
		data(){
				return {
						userInfo: '',
                        coin: ''
				}
		},
        created(){
            this.getUserInfo()
        },
        
		methods: {
				click: function () {
					// this.$route.router.go('/check/travelrequest')
				},
                getUserInfo(){

                    this.dynamicParams = '&userid=1832'

                    let self = this

                    

                    console.log(this.params)

                    Vue.http.get(userUrl+self.params)
                        .then(function (data) {
                            let response = (JSON.parse(data.body)).data

                            self.userInfo = response.user
                            self.coin = response.coinAmount
                            
                        })
                },
		},
		components: {
				
		}
}
</script>

<style lang='scss' scoped>
	.success{
        padding: 50px;
        text-align: center;  
        color: #333; 
    }
    .btn-area{
        margin-top: 30px;
    }
    .buy-info{
        padding: 20px;
        .ui-flex-item{
            margin-left: 20px;
        }
    }
</style>