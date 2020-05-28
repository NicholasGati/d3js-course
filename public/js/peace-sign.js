const data = [35, 15, 15, 35]
const div = d3.select('body')
const width = window.innerWidth
const height = window.innerHeight
const radius = Math.min(width, height) / 2
const colorScale = d3.scaleOrdinal(['#7326AB', '#2A59A9', '#E5A1D4', '#00A0B0'])
const svg = div.append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const pie = d3.pie().value(d => d).sort(null)
const arc = d3.arc().outerRadius(radius * 0.75).innerRadius(0)

const g = svg.selectAll('.arc')
  .data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

g.append('path')
  .attr('d', arc)
  .attr('class', 'arc')
  .style('fill', (d, i) => colorScale(i))
  .style('stroke', '#11141C')
  .style('stroke-width', 4)
