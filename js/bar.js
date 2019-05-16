        
      // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d %X").parse; //27-May-12 16:00:00. This is used for D3JS parsing
 
    // Set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);    
    var y = d3.time.scale.utc().range([height, 0]);
  

    // Define the axes
    var xAxis = d3.svg.axis()
   	 .scale(x)
    	 .orient("bottom");

    var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left")
    	.ticks(10);

    // Adds the svg canvas
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTrNACrsMYkOo7cPMCLhGZqUKc4Dd9J663BU4i8Ml5aKlfaI2w64fFboGR_uQCAFmoUO0qNY7u2K0jj/pub?gid=2025866169&single=true&output=csv", function(error, data) {
        data.forEach(function(d) {
            d.Timestamp = parseDate(d.Timestamp);
            d.FirstName = +d.FirstName;
        });

        // Scale the range of the data
        x.domain(data.map(function(d) { return d.FirstName; }));
        y.domain([0, d3.max(data, function(d) { return d.TimeStamp; })]);
	
	// Append SVG and Bars
	 svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	      .selectAll("text")
	      .style("text-anchor", "end")
	      .attr("dx", "-.8em")
	      .attr("dy", "-.55em")
	      .attr("transform", "rotate(-90)" )
	      .text("Timestamp");

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 5)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end");

	  svg.selectAll("bar")
	      .data(data)
	      .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.FirstName); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.Timestamp); })
	      .attr("height", function(d) { return height - y(d.Timestamp); });

	});

	
	
