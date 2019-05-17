        // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d %X").parse; //27-May-12 16:00:00. This is used for D3JS parsing
    var formatTime = d3.time.format("%Y-%m-%d %X");// Format tooltip date / time

    // Set the ranges
    var x = d3.time.scale.utc().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.Timestamp); })
        .y(function(d) { return y(d.Age); });

    // Define 'div' for tooltips
    var div = d3.select("body")
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip")
        .style("opacity", 0);

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
            d.Timestamp = parseDate(d.Timestamp); // using moment to get proper UTC time and formatting for D3
            d.Age = +d.Age;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Timestamp; }));
        y.domain([0, d3.max(data, function(d) { return d.Age; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // draw the scatterplot
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.Timestamp); })
            .attr("cy", function(d) { return y(d.Age); })
            // Tooltip stuff after this
            .on("mouseover", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html(
                    '<a href= "'+d.link+'" target="_blank">' + //with a link
                    formatTime(d.Timestamp) +
                    "</a>" +
                    "<br/>"  + d.Age)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            });

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });   
     
