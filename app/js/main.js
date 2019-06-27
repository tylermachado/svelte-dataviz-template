var margin = {top:20, right:20, bottom:20, left:20},
    width = 700,
    height = 400;

var colors = {
    bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
    pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf"],
    procon: ["#ce0201", "#a5d65a"],
    political: ["#D41B2C", "#006EB5"]
}

var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.scrollmagicControls = function(options) {
      return this.each(function() {
          var scrollmagicControls = Object.create(Neu.scrollmagicControls);
          scrollmagicControls.init(this, options);
      });
  };

  $.fn.scrollmagicControls.options = {
      pinned: ".pinned-content"
  };

  Neu.scrollmagicControls = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.scrollmagicControls.options, options);
          self.bindElements();
          self.bindEvents();

          $(document).ready( function() {
              self.triggerScrollMagic();
          });
      },
      bindElements: function() {
        var self = this;

        self.$pinned = self.$container.find(self.options.pinned);
        self.controller = new ScrollMagic.Controller({addIndicators: true});
    },
    bindEvents: function() {
      var self = this;
    },
    triggerScrollMagic: function() {
      var self = this;
      
      //if you want the same function to run for multiple slides you can use the function below. The for function goes through all slides with the class name "pinned-content" and adds a pinned scrollmagic slide for each.
      for (var i=0; i<self.$pinned.length; i++) {
  			var slide = self.$pinned[i];
        var duration;
      
        duration = $(slide).height();
      
  			new ScrollMagic.Scene({
					triggerElement: slide,
					duration: duration,
					triggerHook: 0,
					reverse: true
				})
				.setPin(slide)
        .on("enter leave", function(e) {
          //if you want something to happen on enter and/or leave, you can add it below. If it should only happen on enter then remove "leave" above.
      
          //the trigger is ".pinned-content"
          var trigger = this.triggerElement();
          var triggerClass = $(trigger).attr("class");
      
          if (e.type === "leave") {
            console.log("left slide: " + triggerClass);
          } else {
            console.log("entered slide: " + triggerClass);
          }
        })
				.addTo(self.controller);
  		}
      
      //if you want a function to only run for a specific slide, you can use the function below.
      var customScene = new ScrollMagic.Scene({
        triggerElement: "#customScene",
        duration: 1000,
        reverse: true
      })
      .setClassToggle("#customScene", "custom-active")
      .on("enter", function() {
        $(".box").animate({
          height: "300px",
          width: "400"
        });
      })
      .on("leave", function() {
        $(".box").animate({
          height: "150px",
          width: "200"
        });
      })
      .addTo(self.controller);
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".wrapper").scrollmagicControls();
  });
})();

var width = document.getElementById('vis').parentElement.offsetWidth;
var linear = vega.scale('linear');
var fontscale = linear().domain([300, 1000]).range([16, 22]);
var heightscale = linear().domain([300, 1000]).range([60, 120]);

var chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.0.json',
    width: width / 2,
    height: 400,
    title: 'Chart Title Goes Here',
    description: 'A simple bar chart with embedded data.',
    data: {url: '/interactive/2018/10/bubble/data/aggregated.json'},
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
        color: {
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
            labelFont: 'Akkurat',
            labelFontSize: 14,
            titleFont: 'Akkurat',
            titleFontSize: 18,
            titlePadding: 20
        },
        title: {
            font: 'Akkurat',
            fontSize: fontscale(width),
            fontWeight: 700,
            anchor: 'middle'
        },
        view: {stroke: 'transparent'}

    }
};
vegaEmbed('#vis', chartSpec, {actions:false, renderer:'svg'});
