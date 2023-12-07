<template>
    <div>
      <div v-for="order in orders" :key="order.id" class="order">
        <div class="product-info">
          <img :src="order.product.image" alt="Product Image" />
          <div class="details">
            <h2>{{ order.product.name }}</h2>
            <p>价格: ${{ order.product.price }}</p>
          </div>
        </div>
        <div class="order-info">
          <p>剩余结算时间: {{ order.remainingTime }}</p>
          <button @click="payOrder(order)">支付订单</button>
          <button @click="cancelOrder(order)">取消订单</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import {useUserStore} from "@/stores/user";
  import axios  from 'axios';



  
  export default {
    setup() {
      // 订单列表
      const orders = ref([]);
      const userStore = useUserStore();
      // 模拟加载订单列表的异步请求
      const loadOrders = async () => {
        // 实际应该从后端获取数据
         const response = await axios.get(`api/order/listByUser?userid=${userStore.getUserId()}`)
        console.log(response);
        orders.value = response.map(order => ({
          ...order,
          remainingTime: computeRemainingTime(order.orderTime),
        }));
      };
  
      // 计算剩余结算时间的函数
      const computeRemainingTime = orderTime => {
        const currentTime = new Date();
        const expirationTime = new Date(orderTime);
        const remainingMilliseconds = expirationTime - currentTime;
        const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
        const seconds = remainingSeconds % 60;
        const minutes = Math.floor(remainingSeconds / 60) % 60;
        const hours = Math.floor(remainingSeconds / 3600);
  
        return `${hours}小时 ${minutes}分钟 ${seconds}秒`;
      };
  
      // 支付订单的函数
      const payOrder = order => {
        // 实际应该调用支付接口等操作
        console.log(`支付订单: ${order.id}`);
      };
  
      // 取消订单的函数
      const cancelOrder = order => {
        // 实际应该调用取消订单接口等操作
        console.log(`取消订单: ${order.id}`);
      };
  
      // 在组件挂载后加载订单列表
      onMounted(() => {
        loadOrders();
      });
  
      return {
        orders,
        payOrder,
        cancelOrder,
      };
    },
  };
  </script>
  
  <style scoped>
  .order {
    display: flex;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 800px;
  }
  
  .product-info {
    display: flex;
    align-items: center;
  }

  .order-info {
    display: flex;
    align-items: center;
  }
  
  .details {
    margin-left: 20px;
  }
  
  img {
    max-width: 100px;
    max-height: 100px;
  }
  </style>
  