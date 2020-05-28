/*
  1. SVG
  2. data
  3. line generator
*/

const width = window.innerWidth
const height = window.innerHeight

const svg = d3.select('body')
  .attr('margin', 0)
  .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#011D38')

const coordinates = [
  { x: width / 4, y: height / 2 },
  { x: (width / 4) * 3, y: height / 2 }
]

const line = d3.line()
               .x(d => d.x)
               .y(d => d.y)

const path = svg.append('path')
  .datum(coordinates)
  .style('fill', 'none')
  .style('stroke', '#FFF')
  .style('stroke-width', 13)
  .attr('d', line)
