<template>
  <div id="app">
    <mt-header fixed :title="title">
      <mt-button v-if='this.$route.name!="home"' @click='goBack' icon="back" slot='left'></mt-button>
      <mt-button v-if='this.$route.name=="cart"' @click='editCart' slot="right">{{cartActionText}}</mt-button>
    </mt-header>

    <router-view>
    </router-view>    

    <div v-if='showBottom' class="mt-footer" style="height:53px;">
    <mt-tabbar fixed v-model="currentTab" class="nav-tab-bar">
      <mt-tab-item id="home">
        <router-link to='/'>
        <span class="icon home"></span>
          <p>首页</p>
        </router-link>

      </mt-tab-item>
      <mt-tab-item id="publishing">
        <router-link to='/publishing'>
        <span class="icon zxjx"></span>
          <p>最新揭晓</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="sort">
        <router-link to='/sort'>
        <span class="icon fenlei"></span>
          <p>分类</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="cart">
        <router-link to='/cart'>
        <span class="icon gouwuche"></span>
          <p>清单</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <router-link to='/mine'>
        <span class="icon wode"></span>
          <p>我的</p>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
    </div>
  
  </div>
</template>

<script>
import Vue from 'vue'
import store from './vuex/store.js'
import { setTitle } from './vuex/actions.js'

import Hello from './components/Hello'
import { Header } from 'mint-ui'
import { Tabbar, TabItem } from 'mint-ui';



Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.component(Header.name, Header)

export default {
  name: 'app',
  vuex: {
    getters: {
        tit: state => state.pageTitle,
        sourceCity: state => state.sourceCity,
        destinationCity: state => state.destinationCity,
        planeSearchDate: state => state.planeSearchDate,
        isLoading: state => state.isLoading,
        transition: state => state.pageDirection
      },
      actions: {
        setTitle
      }
  },
  store: store,
  data(){
    return {
      cartActionText: '编辑',
      searchValue: '搜索'
    }
  },
  computed: {
    isUser(){
      return this.$route.name === 'mine'
    },
    currentTab(){
      let name = this.$route.name
      return name
    },
    title(){
      return this.$route.meta.title
    },
    showBottom(){
      return this.$route.name != 'product'
    }
  },
  components: {
    Hello
  },
  methods: {
    goBack() {
      this.$router.back()
      console.log(store)
    },
    editCart(){
      let cartData = this.$route.matched[0].instances.default.$data

      if(cartData.shoppingCart.length === 0){
        this.cartActionText = '编辑'
        return
      }

      if(this.cartActionText === '编辑'){
        this.cartActionText = '完成'
        cartData.editStatus = true
      }else{
        this.cartActionText = '编辑'
        cartData.editStatus = false
      }
    }
  }
}
</script>

<style lang="scss">

@import './sass/page/main.scss';
@import './assets/animate.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px; /*no*/
}
</style>
