<template>
    <div class="page-container">
        
      <div class="chart-left">
        <echarts1></echarts1>
        <echarts2></echarts2>
      </div>
      <div class="web3d-container">
        <web3D></web3D>
      </div>
      <div class="chart-right">
        <echarts3></echarts3>
        <echarts4></echarts4>
      </div>
    </div>
  </template>
  
  <script>
  import web3D from './web3D.vue';
  import echarts1 from '../echarts/echarts-1.vue';
  import echarts2 from '../echarts/echarts-2.vue';
  import echarts3 from '../echarts/echarts-3.vue';
  import echarts4 from '../echarts/echarts-4.vue';
  
  export default {
    components: {
      web3D,
      echarts1,
      echarts2,
      echarts3,
      echarts4
    }
  }
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    height: 100vh;
    position: relative; /* Ensure relative positioning for absolute children */
  }
  
  .chart-left {
    position: absolute;
    padding-top: 40px;
    top: 0;
    left: 0;
    bottom: 0;
    width: 25%; /* Adjust as needed */
    z-index: 1; /* Ensure charts on the left are above web3D */
    display: flex;
    flex-direction: column;
  }
  
  .web3d-container {
    flex: 1;
    position: relative; /* Ensure web3D remains in the document flow */
    z-index: 0; /* Ensure web3D is at the bottom */
  }
  
  .chart-right {
    position: absolute;
    padding-top: 40px;
    top: 0;
    right: 0;
    bottom: 0;
    width: 25%; /* Adjust as needed */
    z-index: 1; /* Ensure charts on the right are above web3D */
    display: flex;
    flex-direction: column;
  }
  </style>
  