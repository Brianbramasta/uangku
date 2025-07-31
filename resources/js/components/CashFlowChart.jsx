import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function CashFlowChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-gray-500">No cash flow data available</p>
      </div>
    );
  }

  const options = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#4ade80', '#f87171'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => item.month),
    },
    yaxis: {
      title: {
        text: 'Amount (Rp)'
      },
      labels: {
        formatter: function (value) {
          return `Rp${(value / 1000000).toFixed(1)}M`;
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return `Rp${value.toLocaleString('id-ID')}`;
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    }
  };

  const series = [
    {
      name: 'Income',
      data: data.map(item => item.income)
    },
    {
      name: 'Expense',
      data: data.map(item => item.expense)
    }
  ];

  return (
    <div className="h-[300px] w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
}
