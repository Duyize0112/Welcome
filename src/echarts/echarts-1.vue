<!-- EChartsBarChart.vue -->

<template>
    <div ref="chartContainer" class="echarts-chart"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as echarts from 'echarts/core';
  import { BarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent
  } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  // 使用必须的组件注册
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    BarChart,
    CanvasRenderer
  ]);
  
  const chartContainer = ref(null);
  let chartInstance = null;
  
  // 初始化 ECharts 图表
  const initChart = () => {
    chartInstance = echarts.init(chartContainer.value);
    const option = {
      title: {
        text: '读者等级分布图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['S', 'A', 'B', 'C']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [2, 3, 2, 2], // 示例数据，根据实际情况调整
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        itemStyle: {
          color: 'rgba(0, 128, 255, 0.5)' // 设置柱状图的背景色为半透明
        }
      }]
    };
    chartInstance.setOption(option);
  };
  
  onMounted(() => {
    initChart();
  });
  
  onUnmounted(() => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  });
  </script>
  
  <style scoped>
  .echarts-chart {
    width: 100%;
    height: 45%;
    background-color: rgba(240, 248, 255, 0.486);
  }
  </style>
  