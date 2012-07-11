// Script to generate Error Reports
//(via mail.cgi) for broken links
// 01 May 2012
// hessling.michael@epa.gov
var epa404 = {
  createInput : function(val,name) {
    var el = document.createElement('input');
    el.value = val;
    el.type = 'hidden';
    el.name = name;
    var thisform = document.getElementById('broken-link');
    thisform.appendChild(el);
  },
  setUpForm : function() {
    var el1 = epa404.createInput(encodeURIComponent(window.location),'missing_file');
    if (document.referrer !="") {
      if (document.referrer.indexOf("epa.gov") !=-1) {
        var el2 = epa404.createInput('EPAFILES: Broken Link from within EPA','Subject');
      } else {
        var el2 = epa404.createInput('EPAFILES: Broken Link from outside EPA','Subject');
      }
      var el3 = epa404.createInput(encodeURIComponent(document.referrer),'referring_page');
    } else {
      var el4 = epa404.createInput('No referring page, so may have been mistyped','referring_page');
      var el5 = epa404.createInput('EPAFILES: Possible Missing Page','Subject');
    }
  }
}; // END epa404

function addEvent( obj, type, fn ) {
  if (document.getElementById && document.createTextNode) {
    if (obj.addEventListener) { obj.addEventListener( type, fn, false ); }
    else if (obj.attachEvent) {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function() { obj['e'+type+fn]( window.event ); }
      obj.attachEvent( 'on'+type, obj[type+fn] );
    }
  }
}
addEvent(window, 'load', epa404.setUpForm);