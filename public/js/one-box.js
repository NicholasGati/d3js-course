/*
  1. SVG
  2. X & Y
  3. Width, Height
**/
const svg = d3.select('body')
  .attr('margin', 0)
  .append('svg')
  .style('width', window.innerWidth)
  .style('height', window.innerHeight)
  .style('background-color', '#011D38')

svg.append('rect')
  .attr('x', window.innerWidth / 2)
  .attr('y', window.innerHeight / 2)
  .attr('width', 100)
  .attr('height', 150)
  .style('fill', '#FFF')
  .style('stroke', 'yellow')
  .style('stroke-width', 5)
