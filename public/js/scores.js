d3.csv('/data/scorecard.csv').then(data => {
  const div = d3.select('body')
  const margin = { top: 200, right: 200, bottom: 200, left: 200 }
  const width = window.innerWidth - margin.right - margin.left
  const height = window.innerHeight - margin.top - margin.bottom
  const svg = div.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => +d.points))])
    .rangeRound([0, width])

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.player))
    .range([height, 0])
    .padding(0.1)

  const xAxis = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('dy', '0.7em')
      .style('text-anchor', 'middle')
      .style('fill', '#2A74BB')
      .text('Points')

  const yAxis = svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale))

  const bars = svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('y', d => yScale(d.player))
    .attr('height', yScale.bandwidth())
    .attr('width', d => xScale(+d.points))
    .style('fill', '#A39EF2')

  bars.on('mouseover', function (d, i) {
      d3.select(this)
        .transition().duration(250)
        .style('fill', '#7D77E7')
  })

  bars.on('mouseout', function (d, i) {
    d3.select(this)
      .transition().duration(250)
      .style('fill', '#A39EF2')
  })

  const text = svg.selectAll('.points')
    .data(data)
    .enter().append('text')
    .attr('class', 'points')
    .attr('x', d => xScale(d.points))
    .attr('y', d => yScale(d.player))
    .attr('dx', -20)
    .attr('dy', (yScale.bandwidth() / 2) + 5)
    .text(d => d.points)
    .style('fill', '#CAE3FA')
    .style('text-anchor', 'middle')
    .style('font-family', 'verdana')

  const title = svg.append('text')
    .attr('x', width / 2)
    .attr('y', -15)
    .style('text-anchor', 'middle')
    .style('fill', '#A39EF2')
    .style('font-family', 'verdana')
    .text('Game 1 Final Scores')

})
