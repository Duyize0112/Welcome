<template>
  <div ref="chartContainer" class="echarts-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 使用必须的组件注册
echarts.use([TitleComponent, TooltipComponent, GridComponent, ToolboxComponent, LineChart, CanvasRenderer]);

const chartContainer = ref(null);
let chartInstance = null;

// 初始化 ECharts 图表
const initChart = () => {
  chartInstance = echarts.init(chartContainer.value);
  const option = {
    title: {
      text: '读书排名',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: 30,
      right: 110,
      bottom: 30,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 30,
        fontSize: 16
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 30,
        fontSize: 16,
        formatter: '#{value}'
      },
      inverse: true,
      interval: 1,
      min: 1,
      max: names.length
    },
    series: generateSeriesList()
  };
  chartInstance.setOption(option);
};

// 生成数据系列
const names = [
  'Alice', 'Bob', 'Charlie', 'Odin', 'Thor', 'Loki', 'Sif', 'Nidhogg', 'Mimir'
];
const years = ['2020', '2021', '2022', '2023', '2024'];

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex = 0;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const generateRankingData = () => {
  const map = new Map();
  const defaultRanking = Array.from({ length: names.length }, (_, i) => i + 1);
  for (const _ of years) {
    const shuffleArray = shuffle(defaultRanking);
    names.forEach((name, i) => {
      map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
    });
  }
  return map;
};

const generateSeriesList = () => {
  const seriesList = [];
  const rankingMap = generateRankingData();
  rankingMap.forEach((data, name) => {
    const series = {
      name,
      symbolSize: 20,
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      endLabel: {
        show: true,
        formatter: '{a}',
        distance: 20
      },
      lineStyle: {
        width: 4
      },
      data
    };
    seriesList.push(series);
  });
  return seriesList;
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
  height: 45%;
  margin-top: 40px;
  background-color: rgba(183, 216, 245, 0.486);
}
</style>
