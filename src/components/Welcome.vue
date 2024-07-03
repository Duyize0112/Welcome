<template>
    <div class="welcome bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-white mb-10">欢迎登录中华女子学院图书管理系统！</h1>
      
      <img src="../assets/img/1.jpg"  class="mt-10 mb-20 w-48 h-48 object-cover rounded-full">
  
      <button @click="goToStudentList" class="bg-red-600 hover:bg-red-900 text-white px-6 py-3 mb-8 rounded-lg shadow-lg transition-colors duration-300">
  进入读者列表
</button>
<a-button  type="primary" @click="goToThreeD"> 3D</a-button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goToStudentList() {
    router.push({ name: 'StudentList' });
  }
  function goToThreeD() {
    router.push({ name: 'Library' });
  }
  </script>
  