    var vWidth = 300;
    var vHeight = 200;

    // Prepare our physical space
    var g = d3.select('svg').attr('width', vWidth).attr('height', vHeight)
            .select('g').attr('transform', 'translate(' + vWidth / 2 + ',' + vHeight / 2 + ')');

    // Get the data from our CSV file
    d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRTE7B0FZzGglZwflximEKoDerxoJdfVmwdXyhLY_fWEbam0nmrLFz1qZTF4UvjsTio9GjhoyY9-Cf-/pub?gid=957248393&single=true&output=csv', function(error, vCsvData) {
        if (error) throw error;

        vData = d3.stratify()(vCsvData);
        drawViz(vData);
    });

    function drawViz(vData) {
        // Declare d3 layout
        var vLayout = d3.partition().size([2 * Math.PI, Math.min(vWidth, vHeight) / 2]);

        // Layout + Data
        var vRoot = d3.hierarchy(vData).sum(function (d) { return d.count; });
        var vNodes = vRoot.descendants();
        vLayout(vRoot);
        var vArc = d3.arc()
            .startAngle(function (d) { return d.x0; })
            .endAngle(function (d) { return d.x1; })
            .innerRadius(function (d) { return d.y0; })
            .outerRadius(function (d) { return d.y1; });

        // Draw on screen
        g.selectAll('path').data(vNodes).enter().append('path').attr("d", vArc);
    }
