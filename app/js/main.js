// The svg
var margin = {top:20, right:20, bottom:20, left:20},
    width = 700,
    height = 400;

// var colorsGeneral = ["#d51e2d", "#05aec0", "#6f2b6e", "#71bd69", "#1c35b7", "#b3e61c"];
var colors = {
    bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
    pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf"],
    procon: ["#ce0201", "#a5d65a"],
    political: ["#D41B2C", "#006EB5"]
}

var width = document.getElementById("vis").parentElement.offsetWidth;
var linear = vega.scale('linear');
var fontscale = linear().domain([300, 1000]).range([16, 22]);
var heightscale = linear().domain([300, 1000]).range([60, 120]);

var chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.0.json',
    width: width / 2,
    height: heightscale(width),
    title: 'Chart Title Goes Here',
    description: 'A simple bar chart with embedded data.',
    data: {url: "/interactive/2018/10/bubble/data/aggregated.json"},
    mark: 'bar',
    encoding: {
        x: {
            field: 'candidate',
            type: 'ordinal'
        },
        y: {
            field: 'polarity',
            type: 'quantitative'
        },
        "color": {
            field: 'candidate',
            type: 'ordinal',
            legend: false,
            scale: {
              range: colors.bold
            }
        }
    },
    config: {
        axis: {
            labelFont: "Akkurat",
            labelFontSize: 14,
            titleFont: "Akkurat",
            titleFontSize: 18,
            titlePadding: 20
        },
        title: {
            font: "Akkurat",
            fontSize: fontscale(width),
            fontWeight: 700,
            anchor: "middle"
        },
        view: {stroke: "transparent"}

    }
};
vegaEmbed('#vis', chartSpec, {actions:false, renderer:'svg'});
