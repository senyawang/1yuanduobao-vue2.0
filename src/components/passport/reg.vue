<template>
  <div>
    <group class="box-shadow">
      <x-input placeholder="请输入手机号">
          <span class="getcode">获取验证码</span>
      </x-input>
      <x-input placeholder="请输入验证码"></x-input>
    </group>

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
            btnText: '下一步',
            showCode: false,
            isDisabled: false
        }
    },
    methods: {
        click: function () {
          const _this = this
          this.isDisabled = true
          this.$route.router.go('confirm')
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
        font-size: .6rem;
        line-height: 1.4;
    }
</style>