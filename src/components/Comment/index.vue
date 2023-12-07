<style>
.chatBox{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
}

.showArea{
    height: 400px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.perMsg{
    width: 100%;
    height:50px;
    display: flex;
    background-color: rgb(107, 173, 173);
    margin: 5px;
}

.inputBox{
     height:45px;
    width: 100%;
    display: flex;
    background-color: rgb(148, 188, 188);
}


</style>


<template>  
   <div class="chatBox"> 
        <h1 style="width:100%;height;100%;text-align:center">留言框</h1>
        <div class="showArea">
            <div v-for="item in msgArr" class="perMsg" >
                <div style="flex:3"><span>用户id:</span>{{ item.id }}</div>
                <div style="flex:7;text-align: center;">
                    <p>{{ item.msg }}</p>
                </div>
            </div>
        </div>
        <div class="inputBox">
             <input type="text" v-model="msg" style="width: 95%;height: 100%;background-color: rgb(148, 188, 188);"><button @click="sendMsg" style="width: 5%;height: 100%;background-color: rgb(18, 225, 225);">发送</button>             
        </div>
   </div>
</template>


<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import axios from 'axios'
const textarea1 = ref('')
const textarea2 = ref('')

let msg =ref("")
let msgArr = ref<any>([])
function getComment(){
    axios.get("http://localhost:3000").then((res)=>{
        msgArr.value=res.data.data
    })
}

function sendMsg(){
    if(msg.value.trim()!=""){
        let id=Math.random()*100
       msgArr.value.push({
        id,
        msg:msg.value,
       })
       msg.value=""
    }
   
}

onMounted(()=>{
    let showArea = document.querySelector('.showArea')
    getComment();
})


</script>