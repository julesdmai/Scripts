function drawSimpleBarChart(data) {
  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.Name))
    .range([0, width])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d["Height_(cm)"])])
    .range([height, 0]);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.Name))
    .attr("y", (d) => y(d["Height_(cm)"]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d["Height_(cm)"]))
    .attr("fill", "steelblue");
}
