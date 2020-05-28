/*
  1. SVG
  2. Data
    - cx, cy, r
**/

const width = window.innerWidth
const height = window.innerHeight
const svg = d3.select('body')
  .attr('margin', 0)
  .append('svg')
  .style('width', width)
  .style('height', height)

const data = Array(3000).fill().map(_ => {
  return {
    cx: Math.round(Math.random() * width),
    cy: Math.round(Math.random() * height)
  }
})

const colorScale = d3.scaleOrdinal(d3.schemePastel1)

const circles1 = svg.selectAll('.circle1')
  .data(data).enter()
  .append('circle')
  .attr('class', 'circle1')
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', 3)
  .style('fill', (d,i) => colorScale(i))

const circles2 = svg.selectAll('.circle2')
  .data(data).enter()
  .append('circle')
  .attr('class', 'circle2')
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', 10)
  .style('fill', 'none')
  .style('stroke', (d,i) => colorScale(i))
  .style('stroke-width', 1)
