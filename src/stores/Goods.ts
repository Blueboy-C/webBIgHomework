import { defineStore } from 'pinia'
import {ref,computed} from "vue"
import axios from 'axios';
import { useUserStore } from './user';

export const useGoodsStore = defineStore('goods', () => {
     const goodsList:any = ref([]); //商品列表
     const shopCarList:any= ref([]); //购物车列表
     const hostname = "http://10.60.82.146:8080/" //主机名
     const userStore = useUserStore() //用户仓库
     const orderList :any = ref([])
     const cartList :any = ref([])

     const curOrderList :any = ref([])
     let orderListTotal = computed(()=>{
         let t =0
         curOrderList.value.forEach((item:any)=>{
             t+=item.price*item.num ||item.price1*item.count
         })
         return t
     })
     const orderDisplay = ref(false)

     async function addCar(data:any){
      //  shopCarList.value.push(data)
       const response = await axios.get(`api/cart/add?userId=${userStore.getUserId()}&goodsId=${data.id}&num=${data.count}&price=${data.price1}`)
       getCar()
    //    console.log(response);
     }

     async function delCar(data:any){
        console.log("data",data);
        const response = await axios.get(`api/cart/deleteById?userId=${userStore.getUserId()}&cartId=${data.cardid}`)
        console.log(response);
        getCar()
     }
      function clearCar(){
      shopCarList.value = []
     }

     async function getCar(){
         const response =  await axios.get(`api/cart/listByUser?userId=${userStore.getUserId()}`)
         shopCarList.value = response.data
         shopCarList.value.forEach((item:any)=>{
            item.checked=true
         })
         
     }


     async function getGoodsList(){
      const response =  await axios.get("api/goods/list")
      goodsList.value = response.data
      goodsList.value.forEach((item:any)=>{
         item.checked= false
         item.count = 1
      })
     }


     async function createOrder(){
         if(cartList.value.length==0) return ;
         const response =  await axios.get(`api/order/addCastOrder?userId=${userStore.getUserId()}&cartList=${cartList.value}`)
         cartList.value=[]
     }
     
     function addOrder(item:any){
         cartList.value.push(item.cardid)
     }

     async function getOrderList(){
         const response =  await axios.get(`api/order/listByUser?userId=${userStore.getUserId()}`)
         orderList.value = response.data
         await orderList.value.forEach((item:any)=>{
            item.total = 0
            item.orderDetail.forEach((it:any)=>{
                item.total += Number(it.nums.split('=')[1])
            })
            console.log(item.id);
            
         })
         console.log("order", orderList.value);
         
     }

     function pay(){
        alert("账户异常，无法支付")
        orderDisplay.value=false
     }
     return {goodsList,addCar,hostname,delCar,clearCar,getCar,shopCarList,getGoodsList,createOrder,orderList,addOrder,getOrderList,orderDisplay,curOrderList,orderListTotal,pay}
})