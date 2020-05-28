const div = d3.select('body')
const margin = { top: 200, right: 200, bottom: 200, left: 200 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const svg = div.append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', '#E5A1D4')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const data = Array(50).fill().map(() => d3.randomUniform(1)())
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
  .curve(d3[curves[11]])

const path = svg.append('path')
  .datum(data)
  .style('stroke', '#FFF')
  .style('stroke-width', 2)
  .style('fill', 'none')
  .attr('d', line)

const totalLength = path.node().getTotalLength()
path
  .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
  .attr('stroke-dashoffset', totalLength)
  .transition().duration(5000)
  .ease(d3.easeQuad)
  .attr('stroke-dashoffset', 0)
