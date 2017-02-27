<template>
  <div id="app-sub">
      <router-view></router-view>
      <!-- <router-view class="sub-view view" :transition='transition'></router-view> -->
  </div>
</template>

<script>

export default {
    vuex: {
        getters: {
            // transition: state => state.pageDirection
        }
    }
}
</script>
