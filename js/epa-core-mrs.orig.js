// EPA's Core JS file, mrs
// Last edited: 20 Sep 2010
// Questions? hessling.michael@epa.gov
var epaCore = {
  //Date related functions
  takeYear: function(theDate) { var x = theDate.getYear(); var y = x % 100; y += (y < 38) ? 2000 : 1900; return y; },
  //Bookmarklet popup
  postPopUp: function(url, name, params) { var win = window.open(url, name, params); }
};
// Use jQuery via jQuery(...); no conflict
jQuery(document).ready(function(){
  //Load Notice Script
  var ns = document.createElement('script');
  ns.type = 'text/javascript'; ns.async;
  ns.src = 'http://www.epa.gov/epahome/notice.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ns, s);

  //Load the ForeSee ACSI Survey code
  var fs = document.createElement('script');
  fs.type = 'text/javascript'; fs.async;
  fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-trigger.js';
  //fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-alive.js';
  s.parentNode.insertBefore(fs, s);

  //Load the IA Menu
//  var ms = document.createElement('script');
//  ms.type = 'text/javascript'; ms.async;
//  ms.src = 'http://www.epa.gov/epafiles/js/epa-menu.js';
//  s.parentNode.insertBefore(ms, s);

  //Search Autosuggest
	var sb = jQuery("#searchbox");
	if (sb[0]) {
	  sb.autocomplete("/autocomplete",{minChars:2,delay:200,matchSubset:false,selectFirst:false}).result(function (event, data, formatted) {
	    jQuery('#EPAsearch').submit();
	  });
	}

  //Stripe all tables with class="zebra"
	var t = jQuery('table.zebra tr:even');
	if (t[0]) { t.addClass('tint'); }

  //Date last modified
  if (document.lastModified == "") { var d = new Date(); }
  else { var d = new Date(document.lastModified); }
  var updated = document.createElement('p'); updated.id = 'date';
  updated.appendChild(document.createTextNode('Last updated on ' + d.toLocaleDateString()));
  var f = document.getElementById('footer');
  f.appendChild(updated);
  //Page URL
  var page_URL = document.createElement('p'); page_URL.id = 'url';
  page_URL.appendChild(document.createTextNode(window.location.href));
  f.appendChild(page_URL);

  //NEW! icon
  var new_i = document.getElementsByTagName('ins');
  if(!new_i) return; var j = new_i.length;
  var x = new Date(); var today = new Date(x.toGMTString());
  var now = (Date.UTC(epaCore.takeYear(today),today.getMonth(),today.getDate(),0,0,0))/86400000;
  for ( var i = 0; i < j; i++) {
    if (!new_i[i].getAttribute('datetime')) continue;
    var a = new_i[i].getAttribute('datetime'); var b = a.split('-');
    var posted = (Date.UTC(b[0],b[1],b[2],0,0,0))/86400000;
    var time_left = posted - (now + 1);
    if (time_left < 31  &&  time_left > 0) {
      var icon = document.createElement('img');
      icon.alt = 'New!'; icon.src = 'http://www.epa.gov/epafiles/images/new-en.gif';
      icon.width = '34'; icon.height = '16';
      new_i[i].appendChild(icon);
    }
  };

  // Dropdown menus
  jQuery('#learn').append('<ul><li><a href="http://www.epa.gov/gateway/learn/airpollution.html">Air</a></li><li><a href="http://www.epa.gov/gateway/learn/climatechange.html">Climate Change</a></li><li><a href="http://www.epa.gov/gateway/learn/emergencies.html">Emergencies</a></li><li><a href="http://www.epa.gov/gateway/learn/greenliving.html">Green Living</a></li><li><a href="http://www.epa.gov/gateway/learn/health.html">Health &amp; Safety</a></li><li><a href="http://www.epa.gov/gateway/learn/landcleanup.html">Land &amp; Cleanup</a></li><li><a href="http://www.epa.gov/gateway/learn/pestchemtox.html">Pesticides, Chemicals &amp; Toxins</a></li><li><a href="http://www.epa.gov/gateway/learn/wastes.html">Waste</a></li><li><a href="http://www.epa.gov/gateway/learn/water.html">Water</a></li></ul>');
  jQuery('#scitech').append('<ul><li><a href="http://www.epa.gov/gateway/science/air.html">Air</a></li><li><a href="http://www.epa.gov/gateway/science/climatechange.html">Climate Change</a></li><li><a href="http://www.epa.gov/gateway/science/ecosystems.html">Ecosystems</a></li><li><a href="http://www.epa.gov/gateway/science/humanhealth.html">Health</a></li><li><a href="http://www.epa.gov/gateway/science/land.html">Land, Waste &amp; Cleanup</a></li><li><a href="http://www.epa.gov/gateway/science/pesticides.html">Pesticides</a></li><li><a href="http://www.epa.gov/gateway/science/substances.html">Substances &amp; Toxins</a></li><li><a href="http://www.epa.gov/gateway/science/sustainable.html">Sustainable Practices</a></li><li><a href="http://www.epa.gov/gateway/science/water.html">Water</a></li></ul>');
  jQuery('#laws').append('<ul><li><a href="http://www.epa.gov/lawsregs/sectors/">By Business Sector</a></li><li><a href="http://www.epa.gov/lawsregs/topics/">By Topic</a></li><li><a href="http://www.epa.gov/lawsregs/compliance/">Compliance</a></li><li><a href="http://www.epa.gov/lawsregs/enforcement/">Enforcement</a></li><li><a href="http://www.epa.gov/lawsregs/laws/">Laws &amp; Executive Orders</a></li><li><a href="http://www.epa.gov/lawsregs/policy/">Policy &amp; Guidance</a></li><li><a href="http://www.epa.gov/lawsregs/regulations/">Regulations</a></li></ul>');
  jQuery('#about').append('<ul><li><a href="http://blog.epa.gov/administrator/">Administrator Lisa P. Jackson</a></li><li><a href="http://www.epa.gov/aboutepa/leadership.html">Current Leadership</a></li><li><a href="http://cfpub.epa.gov/locator/index.cfm">Staff Directory</a></li><li><a href="http://www.epa.gov/planandbudget/">Planning, Budget, and Results</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#doing">Doing Business with Us</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#working">Working with Us</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#jobs">Jobs</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#offices">Headquarters Offices</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#regional">Regional Offices</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#labs">Labs and Research Centers</a></li><li><a href="http://www.epa.gov/aboutepa/index.html#map">Map of EPA Locations</a></li></ul>');
  jQuery('#header ul').superfish({delay:500,animation: {opacity:'show',height:'show'},speed:'fast',autoArrows: false,dropShadows: false});

  // Bookmarklet
/*	jQuery('#content').append('<ul id="share"><li><a href="#area">Share</a></li></ul>');
	var bookmarkList = '<ul><li class="delicious"><a href="#area" title="delicious">Del.icio.us</a></li><li class="digg"><a href="#area" title="digg">Digg</a></li><li class="facebook"><a href="#area" title="facebook">Facebook</a></li><!--li class="reddit"><a href="#area" title="reddit">reddit</a></li><li class="slashdot"><a href="#area" title="slashdot">Slashdot</a></li--><li class="stumble"><a href="#area" title="stumble">StumbleUpon</a></li><li class="whatisthis"><a href="#area" title="whatisthis">What is this?</a></li></ul>';
	jQuery('#share li').append(bookmarkList).hover(function() {jQuery(this).addClass("on");}, function() {jQuery(this).removeClass("on");});
	jQuery("#share li ul li a").click(function () {
	  var site = jQuery(this).attr('title');
	  var popURL = encodeURIComponent(window.location.href);
	  var title = encodeURIComponent(document.title);
	  switch (site) {
	    case "facebook": epaCore.postPopUp('http://www.facebook.com/sharer.php?u='+popURL+'&t='+title, 'facebook', 'status=0,height=436,width=646,scrollbars=yes,resizable=yes'); break;
	    case "digg": epaCore.postPopUp('http://digg.com/remote-submit?phase=2&url='+popURL+'&title='+title, 'digg', 'status=0,height=450,width=650,scrollbars=yes,resizable=yes'); break;
	    case "delicious": epaCore.postPopUp('http://www.delicious.com/save?v=5&noui&jump=close&url='+popURL+'&title='+title, 'delicious', 'status=0,height=400,width=700,scrollbars=yes,resizable=no');  break;
	    case "stumble": epaCore.postPopUp('http://www.stumbleupon.com/submit?url='+popURL+'&title='+title, 'stumble', 'status=0,height=400,width=700,scrollbars=yes,resizable=no'); break;
	    case "whatisthis": epaCore.postPopUp('http://www.epa.gov/epahome/bookmarks.htm', 'whatisthis', 'status=0,height=600,width=1000,scrollbars=yes,resizable=no'); break;
	  }
	});
*/
});