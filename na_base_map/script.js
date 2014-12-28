var width = 1160,
	height = 900;
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("na.json", function(error, na) {
	if (error) { return console.error(error); }
	// Displaying the polygons
	var subunits = topojson.feature(na, na.objects.subunits);
	var projection = d3.geo.albers()
		.center([0, -100])
		.rotate([120, 0])
		.parallels([50,60])
		.scale(800)
		.translate([width/1.9, height*1.85]);
	var path = d3.geo.path()
		.projection(projection)
		.pointRadius(function(d) { return 2; });
	svg.append("path")
		.datum(subunits)
		.attr("d", path);

	// Styling polygons
	svg.selectAll(".subunit")
		.data(topojson.feature(na, na.objects.subunits).features)
		.enter().append("path")
		.attr("class", function(d) { return "subunit " + d.id; })
		.attr("d", path);

	// Boundaries
	svg.append("path")
		.datum(topojson.mesh(na, na.objects.subunits, function(a,b) { return a !== b; }))
		.attr("d", path)
		.attr("class", "subunit-boundary");

	// Displaying places
	svg.append("path")
		.datum(topojson.feature(na, na.objects.places))
		.attr("d", path)
		.attr("class", "place");
	svg.selectAll(".place-label")
		.data(topojson.feature(na, na.objects.places).features)
		.enter().append("text")
		.attr("class", "place-label")
		.attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
		.attr("dy", "0.3em")
		.text(function(d) { return d.properties.name; });
	svg.selectAll(".place-label")
		.attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
		.style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

	// Country labels
	svg.selectAll(".subunit-label")
		.data(topojson.feature(na, na.objects.subunits).features)
		.enter().append("text")
		.attr("class", function(d) { return "subunit-label " + d.id; })
	    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(function(d) { return d.properties.name; });
});