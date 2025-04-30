import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

charts(FusionCharts);
FusionTheme(FusionCharts);

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
    lineColor: "#FF5733",
  }));

  const dataSource = {
    chart: {
      caption: "Cost Breakdown by Usage Type",
      subcaption: "Top Usage Costs",
      xaxisname: labelKey,
      yaxisname: valueKey,
      theme: "fusion",
      drawcrossline: "1",
      showvalues: "1",
      showhovereffect: "1",
    },
    categories: categories,
    dataset: dataset,
  };

  return (
    <ReactFusioncharts
      type={chartType}
      width="44%"
      height="555"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default FusionChart;
