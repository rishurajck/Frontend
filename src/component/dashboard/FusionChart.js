import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

charts(FusionCharts);
FusionTheme(FusionCharts);

const FusionChart = ({ tableData }) => {
  if (!tableData || tableData.length === 0) return null;

  // Take label from first item's key (item[0])
  const labelKey = Object.keys(tableData[0])[0]; // e.g., "USAGE_MONTH"
  const seriesKey = Object.keys(tableData[0])[1]; // e.g., "LINEITEM_USAGETYPE" or "PRODUCT_PRODUCTNAME"
  const valueKey = Object.keys(tableData[0])[2]; // e.g., "TOTAL_USAGE_COST"

  // Build the category label (only one column on x-axis)
  const categories = [
    {
      category: [
        {
          label: tableData[0][labelKey], // "2025-04"
        },
      ],
    },
  ];

  // Build the dataset with seriesname and values
  const dataset = tableData.map((item) => ({
    seriesname: item[seriesKey],
    data: [
      {
        value: item[valueKey],
      },
    ],
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
    },
    categories: categories,
    dataset: dataset,
  };

  return (
    <ReactFusioncharts
      type="mscolumn2d"
      width="44%"
      height="555"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default FusionChart;
