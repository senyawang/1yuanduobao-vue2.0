<template>
<section class="address-list">

  <div v-for='(item, index) in addressList' class="ui-box address-box">
    <div class="ub-bd">
        <div class="ab-bd">
          <div>
          <h3 class="ab-item">
              {{item.province+item.city+item.district+item.address}}
          </h3>
          </div>
          <span class="ab-item">
              {{item.name}}
          </span>
          <span class="ab-item">
              {{item.mobile}}
          </span>
          
        </div>
    </div>
    <div class="ub-bd">
        <div class="ub-btn">

            <a @click='editAddress(item.id)'><img src="../../assets/i-edit.png" height="18" alt="">编辑</a>

            <a @click='delAddress(item.id)'><img src="../../assets/i-del.png" height="18" alt="">删除</a>

        </div>
        <p>
            <label style="color:red;">
            <input @click='setDefault(item.id, index, $event)' type="radio" :value="item.id" :checked='item.isDefault=="1" ? "checked" : false' name="defaultAddress">
            设为收货地址
            </label>
        </p>
    </div>
  </div>

  <div class="btn-area">
      <a @click='addNew' class="ui-btn">新增收货地址</a>
    </div>

</section>
</template>

<script>

import Vue from 'vue'
import localStorage from '../../utils/localStorage.js'
let addressUrl = './user/profile/address_list.html'
let delUrl = './user/profile/delete_address.html'
let dfUrl = './user/profile/add_modify_address.html'


export default {
    
    data () {
        return {
            show: true,
            addressList: []
        }
    },
    components: {
    },
    created () {
      this.getAddressList()
    },
    methods: {
        getAddressList(){
          let self = this

          Vue.http.get(addressUrl+self.params)
              .then(function (data) {
                  let response = JSON.parse(data.body).data

                  self.addressList = response.addressList

              })
        },
        setDefault: function(id, index, $event){

            if(!confirm('确定设为收货地址吗？')){

              $event.preventDefault()
              return
            }


            let self = this

            let cur = this.addressList[index]

            let params = self.params+'&address='+cur.address+'&city='+cur.city+'&district='+cur.district+'&id='+cur.id+'&isDefault=1&mobile='+cur.mobile+'&name='+cur.name+'&province='+cur.province

            Vue.http.get(dfUrl+params)
                .then(function (data) {
                    let response = data.body.data

                                       
                })

        },
        showDialog: function(id){
            window.CurrentId = id;
            // Dialog.show = true;
            console.log(window.CurrentId)
        },
        delAddress: function(id){
            var self = this;

            if(confirm('确定删除吗?')){
              onConfirmCallback()
            }

            function onConfirmCallback(){

              let params = self.params + '&id=' + id

              Vue.http.get(delUrl+params)
                .then(function (data) {
                    self.getAddressList()
                })
              
            }

        },
        editAddress: function (id) {
          this.addressList.forEach(function(item,index) {
            if(item.id === id){
              localStorage.set('CURADDRESS', JSON.stringify(item))
            }
          })

          this.$router.push({name: "update", params:{addressId: id}})
        },
        addNew: function() {
          window.CurrentId = 0;
          this.$router.push('/mine/create')
        },
        onAction () {
          
        }
    }
}
    
</script>

<style lang='scss' scope>
  .address-list{
    padding-top: 20px;
  }
  h3{color: #333;}
  .address-box .ub-bd{
    .ub-btn{
      float: right;
    }
  }
  .address-box .ub-bd:first-child{
    background-image: -webkit-linear-gradient(-45deg, #fa393e 12.5%, #fff 12.5%, #fff 37.50%, #2490c8 37.50%, #2490c8 62.5%, #fff 62.5%, #fff 87.5%, #fa393c 87.5%);
    background-size: 100px 5px;
    background-repeat: repeat-x;
  }
  .address-box .ub-btn a{
    display: inline-block;
    width: 4em;
    padding: 5px 0;
    text-align: center;
    img{
      vertical-align: -4PX;
    }
    background: #f0eff5;
  }
</style>
