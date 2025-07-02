function drawSimpleBarChart(data) {
  // TODO: Add responsiveness - using viewbox and observer
  const svg = d3.select("svg");
  const width = +svg.attr("width"); // TODO: Simplify width and height
  const height = +svg.attr("height");

  // Create the x-scale scaling function
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Name))
    .range([0, width])
    .padding(0.2);

  // Create the y-scale scaling function
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d["Height_(cm)"])]) // TODO: Simplify field name
    .range([height, 0]); // SVG coordinate system

  // Bind the data and render the rectangles per data point
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect") // Render rect for each missing per data point
    .attr("x", (d) => xScale(d.Name))
    .attr("y", (d) => yScale(d["Height_(cm)"]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d["Height_(cm)"]))
    .attr("fill", "steelblue");

  // TODO: Add hover tooltip
  // TODO: Stacked bar chart
  // TODO: Modify data set for stacked bar chart
  // TODO: Animation - Regular to stacked bar chart
  // TODO (PRIORITY): Research Sankey diagram for NemoFin.io
  // TODO: Sketch irin.io
}
