# svelte app - Northeastern dataviz

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

## Projects

Here are some of what we've made with this code:
- [Bill Coen's career as Northeastern men's basketball coach](https://news.northeastern.edu/2021/03/17/bill-coens-long-journey-to-the-top-of-northeastern-basketball/) (waffle chart)
- [Even among healthcare workers, inequities exist in COVID-19 vaccine rollout, new study finds](https://news.northeastern.edu/2021/02/23/even-among-healthcare-workers-inequities-exist-in-covid-19-vaccine-rollout-new-study-finds/) (bar charts)
- [Trump rallies and social justice protests may have driven a big year for gun sales, study says](https://news.northeastern.edu/2021/01/28/trump-rallies-and-social-justice-protests-may-have-driven-a-big-year-for-gun-sales-study-says/) (bar charts)
- [The recovery of the US economy after the COVID-19 pandemic hinges on federal support](https://news.northeastern.edu/2020/12/18/the-recovery-of-the-us-economy-after-the-covid-19-pandemic-hinges-on-federal-support/) (line chart, bar charts, dropdown filter)
- [Many Republicans don’t believe the election results, a new survey says](https://news.northeastern.edu/2020/12/11/who-won-the-2020-presidential-election-joe-biden-or-donald-trump-depends-whom-you-ask/) (lollipops, US state chloropleth)
- [Wearing masks is on the rise across the US but social distancing measures aren’t](https://news.northeastern.edu/2020/12/01/wearing-masks-is-on-the-rise-across-the-us-but-social-distancing-measures-arent/) (line chart, US state chloropleth, small multiples)
- [Here’s how voters rank COVID-19 and other issues facing the US ahead of Election Day](https://news.northeastern.edu/2020/11/02/heres-how-voters-rank-covid-19-and-other-issues-facing-the-us-ahead-of-election-day/#interactive) (US state chloropleth, bar chart, dropdown filter)
- [Fewer people are using public transportation in the US. Here’s why that’s trouble in the long run.](https://news.northeastern.edu/2020/08/13/fewer-people-are-using-public-transportation-in-the-us-heres-why-thats-trouble-in-the-long-run/) (line charts, small multiples)
- [There’s been a 23,000 percent jump in fireworks complaints in some parts of the US this summer. You read that right.](https://news.northeastern.edu/2020/07/01/theres-been-a-23000-percent-jump-in-fireworks-complaints-in-some-parts-of-the-us-this-summer-you-read-that-right/) (lollipops, whimsy)
- [Apple Maps data shows how COVID-19 brought the world to a standstill](https://news.northeastern.edu/2020/04/29/apple-maps-data-shows-how-covid-19-brought-the-world-to-a-standstill/) (line chart, various filter options)
- [Can gun violence be traced back to socioeconomic root causes?](https://news.northeastern.edu/2020/01/06/can-gun-violence-be-traced-back-to-socioeconomic-root-causes/) (US county chloropleth)

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to our site

1. Run the `build` command as seen above.

2. Upload the contents of the /public/ folder to Cyberduck.

3. Open the `index.html` file of that folder in a text editor.

4. In WordPress, copy the CSS and JavaScript files present in that `index.html` file to the "External Resources" section of the WordPress editor. Whatever `<div>`s you're targeting with your app, make sure those are also present in the WordPress editor, too.

## Chart types

### BarChart

Can be used to create bar charts either vertically or horizontally.

- data: pass the dataset.
- width: chart width.
- height: chart height.
- xVar: the dependent variable's key in the dataset, typically the categories or dates whose data you're visualizing. This would be the x-axis variable on a chart with vertical bars, however the chart will flip itself if it's set to be horizontal, so always imagine your xVar as if it's a vertical bar chart regardless.
- yVar: the independent variable or variables. Similar to above, this is on the y-axis on the default vertical bar chart, but will be on the x-axis in a horizontal orientation (so don't mind that!). Please note you can pass a string or an array of strings that are keys in the dataset. If it's an array, you'll get a grouped bar chart automatically returned.
- yDomain: the range of the independent variable. Defaults to 0-100.
- colorscheme: which array of color codes you'd like to use. Pass a custom array of hex codes if you'd like, or pick one of the ones established in the colors file in /helpers/. Defaults to `vibrant`.
- orientation: whether to display the bar chart using `vertical` bars (that's default) or `horizontal` bars. Pass either one of those strings, or a function if you'd like to figure out the best orientation dynamically, see the getorientation function.

### DotPlot

- data: pass the dataset.
- width: chart width.
- height: chart height.
- datapoints: the key from the dataset that represents the dots along lines that you'd like to see.
- category: the key from the dataset that will be each row in the chart.
- radius: size of the dots; defaults to 12.


### LineChart

- data: pass the dataset.
- width: chart width.
- height: chart height.
- xVar: the dependent variable's key in the dataset, typically the dates whose data you're visualizing.
- yGroups: the key of the variable you want to show as a line on the chart. If you pass an array of strings, you'll get a multi-line chart in return.
- yDomain: the range of the independent variable. Defaults to 0-100.
- colorscheme: which array of color codes you'd like to use. Pass a custom array of hex codes if you'd like, or pick one of the ones established in the colors file in /helpers/. Defaults to `vibrant`.


### LollipopChart

- data: pass the dataset.
- width: chart width.
- height: chart height.
- xVar: the dependent variable's key in the dataset, typically the categories or dates whose data you're visualizing.
- yVar: the independent variable or variables.
- yDomain: the range of the independent variable. Defaults to 0-100.
- colorscheme: which array of color codes you'd like to use. Pass a custom array of hex codes if you'd like, or pick one of the ones established in the colors file in /helpers/. Defaults to `vibrant`.


### Mapbox

tk


### MapUSA

This generates a chloropleth style map of the US, using D3. The GeoJSON files it uses to generate the state border paths are in the /helpers/ folder.

- data: pass the dataset.
- width: chart width.
- height: chart height. For this chart type, it defaults to half the width, which makes for a nice aspect ratio for USA maps.
- maptype: A string, one of `"geo"` or `"hex"`, defaulting to the former. This lets you display the states either in their usual geographic shape and layout, or a hexagonal cartogram layout where each state takes up an equal amount of space.
- colorscheme: which array of color codes you'd like to use. Pass a custom array of hex codes if you'd like, or pick one of the ones established in the colors file in /helpers/. Defaults to `pastels`.
- variable: the key from the dataset you'd like to visualize through colors on the map.


### Scatter

- data: pass the dataset.
- width: chart width.
- height: chart height.
- xVar: the dependent variable's key in the dataset, typically the categories or dates whose data you're visualizing.
- yVar: the independent variable or variables.




### WaffleChart




## "Helpers" folder

- colors.js: several arrays of hex codes that can be used as color scales.

- join.js: a function that can be imported to join two different dataset files together, as long as the items have a key value in common.

- USAGeoAlbers.js: a GeoJSON file for a USA state map

- USStateHexbin.js: a GeoJSON file to make a hexagon cartogram map of US States

- USStates.js: a list of US states and their common two-letter abbreviations.

- wrapLabel.js: a function to wrap long axis labels in D3 charts to multiple lines, similar to (this pattern)[https://bl.ocks.org/mbostock/7555321].
