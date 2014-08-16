var bardata = [];

for (var i = 0; i < 50; i++){
  bardata.push(Math.round(Math.random()*99) + 1);
}

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var tempColor;

var full = bardata.length //d3.max(bardata)
var colors = d3.scale.linear()
    .domain([0, full * .33, full * .66, full])
    .range(['#FFB832', '#C61C6F', '#268BD2', '#85992C'])

var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height])

var xScale = d3.scale.ordinal()
    .domain(d3.range(0, bardata.length))
    .rangeBands([0, width]  )

var chart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', function(d, i){
        return colors(i);
      })
      .attr('width', xScale.rangeBand())
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('height', 0)
      .attr('y', height)

    .on('mouseover', function(d) {
      tempColor = this.style.fill;
      d3.select(this)
        .style('opacity', 0.5)
        .style('fill', 'yellow')
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .style('opacity', 1)
        .style('fill', tempColor)
    })

chart.transition()
  .attr('height', function(d) {
    return yScale(d);
  })
  .attr('y', function(d) {
    return height - yScale(d);
  })
  .delay(function(d, i){
    return i * 20;
  })
  .duration(1000)
  .ease('elastic')