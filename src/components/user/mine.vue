<template>
	<div>

		<div class="user-panel vux-center">
			<div>
				<span class="avatar">
					<img :src="userInfo.portrait" alt="">
				</span>
				<p class="name">{{userInfo.nickName}}</p>
			</div>
		</div>
		<div class="ui-box user-coin">
			<h3>金币</h3>
			<p>{{coin}}</p>
		</div>

		<div class="ui-box">
			<router-link to='/mine/history'>
            <mt-cell title="夺宝记录" is-link>
              <span slot="icon" class="icon i-history"></span>
            </mt-cell>
            </router-link>
            <router-link to='/mine/addressList'>
            <mt-cell title="收货地址" is-link>
              <span slot="icon" class="icon i-address"></span>
            </mt-cell>
            </router-link>
            <!-- <router-link to='/'>
            <mt-cell title="消息中心" is-link>
              <span slot="icon" class="icon i-message"></span>
            </mt-cell>
            </router-link> -->
            <router-link to='/mine/customerService'>
            <mt-cell title="客服中心" is-link>
              <span slot="icon" class="icon i-service"></span>
            </mt-cell>
            </router-link>
            <!-- <router-link to='/'>
            <mt-cell title="金币明细" is-link>
              <span slot="icon" class="icon i-coin"></span>
            </mt-cell>
            </router-link> -->
		</div>
		

	</div>
</template>

<script>

import Vue from 'vue'
import { Cell } from 'mint-ui';
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
	.mint-cell{
		color: #333;
		.icon{
			margin-right: 20px;
		}
	}
	.user-coin{
		padding: 20px;
		p{
			color: red;
			font: 36px/1 arial;
		}
	}
	.user-panel{
		padding: 30px;
		margin-top: -1PX;
		background: #d43d3d;
		-webkit-background-size: cover;
		     -o-background-size: cover;
		        background-size: cover;
		        color: #FFF;
		text-align: center;
		.avatar{
			display: inline-block;
			width: 2rem;
			height: 2rem;
			border: 2px solid #fff;
			-webkit-border-radius: 50%;
			        border-radius: 50%;

			img{
				max-width: 100%;
				-webkit-border-radius: 50%;
				        border-radius: 50%;
			}
		}
		.name{
			font: .5rem/2 arial;
		}

	}
	
</style>