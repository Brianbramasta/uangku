import React from 'react';
import ReactApexChart from 'react-apexcharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function ExpensePieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-gray-500">No expense data available</p>
      </div>
    );
  }

  const series = data.map(item => item.amount);
  const labels = data.map(item => item.category);

  const options = {
    chart: {
      type: 'donut',
    },
    colors: COLORS,
    labels: labels,
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%"
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `Rp${value.toLocaleString('id-ID')}`;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="h-[300px] w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="100%"
      />
    </div>
  );
}
