d3.csv('/data/timeScaleData.csv').then(data => {
  const div = d3.select('body')
  const margin = { top: 200, right: 200, bottom: 200, left: 200 }
  const width = window.innerWidth - margin.right - margin.left
  const height = window.innerHeight - margin.top - margin.bottom
  const parseDate = d3.timeParse('%Y-%m-%d')
  const formattedData = data.map(d => {
    return { date: parseDate(d.date), value: +d.value }
  })

const svg = div.append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const xScale = d3.scaleTime()
  .domain(d3.extent(formattedData.map(d => d.date)))
  .range([0, width])

const yScale = d3.scaleLinear()
  .domain([0, d3.max(formattedData.map(d => d.value))])
  .range([height, 0])

const xAxis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

const yAxis = svg.append('g')
  .attr('class', 'y axis')
  .call(d3.axisLeft(yScale))
  .append('text')
  .attr('x', 0)
  .attr('y', -25)
  .text('Orders')

const title = svg.append('text')
  .attr('class', 'title')
  .attr('x', width/2)
  .attr('y', -25)
  .text('Orders in 2019')

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.value))
  .curve(d3.curveCardinal)

svg.append('path')
  .datum(formattedData)
  .attr('class', 'line')
  .attr('d', line)
  .style('stroke', '#0D5D8B')
  .style('fill', 'none')
  .style('stroke-width', 2)

const circle = svg.selectAll('.circle')
  .data(formattedData)
  .enter().append('circle')
  .attr('class', 'circle')
  .attr('cx', d => xScale(d.date))
  .attr('cy', d => yScale(d.value))
  .attr('r', 10)
  .style('stroke', '#011D38')
  .style('stroke-width', 3)
  .style('fill', '#0D5D8B')

})
