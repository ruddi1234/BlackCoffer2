import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as d3 from "d3";

const fetchCheck = async () => {
  const response = await fetch("http://localhost:3001/intensityvslikelihood");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const IntensityVsLikelihood = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["intensityvsrelation"],
    queryFn: fetchCheck,
  });
  const svgRef = useRef();

  useEffect(() => {
    if (data) {
      // Define the dimensions and margins of the chart
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Remove the old chart if it exists
      d3.select(svgRef.current).selectAll("*").remove();

      // Append the svg object to the body of the page
      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.likelihood)])
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add dots
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.likelihood))
        .attr("cy", (d) => y(d.intensity))
        .attr("r", 5)
        .style("fill", "#69b3a2");
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Intensity Vs Likelihood</h1>
      <div id="chart" ref={svgRef}></div>
    </div>
  );
};

export default IntensityVsLikelihood;
