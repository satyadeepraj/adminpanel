import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data }) => {
    const totalFindings = data.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF0000', '#FFD700', '#FFEB3B', '#4CAF50'],
        hoverBackgroundColor: ['#FF0000', '#FFD700', '#FFEB3B', '#4CAF50'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const percentage = ((value / totalFindings) * 100).toFixed(1);
          return percentage === "0.0" ? null : `${percentage}%`;
        },
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PieChart;
