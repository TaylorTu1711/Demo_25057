import React from 'react';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,    
  LineController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  ChartDataLabels,
  BarController,    
  LineController,
);

const BarChart_Error = ({ labels, dataValues }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Số lần xuất hiện',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        color: 'rgba(32, 64, 154, 1)',
        text: 'Thống kê lỗi (sắp xếp theo số lần)',
        font: { size: 16 },
      },
      zoom: {
        pan: { enabled: true, mode: 'y' },
        zoom: { wheel: { enabled: true }, mode: 'y' },
      },
      datalabels: {
        anchor: 'start',
        align: 'right',
        clip: true,

        color: '#000',
        font: {
          size: 10,
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    layout: {
      padding: 0,
      clip: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          color: 'rgba(32, 64, 154, 1)',
          text: 'Số lần xuất hiện',
          font: { size: 14, weight: 'bold' },
        },
        ticks: { padding: 4 },
      },
      y: {
        ticks: {
          display: false,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chart type="bar" data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};


export default BarChart_Error;
