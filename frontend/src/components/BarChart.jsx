// BarLineChart_Diennang.js
import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
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
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,    
  LineController,
  zoomPlugin,
);

const BarLineChart_Sanluong = ({ labels, dataValues}) => {
  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Sản lượng (cái)',
        data: dataValues,
        yAxisID: 'y',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
    layout: { padding: 0 },
    scales: {
      x: {
        ticks: {
          padding: 2,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Sản lượng (cái)',
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
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default BarLineChart_Sanluong;
