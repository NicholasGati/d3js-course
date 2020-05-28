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

function arcTween (a) {
  const i = d3.interpolate(this._current, a)
  this._current = i(1)
  return t => arc(i(t))
}

const update = data => {
  const path = svg.selectAll('path').data(pie(data))
  path.transition().duration(200).attrTween('d', arcTween)

  path.enter().append('path')
    .attr('d', arc)
    .each(function (d) {
      this._current = d
    })
    .style('stroke', '#11141C')
    .style('stroke-width', 4)
    .style('fill', (d, i) => colorScale(i))
}

const data = [
  [35, 15, 15, 35],
  [15, 15, 35, 35],
  [35, 35, 15, 15],
  [35, 15, 35, 15],
  [45, 15, 25, 15],
  [5, 25, 35, 35]
]

let i = 0
d3.interval(() => {
  update(data[i])
  i = (i === data.length - 1) ? 0 : (i + 1)
}, 1500)
