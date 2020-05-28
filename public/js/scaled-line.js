/*
  data
  line generator
  x and y scale
*/

const div = d3.select('body')
const margin = { top: 200, right: 200, bottom: 200, left: 200 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom
const svg = div.append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const data = Array(25).fill().map(() => d3.randomUniform(1)())
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
  .curve(d3[curves[1]])

svg.append('path')
  .datum(data)
  .style('stroke', '#ffab00')
  .style('stroke-width', 2)
  .style('fill', 'none')
  .attr('d', line)
