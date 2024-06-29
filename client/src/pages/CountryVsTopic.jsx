import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import * as d3 from "d3";

const fetchCountryVsTopic = async () => {
  const response = await fetch("http://localhost:3001/countryvstopic");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const CountryVsTopic = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["countryvstopic"],
    queryFn: fetchCountryVsTopic,
  });
  const svgRef = useRef();

  useEffect(() => {
    if (data) {
      // Transform data to count occurrences of topics per country
      const aggregatedData = d3.rollup(
        data,
        (v) => v.length,
        (d) => d.country,
        (d) => d.topic
      );

      const countries = Array.from(aggregatedData.keys());
      const topics = Array.from(new Set(data.map((d) => d.topic)));

      const formattedData = [];
      aggregatedData.forEach((topicsMap, country) => {
        const countryData = {
          country,
          topics: [],
        };
        topics.forEach((topic) => {
          countryData.topics.push({
            topic,
            count: topicsMap.get(topic) || 0,
          });
        });
        formattedData.push(countryData);
      });

      // Define dimensions and margin
      const margin = { top: 20, right: 30, bottom: 20, left: 30 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Remove the old chart if it exists
      d3.select(svgRef.current).selectAll("*").remove();

      // Append the svg object to the body of the page
      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Color scale
      const color = d3.scaleOrdinal().domain(topics).range(d3.schemeSet2);

      // Compute the position of each group on the pie:
      const pie = d3
        .pie()
        .value((d) => d.count)
        .sort(null);

      // Build the pie chart
      const arcs = svg
        .selectAll("pieces")
        .data(pie(formattedData[0].topics)) // use the first country data for the pie
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr(
          "d",
          d3
            .arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1)
        )
        .attr("fill", (d) => color(d.data.topic))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
          // Show topic on hover
          d3.select("#topic-info")
            .html(`<strong>${d.data.topic}</strong>`)
            .style("visibility", "visible")
            .style("left", width + margin.right + "px")
            .style("top", margin.top + "px")
            .style("font-family", "Arial, sans-serif")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("text-align", "right")
            .style("padding", "10px")
            .style("background-color", "#f0f0f0")
            .style("border", "1px solid #ccc")
            .style("border-radius", "5px")
            .style("box-shadow", "0 0 5px rgba(0,0,0,0.3)");
        })
        .on("mouseout", () => {
          // Hide tooltip on mouse out
          d3.select("#topic-info").style("visibility", "hidden");
        });

      // Tooltip for topic info
      const tooltip = d3
        .select("#chart")
        .append("div")
        .attr("id", "topic-info");
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Country Vs Topic (Pie Chart)</h1>
      <div id="chart" ref={svgRef}></div>
    </div>
  );
};

export default CountryVsTopic;
