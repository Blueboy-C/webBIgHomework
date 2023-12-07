<style scoped>
.shopCar{
    width:90%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.shopCar h1{
    width: 100%;
    height: 5vh;
    text-align: center;
    background-color: rgb(248, 125, 125);
}

.goodsTable{
    width: 100%;
    height:70vh;
    overflow-y: scroll;
    margin-top: 50px;
}

.opRail{
    width: 100%;
    flex:10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(240, 229, 229);
    margin-bottom:50px;
}

.perOrder{
     margin: 10px;
     border: 2px solid rgb(131, 139, 231);
  }
.selectBt{
   width: 20px;
   height: 20px;
}



</style>


<template>
    <div class="shopCar">
         <!-- <h1>购物车</h1> -->
         <div class="goodsTable">
                <el-table
                    :data="useGoods.shopCarList"
                     height="100%"
                     highlight-current-row:false
                     >
                >
                <el-table-column label="选择" width="55" >
                    <template #default="scope">
                         <input type="checkbox" :checked="scope.row.checked" v-model="scope.row.checked">
                    </template>
                </el-table-column>
                <el-table-column property="name" label="商品名称" w align="center" />
                <el-table-column  label="商品图片" width="200" align="center">
                <template #default="scope">
                    <img :src="hostname+scope.row.thumbnail" alt="图片丢失" style="width: 200px;height: 200px;">
                </template>
                </el-table-column>
                <el-table-column property="price" label="单价"  align="center"/>

                <el-table-column label="数量"  align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small"><el-icon @click="()=>{return scope.row.num<99?scope.row.num++:99}"><Plus /></el-icon></el-button>
                           
                            <el-tag class="ml-2" type="warning"> {{  scope.row.num  }}</el-tag>
                        <el-button type="warning" size="small" @click="()=>{return scope.row.num>0?scope.row.num--:0}"><el-icon><Minus /></el-icon></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template #default="scope">
                        <el-button type="success"  @click="pay(scope.row)">结算</el-button>
                        <el-button type="danger"  @click="useGoods.delCar(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column property="address" label="数量"  align="center"/> -->
                </el-table>
         </div>
         <div class="opRail">
              <input type="checkbox"  class="selectBt" :checked="isAllChecked" v-model="isAllChecked" :disabled="useGoods.shopCarList.length>0?false:true">
              <div></div>
              <el-button type="danger" @click="clearCar">清空购物车</el-button>
              <div><span>总价：</span><span>{{ total }}</span></div>
              <el-button type="success"  @click="toPay">结算</el-button>
             
         </div>
    
    </div>

 
</template>

<script lang="ts" setup>
import { onMounted, ref ,computed } from 'vue'
import { ElTable } from 'element-plus'
import {useGoodsStore} from  "@/stores/Goods"
import { useUserStore } from '@/stores/user'
import {useRouter} from "vue-router"
const $router =useRouter()
const useGoods = useGoodsStore()
const userStore =useUserStore()
const hostname = useGoods.hostname
const nowOrderList:any = ref([])

const drawerDisplay = ref(false)

//全选
let isAllChecked =  computed({
   get:()=>{
    if(useGoods.shopCarList.length<=0) return false 
    let all=true;
    useGoods.shopCarList.forEach((item:any)=>{
         all=all&&item.checked
    })
    return all
   },
   set:(val)=>{
        if(useGoods.shopCarList.length<=0) return false 
          useGoods.shopCarList.forEach((item:any)=>{
            item.checked=val
        })
        return val;
   }
})
let orderListTotal = computed(()=>{
    let t=0;
    nowOrderList.value.forEach((item:any)=>{
        t += item.price*item.num
    })

    return t;
})
let total:any = computed(()=>{
    let t=0;
    useGoods.shopCarList.forEach((item:any)=>{
        if(item.checked) t=t+item.price*item.num;
    })
    return t;
})


async function gernateOrder(){
    useGoods.curOrderList =[]
    await useGoods.shopCarList.forEach((item:any)=>{
        if(item.checked) useGoods.curOrderList.push(item)
    })
    useGoods.orderDisplay= true
}


async function toPay(){
    if(useGoods.shopCarList.length<=0) return false
    
    await useGoods.shopCarList.forEach((item:any)=>{
        if(item.checked) useGoods.addOrder(item)
    })
    await useGoods.createOrder()
    await useGoods.getOrderList()
    useGoods.getCar()
    gernateOrder()
}
async function pay(row:any){
     await useGoods.addOrder(row)
     await useGoods.createOrder()
     await useGoods.getOrderList()
     gernateOrder()
     useGoods.getCar()
}
     

function clearCar(){
    useGoods.shopCarList.forEach((item:any)=>{
        useGoods.delCar(item)
    })
}





onMounted(()=>{
    // if(useGoods.shopCarList.length<=0){
    //     useGoods.getCar()
    //     console.log("get car list");
    // }
    console.log(userStore.getUserId());
})

</script>