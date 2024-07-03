<template>
  <div ref="chartContainer" class="echarts-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  PieChart,
  CanvasRenderer
]);

const chartContainer = ref(null);
let chartInstance = null;

const initChart = () => {
  chartInstance = echarts.init(chartContainer.value);
  const option = {
    title: {
      text: '排名前五阅读类型',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '7%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '科幻' },
          { value: 735, name: '人文' },
          { value: 580, name: '恐怖' },
          { value: 484, name: '艺术' },
          { value: 300, name: '历史' }
        ]
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
  height:45%;
  background-color: rgba(183, 216, 245, 0.486);
}
</style>
