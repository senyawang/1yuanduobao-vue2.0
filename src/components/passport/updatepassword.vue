<template>
  <div>
    <group class="box-shadow">
      <x-input type='password' placeholder="当前密码"></x-input>
      <x-input type='password' placeholder="新密码"></x-input>
      <x-input type='password' placeholder="确认密码"></x-input>
    </group>

    <p style="line-height: 2; color: #999; text-align: center;">密码由8-20位英文字母（区分大小写）、数字或符号组成</p>
    
    <group class="box-padding">

        <x-button type="primary" :text="btnText" :disabled="isDisabled" @click="click"></x-button>
        
    </group>

  </div>
</template>

<script>

import Group from 'vux-components/group'
import xInput from 'vux-components/x-input'
import xButton from 'vux-components/x-button'
export default {
    data(){
        return {
            btnText: '确定',
            isDisabled: false
        }
    },
    methods: {
        click: function () {
          this.$route.router.go('/')
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
    .getcode{
        display: inline-block;
        padding: 0 0 0 15px;
        border-left: 1px solid #ccc;
        margin-left: 10px;
        font-size: .4rem;
        line-height: 1.4;
    }
</style>