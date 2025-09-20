// PerformanceChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceChart = ({ performance }) => {
  const data = {
    labels: ['Hiệu suất', 'Phần còn lại'],
    datasets: [
      {
        data: [performance, 100 - performance],
        backgroundColor: ['#20409A', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      datalabels: {
        display: false, 
      },
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        width: '60px',
        height: '60px',
        position: 'relative',
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#20409A',
          zIndex: 2,
        }}
      >
        {performance}%
      </div>
    </div>
  );
};

export default PerformanceChart;
