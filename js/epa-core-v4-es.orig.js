// EPA's Core Spanish JS file, vOneEPA Web
// Edited: 23 Mar 2012, Added Twitter
// Edited: 20 June 2012, Added Google Analytics
// Eventually, merge with epa-core-v4.js
// Questions? hessling.michael@epa.gov
var epaCore = {
  //Date related functions
  takeYear: function(theDate) { var x = theDate.getYear(); var y = x % 100; y += (y < 38) ? 2000 : 1900; return y; },
  //Bookmarklet popup
  postPopUp: function(url, name, params) { var win = window.open(url, name, params); }
};


// Google Analytics
window._gaq = [['_setAccount','UA-32633028-1'],['_trackPageview'],['_trackPageLoadTime'],['_setDomainName','epa.gov']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
g.src='https://www.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));

// Use jQuery via jQuery(...); no conflict
jQuery(document).ready(function() {

// APE-like functionality
// Tracks non-HTML files and outbound links
  var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i,
      baseHref = '';
  if (jQuery('base').attr('href') != undefined) { baseHref = jQuery('base').attr('href'); }
  jQuery('#content a').each(function() {
    var href = jQuery(this).attr('href');
    if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
      jQuery(this).click(function() {
        var extLink = href.replace(/^https?\:\/\//i, '');
        _gaq.push(['_trackEvent', 'External', 'Link Click', extLink]);
        if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
          setTimeout(function() { location.href = href; }, 200);
          return false;
        }
      });
    }
    else if (href && href.match(/^mailto\:/i)) {
      jQuery(this).click(function() {
        var mailLink = href.replace(/^mailto\:/i, '');
        _gaq.push(['_trackEvent', 'Email', 'Link Click', mailLink]);
      });
    }
    else if (href && href.match(filetypes)) {
      jQuery(this).click(function() {
        var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
        var filePath = href;
        _gaq.push(['_trackEvent', 'Download',extension+ ' Click', filePath]);
        if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
          setTimeout(function() { location.href = baseHref + href; }, 200);
          return false;
        }
      });
    }
  });

  //Load Notice Script
  var ns = document.createElement('script');
  ns.async;
  ns.src = 'http://www.epa.gov/epahome/notice.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ns, s);

  //Load the ForeSee ACSI Survey code
  var fs = document.createElement('script');
  fs.async;
  fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-trigger.js';
  //fs.src = 'http://www.epa.gov/epafiles/js/third-party/foresee/foresee-alive.js';
  s.parentNode.insertBefore(fs, s);

  //Load the Crazy Egg code
  //var ces = document.createElement('script');
  //ces.async;
  //ces.src = 'http://dnn506yrbagrg.cloudfront.net/pages/scripts/0005/9240.js';
  //s.parentNode.insertBefore(ces, s);

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
	var x = new Date(); var today = new Date(x.toGMTString());
	var now = (Date.UTC(epaCore.takeYear(today),today.getMonth(),today.getDate(),0,0,0))/86400000;
	$("ins").each(function(i) {
	  var a = $(this).attr('datetime'); var b = a.split('-');
	  var posted = (Date.UTC(b[0],b[1],b[2],0,0,0))/86400000;
	  var time_left = posted - (now + 1);
	  if (time_left < 31  &&  time_left > 0) {
	    $(this).prepend("<img src='http://www.epa.gov/epafiles/images/new-es.gif' alt='&iexcl;Nuevo!' width='34' height='16'/>");
	  }
	});

   // Bookmarklet
	jQuery('#content').append('<ul id="share"><li><a href="#area">Share</a></li></ul>');
	var bookmarkList = '<ul><li class="facebook"><a href="#area" title="facebook">Facebook</a></li><li class="reddit"><a href="#area" title="reddit">reddit</a></li><li class="twitter"><a href="#area" title="twitter">Twitter</a></li><li class="whatisthis"><a href="#area" title="whatisthis">What is this?</a></li></ul>';
	jQuery('#share li').append(bookmarkList).hover(function() {jQuery(this).addClass("on");}, function() {jQuery(this).removeClass("on");});

	jQuery("#share li ul li a").click(function () {
	  var site = jQuery(this).attr('title');
	  var popURL = encodeURIComponent(window.location.href);
	  var title = encodeURIComponent(document.title);
	  switch (site) {
	    case "facebook": epaCore.postPopUp('http://www.facebook.com/sharer.php?u='+popURL+'&t='+title, 'facebook', 'height=436,width=646,scrollbars=yes,resizable=yes'); break;
	    case "reddit": epaCore.postPopUp('http://www.reddit.com/submit?url='+popURL, 'reddit', 'height=450,width=650,scrollbars=yes,resizable=yes'); break;
	    case "twitter": epaCore.postPopUp('https://twitter.com/share?text='+title+'&url='+popURL+'&via=EPAgov&count=none&lang=en', 'twitter', 'height=375,width=550,scrollbars=yes,resizable=yes'); break;
	    case "whatisthis": window.location='http://www.epa.gov/epahome/bookmarks.html'; break;
	  }
	});

});