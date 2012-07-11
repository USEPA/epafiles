//Functions for MRS homepages
(function() {
//Load Notice Script
  var s = document.getElementsByTagName('script')[0];
  var ns = document.createElement('script');
  ns.type = 'text/javascript'; ns.async;
  ns.src = 'http://www.epa.gov/epahome/notice.js';
  s.parentNode.insertBefore(ns, s);
//Load the ForeSee ACSI Survey code
  var fs = document.createElement('script');
  fs.type = 'text/javascript'; fs.async;
  fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-trigger.js';
  //fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-alive.js';
  s.parentNode.insertBefore(fs, s);
//Load the Menu
  var ms = document.createElement('script');
  ms.type = 'text/javascript'; ms.async;
  ms.src = 'http://www.epa.gov/epafiles/js/epa-menu.js';
  s.parentNode.insertBefore(ms, s);
})();
$(function(){
  //Search Autosuggest
  var sb = jQuery("#searchbox");
  if (sb[0]) {
    sb.autocomplete("/autocomplete",{minChars:2,delay:200,matchSubset:false,selectFirst:false}).result(function (event, data, formatted) {
      jQuery('#EPAsearch').submit();
    });
  }
  // Dropdown
  $('#header ul').superfish({autoArrows: false, dropShadows: false});

});