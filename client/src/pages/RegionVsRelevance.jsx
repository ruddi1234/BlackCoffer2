import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import * as d3 from "d3";

const RegionVsRelevance = () => {
  const { data, error, isLoading } = useQuery(
    "RegionVsRelevance",
    fetchRegionVsRelevance
  );

  const chartRef = useRef(null); // Ref to hold the chart container

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (data) => {
    const width = 800;
    const height = 600;
    const radius = Math.min(width, height) / 2 - 10;

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.region))
      .range(d3.quantize(d3.interpolateRainbow, data.length));

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pie = d3
      .pie()
      .value((d) => d.relevance)
      .sort(null);

    const svg = d3.select(chartRef.current).selectAll("svg");

    const g = svg
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d) => color(d.data.region))
      .attr("d", arc);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.region);

    g.append("text")
      .attr("x", 0)
      .attr("y", -height / 2 + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Region vs Relevance (Pie Chart)");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div ref={chartRef}></div>;
};

async function fetchRegionVsRelevance() {
  const response = await fetch("http://localhost:3001/regionvsrelevance");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default RegionVsRelevance;
