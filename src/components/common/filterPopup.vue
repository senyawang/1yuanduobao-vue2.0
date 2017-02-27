<template>
    <!-- <div v-show='showFilter'> -->
        <popup :show.sync="show" height="50vh">
            <div class="pop-header">
                <a href="javascript:;" @click='filterCancel' class="cancel">取消</a>
                <a href="javascript:;" @click='filterConfirm' class="confirm">确认</a>
                <a href="javascript:;" @click='filterClear' class="clear">清空选项</a>
            </div>

            <div class="pop-cont">
                <div class="pop-tabs-menu">
                    <a 
                        v-for='(index,menu) in filterMenu' 
                        href="javascript:;" class="ptm-item" 
                        :class='{"active": index === this.tabsCurrentIndex}'
                        @click='this.tabsCurrentIndex = index'>

                            {{menu.name}} 

                            <span v-show='menu.showDot' class="dot">●</span>

                    </a>
                </div>
                <div class="pop-tabs-cont">
                    <div class="ptc-item" id="flyTime">
                        <div class="ui-list">
                            <label class="ul-item">
                                <input class="checkbox" type="checkbox" value='0' v-model="checkedFT">
                                不限
                            </label>
                            <label v-for='time in flyTime' class="ul-item">
                                <input class="checkbox" type="checkbox" value='{{time.id}}' v-model="checkedFlyTime">
                                {{time.cont}}
                            </label>
                        </div>
                    </div>
                    <div class="ptc-item" id="airport" style="display: none;">
                        <div class="ui-list">
                            <label class="ul-item">
                                <input class="checkbox" type="checkbox" value='0' v-model="checkedAP">
                                不限
                            </label>
                            <label v-for='air in airport' class="ul-item">
                                <input class="checkbox" type="checkbox" value='{{air.code}}' v-model="checkedAirport">
                                {{air.name}}
                            </label>
                            
                        </div>
                    </div>
                    <div class="ptc-item" id="airSeat" style="display: none;">
                        <div class="ui-list">
                            <label class="ul-item">
                                <input class="checkbox" type="checkbox" value='0' v-model="checkedAS">
                                不限
                            </label>
                            <label v-for='seat in airSeat' class="ul-item">
                                <input class="checkbox" type="checkbox" value='{{seat.id}}' v-model="checkedAirSeat">
                                {{seat.cont}}
                            </label>
                            
                        </div>
                    </div>
                </div>
            </div>
        </popup>
    <!-- </div> -->
</template>

<script>
    import Popup from 'vux-components/popup'
    export default {
        data() {
            return {
                show: false,

                checkedFlyTime: [],
                checkedAirport: [],
                checkedAirSeat: [],

                checkedFT: true,
                checkedAP: true,
                checkedAS: true,
                tabsCurrentIndex: 0
            }
        },
        props: {
                filterConfirm: {
                    type: Function
                },
                showFilter: {
                    type: Boolean,
                    twoWay: true
                },
                filterMenu: {
                    type: Array,
                    default(){
                        return [
                        {'name':'起飞时段', 'showDot': false}, 
                        {'name':'航空公司', 'showDot': false},
                        {'name':'舱位', 'showDot': false}
                    ]}
                },

                flyTime: {
                    type: Array,
                    default() {
                        return [
                        {'id': '1', 'cont':'00:00-06:00'}, 
                        {'id':'2', 'cont':'06:00-12:00'}
                    ]}
                },

                airport: {
                    type: Array,
                    default() {
                        return [
                        {'code':'CA','name':'中国国航'}, 
                        {'code':'CB','name':'中国南航'}, 
                        {'code':'CD','name':'中国北航'}, 
                        {'code':'CE','name':'中国东航'}
                    ]}
                },

                airSeat: {
                    type: Array,
                    default(){
                        return [
                        {'id': '1', 'cont':'商务舱'}, 
                        {'id': '2', 'cont':'经济舱'}, 
                        {'id': '3', 'cont':'头等舱'}
                    ]}
                }

                

                
        },
        components: {
            Popup
        },
        methods: {
            filterConfirm () {
                this.showFilter = false
                let args = [this.checkedFlyTime, this.checkedAirport, this.checkedAirSeat]
                
                this.$emit('on-confirm', args)
            },
            filterCancel () {
                this.showFilter = false
            },
            filterClear () {
                document.location.reload()
            }
        },
        computed: {
            // show () {
            //     return this.showFilter
            // },
            ifFilter(){
                if(this.checkedAP&this.checkedFT&this.checkedAS){
                    return false
                }else{
                    return true
                }
            }
        },
        watch: {
            show(val){
                this.showFilter = val
            },
            showFilter(val){
                this.show = val
                this.$dispatch('show-filter', val)
            },
            tabsCurrentIndex (val) {
                var tabs = document.querySelectorAll('.ptc-item')
                Array.prototype.forEach.call(tabs, function(item,index) {
                    item.style.display = 'none'
                })
                tabs[val].style.display = 'block'
            },
            checkedFlyTime (val) {
                if(val.length>0){
                    this.checkedFT = false
                    this.filterMenu[0].showDot = true
                    this.ifFilter = true
                }else{
                    this.checkedFT = true
                }
            },
            checkedFT (val) {
                if(val){
                    this.checkedFlyTime = []
                    this.filterMenu[0].showDot = false
                }
            },
            checkedAirport (val) {
                if(val.length>0){
                    this.checkedAP = false
                    this.filterMenu[1].showDot = true
                    this.ifFilter = true
                }else{
                    this.checkedAP = true
                }
            },
            checkedAP (val) {
                if(val){
                    this.checkedAirport = []
                    this.filterMenu[1].showDot = false

                }
            },
            checkedAirSeat (val) {
                if(val.length>0){
                    this.checkedAS = false
                    this.filterMenu[2].showDot = true
                    this.ifFilter = true
                }else{
                    this.checkedAS = true
                }
            },
            checkedAS (val) {
                if(val){
                    this.checkedAirSeat = []
                    this.filterMenu[2].showDot = false

                }
            }
        }
    }
</script>







