<style lang=sass>
    @import "../../sass/_cityselect.scss";
</style>

<template>
<div>
<div class="vue-select-mask" v-show="visible"></div>
<div class="vue-select" :class="visible?visibleCls:''">
    <div class="vue-select-actions">
        <div class="vue-select-btn-left vue-select-cancel"><span @click="close">{{cancelText}}</span></div>
        <div class="vue-select-btn-right  vue-select-ok" @click="change"><span>{{okText}}</span></div>
    </div>
    <div class="vue-select-container">
        <select-item :name="provinceName" :items="province"></select-item>
        <select-item :name="cityName" :items="city"></select-item>
        <select-item :name="countyName" :items="county"></select-item>
    </div>
    </div>
</div>
</div>
</template>

<script>
import selectItem from "./selectItem"
import cityData from "./cityInitData"

export default{
    components:{
        selectItem
    },
    props:{
        "visible":{
            type:Boolean,
            default:false,
            twoWay:true
        },
        "provinceName":{
            type:String,
            default:"province"
        },
        "cityName":{
            type:String,
            default:"city"
        },
        "countyName":{
            type:String,
            default:"county"
        },
        cancelText:{
            type:String,
            default:"取消"
        },
        okText:{
            type:String,
            default:"确定"
        }
    },
    data(){
        return{
            selected:{},
            visibleCls:"vue-select-show",
            source:cityData,
            province:[],
            city:[],
            county:[]
        }
    },
    created(){

        this.province=this.source.nodes;
        this.city=this.source.nodes[0].c;
        this.county=this.city[0].c;
        this.selected={
            province:this.province[0]['v'],
            city:this.city[0]['v'],
            county:this.county[0]['v']
        }
    },
    events:{
        changeValue(ev){
            let self=this;
            let name=ev.name;
            let item=ev.item;
            if(name=="province"){
                self.selected.province=item.v;
                self.province.forEach(function(element, index) {
                   if(element.v==item.v){
                        self.city=element['c'];
                        self.county=self.city[0].c;
                        self.selected.city=self.city[0].v;
                        if(self.county&&self.county.length){
                            self.selected.county=self.county[0].v;
                        }else{
                            self.selected.county="";
                        }
                   }
                });
            }
            if(name=="city"){
                self.selected.city=item.v;
                self.city.forEach(function(element, index) {
                   if(element.v==item.v){
                        self.county=element['c'];
                        if(self.county&&self.county.length){
                            self.selected.county=self.county[0].v;
                        }else{
                            self.selected.county="";
                        }
                   }
                });
            }
            if(name=="county"){
                self.selected.county=item.v;
            }
        }
    },
    methods:{
        close(){
            this.visible=false;
        },
        change(){
            this.close();
            this.$emit("change",this.selected);
        }
    }
}

</script>