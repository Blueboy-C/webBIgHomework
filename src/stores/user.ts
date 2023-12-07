import { defineStore } from 'pinia'
import {ref,reactive} from "vue"
import axios  from 'axios'
import { useRouter } from 'vue-router'


export const useUserStore = defineStore('user', () => {
    const userName = "ikun66"
    const passwd = 123456
    const $router = useRouter()
    const token = ref("")
    let userId :any= localStorage.getItem("userId")
   function login(user:string,pass:string){
      axios.get(`api/user/login?name=${user}&password=${pass}`).then(res=>{
         if(res.data!="invalid"){
            $router.push('/')
            setUserId(res.data)
         }else{
           alert("账号或密码错误")
         }
       })
    }

    function setUserId(userid:any){
       userId= userid
       localStorage.setItem('userId', userid)
    }

    function getUserId(){
      return userId
    }

    function logout(){
       userId= ""
       localStorage.removeItem('userId')
       $router.push('/login')
       console.log(localStorage.getItem('userId'));
      
    }
    return { userName,passwd ,token ,setUserId,getUserId,login,logout}
  })