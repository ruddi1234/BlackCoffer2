import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as d3 from "d3";

const RelevanceVsYear = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: "relevanceVsYear",
    queryFn: fetchRelevanceVsYear,
  });

  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (data) => {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.start_year.toString()))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.relevance)])
      .nice()
      .range([innerHeight, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.start_year.toString()))
      .attr("y", (d) => yScale(d.relevance))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.relevance))
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        setTooltipContent(`Year: ${d.start_year}, Relevance: ${d.relevance}`);
        const tooltip = document.getElementById("tooltip");
        tooltip.style.visibility = "visible";
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;
      })
      .on("mouseout", () => {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.visibility = "hidden";
      });

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr(
        "x",
        (d) => xScale(d.start_year.toString()) + xScale.bandwidth() / 2
      )
      .attr("y", (d) => yScale(d.relevance) - 10)
      .attr("text-anchor", "middle")
      .text((d) => d.relevance)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "white");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Relevance vs Year (Bar Chart)</h1>
      <div id="chart"></div>
      {/* Tooltip */}
      <div
        id="tooltip"
        style={{
          position: "absolute",
          visibility: "hidden",
          zIndex: 10,
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

async function fetchRelevanceVsYear() {
  const response = await fetch("http://localhost:3001/relevancevsyear");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default RelevanceVsYear;
