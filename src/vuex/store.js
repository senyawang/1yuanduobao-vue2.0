const Vue = require('vue')
const Vuex = require('vuex')
Vue.use(Vuex)

const state = {
    pageDirection: 'vux-pop-in', //页面跳转方向 vux-pop-out 后退 “vux-pop-in”前进
    pageTitle: '',
    addressList: '',
    currentAddressId: '',
    sourceCity: '北京',
    destinationCity: '上海',
    planeSearchDate: '',
    isLoading: true
}


const mutations = {
    UPDATELOADING (state, status) {
        state.isLoading = status
    },
    SETTITLE (state, title) {
        state.pageTitle = title
    },
    UPDATEPAGEDIR (state, dir) {
        state.pageDirection = dir
    },
    SETSOURCECITY (state, city) {
        state.sourceCity = city
    },
    SETDESTINATIONCITY (state, city) {
        state.destinationCity = city
    },
    SETPLANESEARCHDATE (state, date) {
        state.planeSearchDate = date
    },
    SETADDRESSLIST (state, list) {
        state.addressList = list
    },
    ADDADDRESS (state, id, item) {
        state.addressList[id] = item
    },
    DELADDRESS (state, id) {
        console.log(id)
        // state.addressList[id].name = 'asdfas'
        // Vue.set(state.addressList, id, null)
        Vue.delete(state.addressList, id)
    },
    EDITADDRESS (state, id, item) {
        state.addressList[id] = item
    },
    SETDEFAULT (state, id) {
        for(let p in state.addressList){
            state.addressList[p].isdefault = 0
        }
        state.addressList[id].isdefault = 1

        console.log(state.route.path)


    },
    SETCURRENT (state, id) {
        state.CurrentId = id
    }

}
export default new Vuex.Store({
    state,
    mutations
})