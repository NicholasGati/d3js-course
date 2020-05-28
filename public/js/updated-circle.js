const margin = { top: 50, right: 50, bottom: 50, left: 50 }
const width = window.innerWidth - margin.left - margin.right
const height = window.innerHeight - margin.top - margin.bottom
const svg = d3.select('body')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.bottom})`)


const update = data => {
  const circle = svg.selectAll('.circle').data(data)
  circle.enter().append('circle')
    .merge(circle)
    .attr('class', 'circle')
    .attr('cy', (height + margin.top + margin.bottom) / 2)
    .attr('cx', (d, i) => (i + 1) * 350)
    .transition().duration(300)
    .attr('r', d => d)
    .style('fill', '#FFF')
    .style('stroke', '#CCC')
    .style('stroke-width', 1)

  circle.exit().remove()
}

d3.interval(() =>{
  update([
    d3.randomUniform(2, 300)(),
    d3.randomUniform(2, 300)(),
    d3.randomUniform(2, 300)()
  ])
}, 600)
