// BarChartStatus.js
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

const statusLabels = ['Stop', 'Error', 'Run'];

const BarChartStatus = ({ labels, line1}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Trạng thái',
        data: line1,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        stepped: true,
        spanGaps: false,
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
      ticks: {
        stepSize: 1,
        callback: function (value) {
          const labels = ['Stop', 'Error', 'Run'];
          return labels[value] ?? value;
        }
      },
      min: 0,
      max: 2,
    }
  }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart type="line" data={data} options={options} />
    </div>
  );
};

export default BarChartStatus;
