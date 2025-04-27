import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolve charts dependency
charts(FusionCharts);

const FusionChart = ({ tableData, chartType = "mscolumn2d" }) => {
  if (!tableData || tableData.length === 0) return null;

  const labelKey = Object.keys(tableData[0])[0];
  const seriesKey = Object.keys(tableData[0])[1];
  const valueKey = Object.keys(tableData[0])[2];

  const categories = [
    {
      category: [
        {
          label: tableData[0][labelKey],
        },
      ],
    },
  ];

  const dataset = tableData.map((item) => ({
    seriesname: item[seriesKey],
    data: [
      {
        value: item[valueKey],
      },
    ],
    lineColor: "#000000",
  }));

  const dataSource = {
    chart: {
      caption: "Cost Breakdown by Usage Type",
      subcaption: "Top Usage Costs",
      xaxisname: labelKey,
      yaxisname: valueKey,
      theme: "gammel",
      drawcrossline: "1",
      showvalues: "1",
    },
    categories: categories,
    dataset: dataset,
  };

  return (
    <ReactFusioncharts
      type={chartType} // Dynamic chart type here
      width="74%"
      height="555"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default FusionChart;
