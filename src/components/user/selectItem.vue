<template>
<div class="vue-select-list">
    <div class="vue-select-l"></div>
    <div class="vue-select-whl">
        <div :id="wrapperId" class="vue-select-wrapper">
            <div class="vue-select-scroll">
                <div v-for="(item,index) in items" :data-index="index"  class="vue-select-item" :class="item.v==selected?selectedCls:''"  >{{item.v}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import iScroll from "./iscroll.js"
export default{
    props:{
        items:{
            type:Array,
            default:[]
        },
        name:{
            type:String,
            default:null
        }
    },
    data(){
        return{
            wrapperId:null,
            selected:null,
            scroller:null,
            height:40,
            selectedCls:"vue-select-selected"
        }
    },
    
    watch:{

        items(val){
            this.scroller.refresh();
            this.setSelected(0);
        }
    },
    created(){
        let self=this;
        self.wrapperId=self.name+"_"+new Date().getTime();
    },
    ready(){
        let self=this;
        self.scroller=new iScroll("#"+self.wrapperId);
        let pageY;
        self.scroller.on("scrollEnd",function(){
            let y=Math.abs(Math.round(this.y/self.height));
            if(pageY!=y){
                pageY=y;
                self.setSelected(pageY);
            }else{
                self.scroller.scrollTo(0,-pageY*self.height)
            }
        });
        self.setSelected(0);
    },
    methods:{
        setSelected(index){
            let len=this.items.length;
            for(let i=0;i<len;i++){
                if(i==index){
                    this.selected=this.items[i].v;
                    let y=index*this.height;
                    this.scroller.scrollTo(0,-y);
                    //console.log(this.items[i])
                    this.$emit("changeValue",{
                        name:this.name,
                        item:this.items[i]
                    });
                    return false;
                }
            }
        }
    }
}

</script>