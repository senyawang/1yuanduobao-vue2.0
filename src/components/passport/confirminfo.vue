<template>
  <div class="confirm-info">

    <group class="box-shadow">
      <cell title="姓名" value="大兄弟"></cell>
      <cell title="电话" value="150102122"></cell>
      <cell title="部门" value="技术部"></cell>
      <cell title="企业" value="北京中金万城"></cell>

    </group>

    <group class="box-padding">
        <x-button type="primary" @click="click">下一步</x-button>
        
    </group>

  </div>
</template>

<script>

import Group from 'vux-components/group'
import xInput from 'vux-components/x-input'
import xButton from 'vux-components/x-button'
import cell from 'vux-components/cell'
export default {
    methods: {
        click: function () {
          this.$route.router.go('password')
        }
    },
    components: {
        Group,
        xInput,
        xButton,
        cell
    }
}
</script>

<style lang='sass' scope>
    .confirm-info{
      .weui_cell_bd > p{
        color: #999;
      }
      .weui_cell_ft{
        color: #333;
      }
    }
</style>