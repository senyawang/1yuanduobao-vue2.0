<template>
<section class="add-address">
    <ul class="ui-list ui-box">
        <li class="ul-item">
          <label>姓名</label>
          <input class="" required type="text" v-model="name" placeholder="请填写收货人姓名">
        </li>
        <li class="ul-item">
          <label>电话</label>
          <input type="tel" required v-model="tel" placeholder="请填写收货人联系方式">
        </li>
        <li class="ul-item ui-flex-box">
          <label>城市</label>
          <div @click='popupVisible=true' class="ui-flex-item cell-link">
            <!-- {{this.addressProvince+this.addressCity+this.addressDistrict}} -->
            {{values}}
            </div>
          <span class="css-arrow arrow-b"></span>
        </li>
        <li class="ul-item">
          <label>地址</label>
          <input type="text" required v-model="address" placeholder="请填写完整的收货地址">
        </li>
    </ul>

    <ul class="ui-list ui-box">
        <li class="ul-item">
            <div class="set-default">
                <label for="isdefault" style="color:red;">
                <input class="checkbox" name="isdefault" type="checkbox" v-model='isdefault'>
                设为收货地址</label>
            </div>
        </li>
    </ul>
    
    <div class="btn-area">
      <a @click='onSave' class="ui-btn" v-text='btnText'></a>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <mt-picker 
        :slots="addressSlots" 
        :value-key="values"
        @change="onAddressChange">
            
        </mt-picker>
    </mt-popup>
    

</section>

</template>

<style>
    .add-address{
        padding-top: 20px;
    }
    .mint-popup{
        width: 100%;
    }
    .cell-link{
        padding: 0 20px;
    }
</style>

<script>
import Vue from 'vue'
import { Picker } from 'mint-ui'
// import cityData from "./cityInitData"
import { Popup } from 'mint-ui';
import localStorage from '../../utils/localStorage.js'

Vue.component(Popup.name, Popup);

Vue.component(Picker.name, Picker);

const createUrl = './user/profile/add_modify_address.html'

const cityDataJson = 'http://new-duobao-oss.oss-cn-beijing.aliyuncs.com/ioc.json'

export default {

    data () {
        return {
            firstChange: true,
            btnText: '保存',
            popupVisible: false,
            name: '',
            id: this.$route.params.addressId || "",
            tel: '',
            cityData: [],
            addressProvince: '',
            addressCity: '',
            addressDistrict: '',
            address: '',
            isdefault: 1,
            values: [],
            addressSlots: [
              {
                flex: 1,
                values: ['北京'],
                className: 'slot1',
                textAlign: 'center'
              }, {
                flex: 1,
                values: ['市辖区'],
                className: 'slot2',
                textAlign: 'center'
              }, {
                flex: 1,
                values: ['东城区'],
                className: 'slot3',
                textAlign: 'center'
              }
            ]
            
        }
    },
    computed: {
        
    },
    route: {
        data(){
            
        }
    },
    created () {

        if(this.$route.params.addressId){
            let addr = JSON.parse(localStorage.get('CURADDRESS'))
            let self = this
            self.name = addr.name
            self.tel = addr.mobile
            self.addressProvince = addr.province
            self.addressCity = addr.city
            self.addressDistrict = addr.district
            self.isdefault = addr.isDefault
            self.address = addr.address

            console.log(addr)
        }

        this.getCityData()
        
    },
    components: {

    },
    methods: {

        getCityData(){
            let self = this
            Vue.http.get(cityDataJson)
              .then(function (data) {
                  let response = data.body

                  self.cityData = response

                self.addressSlots[0].values = self.province()
                self.addressSlots[1].values = self.city('市辖区')
                self.addressSlots[2].values = self.district('北京', '市辖区')

              })
        },

        province(){
            let p = []
            let clist = this.cityData

            clist.forEach(function(item,index) {
                p.push(item.name)
            })

            return p
        },
        city(p){

            let c = []
            let clist = this.cityData
            clist.forEach(function(item,index) {
                if(item.name === p){
                    let cc = item.children
                    cc.forEach(function(itemc,indexc) {
                        c.push(itemc.name)
                    })
                }
                
            })
            // console.log(c)
            return c
        },
        district(p,c) {
            let d = []
            let clist = this.cityData
            clist.forEach(function(item,index) {
                if(item.name === p){
                    let cc = item.children
                    cc.forEach(function(itemc,indexc) {

                        if(itemc.name === c){

                            let dd = itemc.children

                            dd.forEach(function(itemd, indexd) {
                                d.push(itemd.name)
                            })

                        }
                        
                    })
                }
                
            })
            return d 
        },
        onAddressChange(picker, values) {
            this.values = values.join(',')
            
            if(this.$route.params.addressId&&this.firstChange){
                picker.setValues([this.addressProvince, this.addressCity,
                this.addressDistrict])
            console.log(values)

                
                this.firstChange = false
            }else{
                this.addressProvince = values[0];
                this.addressCity = values[1];
                this.addressDistrict = values[2];
            }
            // if(i>0){
                
            // }

            picker.setSlotValues(1, this.city(values[0]));
            picker.setSlotValues(2, this.district(values[0], values[1]));
            
            
            
                
            
          },
        changeCity(){

        },
        closeCity(){

        },
        onSave () {

            if(this.name === "" || this.tel === "" || this.address === "" || this.tel.length!=11){
                alert('请填写完整的正确信息！')
                return
            }

            this.btnText = '保存中...'

            let df = this.isdefault?1:0

             let params = this.params+'&address='+this.address+'&city='+this.addressCity+'&district='+this.addressDistrict+'&id='+this.id+'&isDefault='+df+'&mobile='+this.tel+'&name='+this.name+'&province='+this.addressProvince
            

            this.$http.get(createUrl+params)
                .then((response) => {
                    let data = JSON.parse(response.body)
                    if(data.code != "0" ){
                        alert(data.info)
                        this.btnText = '保存'
                        return
                    }

                    this.$router.push('/mine/addressList')


                    // this.update()

                })
            
            
        },
        update () {

            

            let newAddr = {}

            for(let p in this.$data){
                newAddr[p] = this.$data[p]
            }

            //更新地址
            window.addressList[window.CurrentId] = newAddr


            //设置默认地址
            if(this.isdefault){

                for(var p in window.addressList){
                    window.addressList[p].isdefault = 0;
                }

                window.addressList[window.CurrentId].isdefault = 1;
            }

            
            // debugger

            this.$route.router.go({path: '/'})
        }
    }
}
    
</script>
