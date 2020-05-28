const margin = { top: 100, right: 100, bottom: 100, left: 100 }
const width = window.innerWidth - margin.left - margin.right
const height = window.innerHeight - margin.top - margin.bottom
const svg = d3.select('body').append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const stores = ['Walmart', 'Sams Club', 'Target', 'Costco', 'BJs']
const getData = () => {
  return stores.map(store => {
    return {
      store: stores[Math.floor(Math.random() * stores.length)],
      profit: Math.round(d3.randomUniform(100000000)())
    }
  })
}

const colorScale = d3.scaleOrdinal()
  .domain(stores)
  .range(['#041E42', '#0067A0', '#CC0000', '#E31836', '#CC0033'])
  
const xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1)
const yScale = d3.scaleLinear().range([height, 0])
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', 50)
    .style('text-anchor', 'middle')
    .text('Stores')

svg.append('g')
  .attr('class', 'y axis')
  .append('text')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', -20)
    .text('Profit (USD)')

const update = data => {
  xScale.domain(data.map(d => d.store))
  yScale.domain([0, d3.max(data.map(d => d.profit))])

  svg.select('.x.axis')
    .transition()
    .duration(1000)
    .call(xAxis)

  svg.select('.y.axis')
    .transition()
    .duration(1000)
    .call(yAxis)

  const bar = svg.selectAll('.bar').data(data)
  bar.enter().append('rect')
  .merge(bar)
  .attr('class', 'bar')
  .attr('x', d => xScale(d.store))
  .attr('y', d => yScale(0))
  .attr('width', xScale.bandwidth())
  .attr('height', 0)
  .transition().duration(500)
  .attr('y', d => yScale(d.profit))
  .attr('height', d => height - yScale(d.profit))
  .style('fill', d => colorScale(d.store))

  bar.exit().remove()
}

update(getData())
d3.interval(() => update(getData()), 5000)
