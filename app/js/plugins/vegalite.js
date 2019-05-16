var chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.0.json',
    description: 'A simple bar chart with embedded data.',
    data: {"url": "/interactive/2018/10/bubble/data/aggregated.json"},
    mark: 'bar',
    encoding: {
     x: {field: 'candidate', type: 'ordinal'},
     y: {field: 'polarity', type: 'quantitative'}
    }
};
vegaEmbed('#vis', chartSpec);
