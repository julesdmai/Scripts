function drawSimpleBarChart(data) {
  const svg = d3.select("svg");
  const width = +svg.attr("width"); // TODO: Simplify width and height
  const height = +svg.attr("height");

  // Create the x-scale scaling function
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.Name))
    .range([0, width])
    .padding(0.2);

  // Create the y-scale scaling function
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d["Height_(cm)"])]) // TODO: Simplify field name
    .range([height, 0]); // SVG coordinate system

  // Bind the data and render the rectangles per data point
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect") // Render rect for each missing per data point
    .attr("x", (d) => x(d.Name))
    .attr("y", (d) => y(d["Height_(cm)"]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d["Height_(cm)"]))
    .attr("fill", "steelblue");

  // TODO: Add a hover
}
