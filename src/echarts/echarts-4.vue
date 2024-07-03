<template>
  <div ref="chartContainer" class="echarts-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ScatterChart,
  CanvasRenderer
]);

const chartContainer = ref(null);
let chartInstance = null;

const initChart = () => {
  chartInstance = echarts.init(chartContainer.value);
  const option = {
    title: {
      text: '各年龄阶段对应平均阅读数量',
      left: 'center'
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10, 4.04],
          [11, 4.95],
          [12, 4.58],
          [13, 4.81],
          [14, 5.33],
          [15, 5.66],
          [16, 6.81],
          [17, 6.33],
          [18, 8.96],
          [19, 6.82],
          [20, 7.2],
          [21, 5.2],
          [22, 4.23],
          [23, 4.83],
        ],
        type: 'scatter'
      }
    ]
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
  width: auto;
  height: 45%; /* Adjust height as needed */
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.486);
}
</style>
