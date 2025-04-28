// import React from "react";
// import FusionCharts from "fusioncharts";
// import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";

// charts(FusionCharts);

// const FusionChart = ({ tableData, chartType = "mscolumn2d" }) => {
//   if (!tableData || tableData.length === 0) return null;

//   const labelKey = Object.keys(tableData[0])[0];
//   const seriesKey = Object.keys(tableData[0])[1];
//   const valueKey = Object.keys(tableData[0])[2];

//   const categories = [
//     {
//       category: [
//         {
//           label: tableData[0][labelKey],
//         },
//       ],
//     },
//   ];

//   const dataset = tableData.map((item) => ({
//     seriesname: item[seriesKey],
//     data: [
//       {
//         value: item[valueKey],
//       },
//     ],
//     lineColor: "#FF5733",
//   }));

//   const dataSource = {
//     chart: {
//       caption: "Cost Breakdown by Usage Type",
//       subcaption: "Top Usage Costs",
//       xaxisname: labelKey,
//       yaxisname: valueKey,
//       theme: "gammel",
//       drawcrossline: "1",
//       showvalues: "1",
//     },
//     categories: categories,
//     dataset: dataset,
//   };

//   return (
//     <ReactFusioncharts
//       type={chartType} // Dynamic chart type here
// width="74%"
// height="555"
//       dataFormat="JSON"
//       dataSource={dataSource}
//     />
//   );
// };

// export default FusionChart;
import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const LineChartDisplay = ({ tableData }) => {
  if (!tableData || tableData.length === 0) return null;

  // Extract keys for dynamic chart generation
  const labelKey = Object.keys(tableData[0])[0]; // First key (e.g., month, service, etc.)
  const seriesKey = Object.keys(tableData[0])[1]; // Second key (e.g., usage type, service name)
  const valueKey = Object.keys(tableData[0])[2]; // Third key (e.g., usage amount)

  // Create categories for the x-axis (e.g., month names, service names, etc.)
  const categories = [
    {
      category: tableData.map((item) => ({
        label: item[seriesKey] || "Unknown",
      })),
    },
  ];

  // Create dataset for the line chart (series)
  const dataset = [
    {
      seriesname: "Amount (USD)", // Static name for the series
      data: tableData.map((item) => ({
        value: item[valueKey] || 0, // Fallback to 0 if no value present
      })),
    },
  ];

  // Define the data source object for FusionCharts
  const dataSource = {
    chart: {
      caption: "Service Wise Total Usage (Line Chart)", // Customizable chart title
      subcaption: "Total Usage Costs by Service", // Customizable subtitle
      xaxisname: labelKey, // Name for x-axis
      yaxisname: "Total Cost (USD)", // y-axis label
      theme: "fusion", // Chart theme
      drawAnchors: "1", // Show anchors on the line
      anchorRadius: "4", // Size of the anchor points
      lineThickness: "2", // Line thickness
      animation: "1", // Enable animation
    },
    categories: categories,
    dataset: dataset,
  };

  return (
    <ReactFusioncharts
      type="msline" // Line chart type
      width="74%"
      height="555" // Height of the chart
      dataFormat="JSON"
      dataSource={dataSource} // Pass the data source
    />
  );
};

export default LineChartDisplay;
