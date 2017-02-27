const Vue = require('vue')
const Vuex = require('vuex')
Vue.use(Vuex)

const state = {
    addressList: {
        'ID234': {'name':'senyawang', 'tel':'15010212222', 'address':'北京大学东校区Bsia死啊', 'isdefault':1},
        'ID235': {'name':'senyawang', 'tel':'15010212422', 'address':'北京大学东校区Bsia死', 'isdefault':0},
        'ID236': {'name':'senyawang', 'tel':'15010212226', 'address':'北京大学东校区Bsia啊', 'isdefault':0}
    },
    CurrentId: ''
}


const mutations = {
    SETADDRESS (state, addressList) {
        state.addressList = addressList
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