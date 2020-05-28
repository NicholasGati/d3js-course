const data = [12, 6, 15, 4, 28, 5, 14, 4, 7, 5]
const div = d3.select('body')
const width = window.innerWidth
const height = window.innerHeight
const radius = (Math.min(height, width) / 2) * 0.9
const colorScale = d3.scaleOrdinal(d3.schemeSet3)
const svg = div.append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const pie = d3.pie().value(d => d).sort(null)

const zeroArc = d3.arc()
  .innerRadius(0)
  .outerRadius(1)
  .cornerRadius(1)

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
  .cornerRadius(radius)

const hoverArc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius + 30)
  .cornerRadius(radius + 30)

const labelArc = d3.arc()
  .innerRadius(radius / 1.4)
  .outerRadius(radius)

const g = svg.selectAll('.arc')
  .data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

g.append('path')
  .attr('d', zeroArc)
  .attr('class', 'arc')
  .style('fill', (d, i) => colorScale(i))
  .style('fill-opacity', 0.7)
  .style('stroke-width', 5)
  .style('stroke', '#0E0B16')
  .on('mouseover', function (d, i) {
    d3.select(this)
      .style('fill-opacity', 1)
      .transition().duration(500)
      .attr('d', hoverArc)
  })
  .on('mouseout', function (d, i) {
    d3.select(this)
      .style('fill-opacity', 0.7)
      .transition().duration(500)
      .attr('d', arc)
  })
  .transition().duration(1000).delay((d, i) => i * 300)
  .attr('d', arc)

const text = g.append('text')
  .attr('transform', d => `translate(${labelArc.centroid(d)})`)
  .text(d => `${d.data}%`)
  .style('font-size', 24)
  .style('font-family', 'cursive')
  .style('fill', '#FFF')
  .style('fill-opacity', 0)
  .style('text-shadow', '2px 2px #0E0B16')
  .style('text-anchor', 'middle')
  .transition().duration(3000).delay((d, i) => i * 300)
  .style('fill-opacity', 1)
