// LineChart_3Lines.js
import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const LineChart_3Lines = ({ labels, line1, line2, line3 }) => {
  const data = {
    labels,
    datasets: [
      // {
      //   label: 'Thời gian lỗi(Giờ)',
      //   data: line1,
      //   borderColor: 'rgba(255, 99, 132, 1)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //   tension: 0.4,
      //   fill: false,
      //   pointRadius: 3,
      //   pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      // },
      {
        label: 'Thời gian dừng (Giờ)',
        data: line2,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Thời gian chạy (Giờ)',
        data: line3,
        borderColor: 'rgba(255, 99, 132, 1)',         // Đỏ đậm (viền line)
        backgroundColor: 'rgba(255, 99, 132, 0.2)',   // Đỏ nhạt (legend)
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false, 
      },
      legend: { display: true, },
      title: { display: false },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        ticks: { 
          padding: 2,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Thời gian (giờ)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: { padding: 4 },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart type="line" data={data} options={options} />
    </div>
  );
};

export default LineChart_3Lines;
