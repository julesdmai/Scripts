import * as d3 from 'd3';

// Function to create the D3 bar chart
function drawBarChart(data) {
  const svg = d3.select('svg'); // Select the SVG container from the HTML DOM using D3
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand() // Create the "x" scale (band scale) - scaleBand() is used for categorical data (like names)
    .domain(data.map(d => d.Name)) // Defines input values (all the names)
    .range([0, innerWidth]) // Maps input domain to pixel values
    .padding(0.1); // Adds padding between bars

  const y = d3.scaleLinear() // Create the "y" scale (linear scale)
    .domain([0, d3.max(data, d => d['Height_(cm)'])])
    .nice()
    .range([innerHeight, 0]);// Note range goes from innerHeight -> to 0 because SVG Y-coordinates increase downward

  g.append('g')
    .call(d3.axisLeft(y)); // Adds the y-axis to the left using the "y" scale

  g.append('g')
    .call(d3.axisBottom(x)) // Adds the x-axis to the bottom using the "x" scale
    .attr('transform', `translate(0,${innerHeight})`); // Renders the x-axis at the bottom of the SVG

  g.selectAll('.bar') // Data binding and rectangle creation
    .data(data) // Binds your data to "SVG" rect elements
    .enter().append('rect') // .enter() creates a placeholder for each new data item, .append(...) draws a rectangle for each data item
    .attr('class', 'bar')
    .attr('x', d => x(d.Name)) // x(...) positions the bar horizontally
    .attr('y', d => y(d['Height_(cm)'])) // y(...) gives the top position of the bar
    .attr('width', x.bandwidth()) // x.bandwidth() sets each bar's width
    .attr('height', d => innerHeight - y(d['Height_(cm)'])); // height = innerHeight - y(...) makes the bar grow downward to the x-axis (baseline)
}

// Load data from CSV using d3's built-in method
d3.csv('../assets/test.csv').then(data => {
  data.forEach(d => {
    d['Height_(cm)'] = +d['Height_(cm)'];
  });

  // Render chart
  drawBarChart(data);
});

console.log('Finished executing drawBarChart');