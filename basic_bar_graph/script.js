var width = 420,
    barHeight = 20;

var chart = d3.select(".chart")
      .attr("width", width)

var scale = d3.scale.linear()
      .range([0,width]);

d3.tsv("data.tsv", type, function(error, data) {
  scale.domain([0, d3.max(data, function(d) { return d.value; })]);
  chart.attr("height", barHeight*data.length);

  var bars = chart.selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d,i) {
            return "translate(0," + i*barHeight + ")";
          });

  bars.append("rect")
      .attr("width", function(d) { return scale(d.value); })
      .attr("height", barHeight - 1);

  bars.append("text")
      .attr("x", function(d) { return scale(d.value) - 3; })
      .attr("y", barHeight/2)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

function type(d){
  d.value = +d.value;
  return d;
}