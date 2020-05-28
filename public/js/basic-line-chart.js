const div = d3.select('body')
const margin = { top: 200, right: 200, bottom: 200, left: 200 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom
const data = Array(11).fill().map(() => d3.randomUniform(100)())

const svg = div.append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', '#11141C')
  .append('g')
    .attr('transform', `translate(${margin.left} ${margin.bottom})`)

  const curves = [
  	'curveLinear',
    'curveBasis',
    'curveBundle',
    'curveCardinal',
    'curveCatmullRom',
    'curveMonotoneX',
    'curveMonotoneY',
    'curveNatural',
    'curveStep',
    'curveStepAfter',
    'curveStepBefore',
    'curveBasisClosed'
  ]


const xScale = d3.scaleLinear()
  .domain([0, data.length - 1])
  .range([0, width])
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0])

const line = d3.line()
  .x((d, i) => xScale(i))
  .y(d => yScale(d))
  .curve(d3[curves[5]])

const xAxis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))
const yAxis = svg.append('g')
  .attr('class', 'y axis')
  .call(d3.axisLeft(yScale))

const path = svg.append('path')
  .datum(data)
  .style('stroke', '#D073BA')
  .style('stroke-width', 2)
  .style('fill', 'none')
  .attr('d', line)

const circles = svg.selectAll('.circle')
  .data(data)
  .enter().append('circle')
  .attr('class', 'circle')
  .attr('cx', (d, i) => xScale(i))
  .attr('cy', d => yScale(d))
  .attr('r', 4)
  .style('fill', '#D073BA')
  .style('stroke', '#11141C')
  .style('stroke-width', 2)

circles.on('mouseover', function (d) {
  const circle = d3.select(this)
    .transition().duration(500)
    .attr('r', 8)
})

circles.on('mouseout', function (d) {
  const circle = d3.select(this)
    .transition().duration(500)
    .attr('r', 4)
})
