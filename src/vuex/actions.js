import Vue from 'vue'
// import accesstoken from '../utils/session.js'

export const setAddressList = ({ commit }, list) => {

  var params = {
        "functionId": "MY00003",
        "params": {
          "token": accesstoken(),
          "flag": "0"
        }
      }

    Vue.http.post(APIURL, JSON.stringify(params))
      .then((response) => {

        let data = response.data

        if(data.status == 1){

          commit('SETADDRESSLIST', data.beans.bisObj)
        }

    })
}

export const add = ({ commit }, item) => {

  var params = {
        "functionId": "MY00003",
        "params":{
            "flag":"1",
            "access_token":"1",
            "userName":"张1",
            "phone":"13088888888",
            "city":"北京",
            "detailAddress":"海淀区西土城80号学院派c座501",
            "label":"公司"
        }
    }


    Vue.http.post(APIURL, JSON.stringify(params))
      .then((response) => {

        let data = response.data

        if(data.status == 1){
          commit('SETADDRESSLIST', data.beans.bisObj)
        }

    })
}

export const del = ({ commit }, id) => {
    let aid = "";
    var p = new Promise(function (resolove, reject) {
        setTimeout(function() {
           aid = id 
           resolove(aid)
        },1000)
    })

    p.then((val)=>{
        commit('DELADDRESS', val)
    })
}

export const setDefault = ({ commit }, id) => {
    if(!confirm('确定设为收货地址吗？')){

      $event.preventDefault()
      return
    }
    commit('SETDEFAULT', id)
}
export const updateLoading = ({ commit }, status) => {
    commit('UPDATELOADING', status)
}
export const setTitle = ({ commit }, id) => {
    commit('SETTITLE', id)
}
export const setSourceCity = ({ commit }, city) => {
    commit('SETSOURCECITY', city)
}
export const setDestinationCity = ({ commit }, city) => {
    commit('SETDESTINATIONCITY', city)
}
export const setPlaneSearchDate = ({ commit }, date) => {
    commit('SETPLANESEARCHDATE', date)
}

export const updateDir = ({ commit }, dir) => {
    commit('UPDATEPAGEDIR', dir)
}







