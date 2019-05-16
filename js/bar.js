        
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

	var x = d3.scaleOrdinal().rangeRoundBands([0, width], .05);

	var y = d3.scaleLinear().range([height, 0]);
        
	var xAxis = d3.svg.axis()
    	    .scale(x)
            .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);

	var svg = d3.select("#bar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTrNACrsMYkOo7cPMCLhGZqUKc4Dd9J663BU4i8Ml5aKlfaI2w64fFboGR_uQCAFmoUO0qNY7u2K0jj/pub?gid=2025866169&single=true&output=csv", function(error, data) {
            data.forEach(function(d) {
		d.Timestamp = +d.Timestamp;
		d.FirstName = d.FirstName;
	    });
	
	x.domain(data.map(function(d) { return d.FirstName; }));
  	y.domain([0, d3.max(data, function(d) { return d.Timestamp; })]);
		
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

	
	
