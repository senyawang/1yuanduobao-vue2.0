export default [
    {
        path: '/',
        name: 'home',
        component: require('./components/index.vue'),
        meta: {
            title: '一元夺宝'
        }
    },
    {
        path: '/sort',
        name: 'sort',
        component: require('./components/sort.vue'),
        meta: {
            title: '分类'
        }
    },
    {
        path: '/publishing',
        name: 'publishing',
        component: require('./components/publishing.vue'),
        meta: {
            title: '即将揭晓'
        }
    },
    {
        path: '/product/:periodId',
        name: 'product',
        component: require('./components/detail.vue'),
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: require('./components/cart.vue'),
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: require('./components/search.vue'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: require('./components/pay.vue'),
        meta: {
            title: '结算'
        }
    },
    {
        path: '/success',
        name: 'success',
        component: require('./components/success.vue'),
        meta: {
            title: '支付成功'
        }
    },
    {
        path: '/mine',
        component: require('./components/user/index.vue'),
        children: [
            {
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: '',
              name: 'mine',
              component: require('./components/user/mine.vue'),
              meta: {
                    title: '我的'
                }
            },
            {
              path: 'addressList',
              name: 'addressList',
              component: require('./components/user/addresslist.vue'),
              meta: {
                    title: '收货地址'
                }
            },
            {
              path: 'create',
              name: 'create',
              component: require('./components/user/create.vue'),
              meta: {
                    title: '收货地址'
                }
            },
            {
              path: 'create/:addressId',
              name: 'update',
              component: require('./components/user/create.vue'),
              meta: {
                    title: '收货地址'
                }
            },
            {
              path: 'customerService',
              name: 'customerService',
              component: require('./components/user/customerService.vue'),
              meta: {
                    title: '客服中心'
                }
            },
            {
              path: 'history',
              name: 'history',
              component: require('./components/user/history.vue'),
              meta: {
                    title: '夺宝记录'
                }
            }
          ]
    }
    
]





