import * as d3 from 'd3';

// Load and parse CSV
d3.csv('../assets/test.csv').then(data => {
  // Convert string numbers to actual numbers
  data.forEach(d => {
    d['Height_(cm)'] = +d['Height_(cm)'];
  });

  drawBarChart(data);
});

function drawBarChart(data) {
  const svg = d3.select('svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.Name))
    .range([0, innerWidth])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['Height_(cm)'])])
    .nice()
    .range([innerHeight, 0]);

  g.append('g')
    .call(d3.axisLeft(y));

  g.append('g')
    .call(d3.axisBottom(x))
    .attr('transform', `translate(0,${innerHeight})`);

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.Name))
    .attr('y', d => y(d['Height_(cm)']))
    .attr('width', x.bandwidth())
    .attr('height', d => innerHeight - y(d['Height_(cm)']));
}
