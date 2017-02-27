import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSource from 'vue-resource'
import { sync } from 'vuex-router-sync'

import App from './App'
import store from './vuex/store.js'
import routes from './router.js'
import MintUI from 'mint-ui'

import { Toast } from 'mint-ui';
import localStorage from './utils/localStorage.js'

import 'mint-ui/lib/style.css'

const md5 = require('js-md5')

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSource)

Vue.http.options.emulateJSON = true
Vue.http.options.root = 'http://jyapi.test.1yuantaohuo.com'


let route = new VueRouter({
    mode: 'hash',
    routes: routes
})

sync(store, route)

function add0(m){return m<10?'0'+m:m }

Vue.filter('add0', function(val){return val+"0"})
// 注册
Vue.filter('add', function (val) {
  // 返回处理后的值
  return val+"0"
})



// 全局配置
Vue.mixin({
  data(){
    return {
      dynamicParams: '',
      // token:"5a2e3b03-edad-4fe4-ba08-bfbd1c0a73a6"
      token:"33aefc51-9ad1-49b4-bfbd-3bd2123bc7d0",
      // params: '?accessToken=ef74e1e7-6c94-443c-8155-6292d04176a5&channel=appstore&asign=40910a6666d38bc70b16651973d6ae2a&clientId=JYDB1001&environment=debug&version=1.0&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1482057483'
      // token:"f9a911bc-5103-4e40-8624-489984dd4fca"
    }
  },
  computed: {
    cartNum(){
      let localCart = localStorage.get('CART') || []

      return localCart.length
    },
    params(){
      const baseParams = '?accessToken='+this.token+'&channel=appstore&clientId=JYDB1001&environment=debug&version=1.0&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1482057483'
      let newParams = baseParams + this.dynamicParams
      let paramAry = newParams.substring(1).split('&')
      paramAry.sort()
      let paramStr = '?'+paramAry.join('&')
      let secretkey = '&4)d)qj+f'
      let asign = md5(paramStr+secretkey)
      paramStr = paramStr + '&asign=' + asign

      return paramStr

    } 
  },
  methods:{
    // 全局ajax请求失败时（error）的回调方法；
    ajaxErr() {
      alert('ajax error!!!')
    },
    add2Cart(productId, periodId, count){

      let cart = localStorage.get('CART') || []

      let pro = {
        'productId': productId,
        'periodId': periodId,
        'count': count*1
      }

      let hasPro = false
      for(let i=0,l=cart.length; i<l; i++){
        if(cart[i].productId === productId){
          cart[i].count = cart[i].count*1 + count*1
          hasPro = true
          break
        }
      }

      if(!hasPro) cart.push(pro)

      localStorage.set('CART', cart)

      let instance = Toast('添加成功');
      setTimeout(() => {
        instance.close();
      }, 1000);


    },
    formatDate(stamp){
        //stamp是整数，否则要parseInt转换
        var time = new Date(stamp);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: route,
  template: '<App/>',
  components: { App }
})



let routerHistory = []
let commit = store.commit || store.dispatch

route.beforeEach((to, from, next) => {

        let rl = routerHistory.length
        // console.log(routerHistory[rl-1],to.path)
        if(rl>1&&routerHistory[rl-2]===to.path){
            // router.app.transition = 'vux-pop-out'
            commit('UPDATEPAGEDIR', 'vux-pop-out')
            routerHistory.splice(rl-1, 1)
            setTimeout(next, 15)
            // return

        }else{
            // router.app.transition = 'vux-pop-in'
            commit('UPDATEPAGEDIR', 'vux-pop-in')
            routerHistory.push(to.path)
            setTimeout(next, 15)

        }


})

route.afterEach((to,from) => {
    // commit('UPDATEPAGEDIR', 'vux-pop-in')
    commit('SETTITLE', to.meta.title)
    // console.log(to.meta)

    // commit('UPDATELOADING', false)
    // transition.to.router.app.$root.updateLoading(false)

})