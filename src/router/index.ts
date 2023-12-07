import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/components/Home/index.vue'
import ShopCar from '@/views/ShopCar.vue'
import Goods from "@/views/Goods.vue"
import OrderForm from "@/views/OrderForm.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
      redirect:'/goods',
      children:[
        {
          path: '/shopcar',
          name: '购物车',
          component:ShopCar,
        },{
          path: '/goods',
          name: '商品首页',
          component:Goods,
        },{
          path:'/orders',
          name:'订单列表',
          component:OrderForm
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})


router.beforeEach((to,from,next)=>{
  if(to.path == '/goods') next()
  else if(localStorage.getItem("userId")== null){
      if(to.path=='/login') next()
      else router.push('/login')
  }else{
    if(to.path!=='/login') next()
    else router.push('/')
  }
}) 

// router.afterEach((to,from)=>{
// // if(to.path!=='/404'&&from.path!=='/login'){
// //   localStorage.removeItem("currentRoute")
// //   localStorage.setItem("currentRoute",to.path)
// // }
// document.title=to.meta.title as string  
// if(from.path=='/login'){
// ElMessage({
//   type:'success',
//   message:`欢迎回来${localStorage.getItem('userName')}`
// })
// }
// })

export default router
