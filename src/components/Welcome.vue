<template>
    <div class="welcome bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-white mb-10">欢迎光临罗森，冰皮蛋糕多种口味欢迎选购！</h1>
      
      <img src="../assets/img/1.jpg"  class="mt-10 mb-20 w-48 h-48 object-cover rounded-full">
  
      <button @click="goToStudentList" class="bg-red-600 hover:bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-300">
  进入顾客列表
</button>

    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goToStudentList() {
    router.push({ name: 'StudentList' });
  }
  </script>
  
  <style scoped>
  .welcome {
    background-size: cover;
    background-position: center;
  }
  </style>
  