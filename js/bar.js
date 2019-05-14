        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#graphic").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var xAxis = d3.svg.axis()
            .scale(x)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g");
    
        d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRTE7B0FZzGglZwflximEKoDerxoJdfVmwdXyhLY_fWEbam0nmrLFz1qZTF4UvjsTio9GjhoyY9-Cf-/pub?gid=957248393&single=true&output=csv", function(d) {
          return d3.ascending(a.value, b.value);
    
        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.age);
            })
            .attr("height", x.rangeBand())
            .attr("y", 0)
            .attr("width", function (d) {
                return y(d.timestamp);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("x", function (d) {
                return x(d.age) + x.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("y", function (d) {
                return y(d.age) + 3;
            })
            .text(function (d) {
                return d.age;
            });
          });  
