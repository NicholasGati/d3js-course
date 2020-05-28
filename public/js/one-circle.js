/*
1. SVG
2. cx, cy
3. r
*/

const svg = d3.select('body')
  .attr('margin', 0)
  .append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)

const circle = svg.append('circle')
  .attr('cx', window.innerWidth / 2)
  .attr('cy', window.innerHeight / 2)
  .attr('r', 100)
  .style('fill', 'red')
  .style('stroke', 'purple')
  .style('stroke-width', 10)

circle.on('click', function (d, i) {
  d3.select(this)
  .transition().duration(1000)
  .attr('r', 50)
})

circle.on('mouseover', function (d, i) {
  d3.select(this)
    .transition().duration(250)
    .style('fill', 'green')
})

circle.on('mouseout', function (d, i) {
  d3.select(this)
    .transition().duration(250)
    .style('fill', 'red')
})
