<style scoped>
.Goods{
    width:90vw;
    height: 800px;
    background-color:aqua;
}
.Goods h1{
    /* width: 100%; */
    text-align: center;
    
}

</style>

<template>
    <div class="Goods">
        <!-- <h1>商品列表</h1> -->
        <el-table :data="useGoods.goodsList" height="600" style="width: 100%" >
            <el-table-column label="选择" width="55" >
                    <template #default="scope">
                         <input type="checkbox" :checked="scope.row.checked" v-model="scope.row.checked">
                    </template>
                </el-table-column>
            <el-table-column prop="name" label="商品名称" width="200" align="center"/>
            <el-table-column  label="商品图片" width="200" align="center">
                <template #default="scope">
                    <img :src="useGoods.hostname+scope.row.pthumbnail" alt="图片丢失" style="width: 200px;height: 200px;">
                </template>
            </el-table-column>
            <el-table-column prop="price1" label="商品价格" align="center"/> 
            <el-table-column  label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" @click="buyThis(scope.row)">购买</el-button>
                    <el-button type="success" @click="addCar(scope.row)"><el-icon><Shop /></el-icon>加入购物车</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-card style="width: 100%;">
          <div style="width:100%;height:auto;display: flex;justify-content: space-between;">
             <el-button type="primary" @click="addShopCar">批量加入购物车</el-button>
              <el-badge :value="useGoods.shopCarList.length" class="item">
                <el-button @click="()=>{$router.push('/shopcar')}"><el-icon><Shop /></el-icon></el-button>
            </el-badge>
          </div>
        </el-card>
    </div>
</template>

<script setup>

import {useGoodsStore} from  "@/stores/Goods"
const useGoods = useGoodsStore()
import {ref , onMounted ,computed} from "vue"
import axios from "axios"
import {useRouter}  from "vue-router"
import { ElMessage } from 'element-plus'
const $router = useRouter()

const goodsStore = useGoodsStore()




onMounted(()=>{
    //  useGoods.getGoodsList()
  
})


function buyThis(row){
    if(localStorage.getItem("userId")==null){
        alert("请先登录！")
        $router.push('/login')
        return
    }
    goodsStore.curOrderList =[]
    goodsStore.curOrderList.push(row)
    goodsStore.orderDisplay = true
}

function addCar(data){
    if(localStorage.getItem("userId")==null){
        alert("请先登录！")
        $router.push('/login')
    }
    else{
        let flag =0 ;
        useGoods.shopCarList.forEach(item=>{
            if(item.goodsId==data.id) {
                flag=1
            }
        })
        if(flag){
            ElMessage({
                // showClose: true,
                message: '有了',
                type:'waring'
            })
        }
        else {
            useGoods.addCar(data)
            ElMessage({
                showClose: true,
                message: '添加成功',
                type: 'success'
            })
        }

    }
 
}



//生成订单
function addShopCar(){
    goodsStore.goodsList.forEach(item=>{
        if(item.checked) addCar(item)
    })
}

</script>