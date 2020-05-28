/*
  1. SVG
  2. Data
    cx, cy, r
**/
const width = window.innerWidth
const height = window.innerHeight
const svg = d3.select('body')
  .attr('margin', 0)
  .append('svg')
  .style('width', width)
  .style('height', height)
  // .style('background-color', '#011D38')

const data = Array(3000).fill().map(_ => {
  return {
    cx: Math.round(Math.random() * width),
    cy: Math.round(Math.random() * height)
  }
})

const colorScale = d3.scaleOrdinal(d3.schemePastel1)
const circle = svg.selectAll('circle')
  .data(data).enter()
  .append('circle')
  .attr('cx', d => d.cx)
  .attr('cy', -10)
  .style('stroke', 'black')

circle.on('click', function (d, i) {
  d3.select(this)
    .transition().duration(250)
    .style('fill', 'red')
})

circle.transition().duration(1000).delay((d, i) => i).ease(d3.easeLinear)
  .attr('cy', d => d.cy)
  .attr('r', (d, i) => {
    return i % 2 === 0 ? 10 : 5
  })
  .style('stroke', (d, i) => colorScale(i))
  .style('stroke-width', 5)
  .style('fill', 'none')
