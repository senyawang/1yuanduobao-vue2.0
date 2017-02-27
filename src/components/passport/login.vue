<template>
  <div class="login">
    <div class="logo">
        <img src="../../../img/logo.png" width="90" alt="">
    </div>
    <group>
      <x-input type＝"tel" autocompelate="off" :value.sync='phone' placeholder="请输入用户名"></x-input>
      <x-input type="password" autocompelate="off" :value.sync='password'  placeholder="请输入密码"></x-input>
      <x-input v-if='showCode' autocompelate="off" :value.sync='verifyCode' placeholder="请输入验证码">
          <img id="validateCode" src="http://passport.cctvmall.com/site/validatecode.html" onclick="this.src = 'http://passport.cctvmall.com/site/validatecode.html?t='+(+new Date())" height="30" alt="">
      </x-input>
    </group>

    <group>
        <x-button type="primary" :text="btnText" :disabled="isDisabled" @click="click"></x-button>
        
    </group>

    <div class="login-option">
        <a v-link='{name: "register"}'>新用户登录</a>
        <a v-link='{name: "register"}'>忘记密码?</a>
    </div>
  </div>
</template>

<script>

import Group from 'vux-components/group'
import xInput from 'vux-components/x-input'
import xButton from 'vux-components/x-button'

import jsencrypt from '../../utils/jsencrypt.js'


export default {
    data(){
        return {
            phone: '',
            password: '',
            verifyCode: '',
            btnText: '登 录',
            showCode: true,
            isDisabled: false
        }
    },
    methods: {
        click: function () {
          const _this = this
          this.isDisabled = true
          this.btnText = '登录中...'

          let obj = {
            "functionId": "USR00005",
            "params": {
                "phone": this.phone,
                "password": this.password,
                "verifyCode": this.verifyCode
            }
          }

          var encrypt = new jsencrypt.JSEncrypt();
          encrypt.setPublicKey(PUBLICKEY);
          var encrypted = encrypt.encrypt(JSON.stringify(obj));

          console.log(encrypted)

          this.$http.post(APIURL, encrypted,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
          .then((response) => {
            // if(response.data.status === 1 ){
            //     alert(response.data.info)
            //     this.$els.btnSave.innerHTML = '保存'
            //     return
            // }
            alert(response.data.message)
            _this.isDisabled = false
            _this.btnText = '登录'
          })


          // this.showCode = !0
          // setTimeout(function () {
          //   _this.btnText = 'Done'
          // }, 2000)
        }
    },
    components: {
        Group,
        xInput,
        xButton
    }
}
</script>

<style lang='sass' scope>

    .login{
        min-height: 100%;
        min-height: calc(100vh - 47px);
        box-sizing: border-box;
        padding: 5%;
        background: #FFF;
      }
    .logo{
        padding-bottom: 20px;
        text-align: center;
    }
    .login-option{
        padding-top: 15px;
        text-align: right;
        a:first-child{
            float: left;
        }
    }
</style>