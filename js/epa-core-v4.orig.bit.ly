// EPA's Core JS file, vOneEPA Web
// Last edited: 07 Mar 2011
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

  //Load the Bit.ly API code
  var bs = document.createElement('script');
  bs.async;
  bs.src = 'http://bit.ly/javascript-api.js?version=latest&login=usepagov&apiKey=R_c65b551f3cc5c883b2addc3ac8f64a20';
  s.parentNode.insertBefore(bs, s);

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
	    $(this).prepend("<img src='http://www.epa.gov/epafiles/images/new-en.gif' alt='New!' width='34' height='16'/>");
	  }
	});

  // Bookmarklet
	jQuery('#content').append('<ul id="share"><li><a href="#area">Share</a></li></ul>');
	var bookmarkList = '<ul><li class="facebook"><a href="#area" title="facebook">Facebook</a></li><li class="reddit"><a href="#area" title="reddit">reddit</a></li><li class="twitter"><a href="#area" title="twitter">Twitter</a></li><li class="whatisthis"><a href="#area" title="whatisthis">What is this?</a></li></ul>';
	jQuery('#share li').append(bookmarkList).hover(function() {jQuery(this).addClass("on");}, function() {jQuery(this).removeClass("on");});

// Tweet this via bit.ly
  jQuery('.twitter a').bind('click', shorten);
  function shorten(e) {
    e.preventDefault();
    var url = window.location.href;
    BitlyClient.shorten(url, response);
  }
  function response(data) {
    var bitly_link = null;
    for (var r in data.results) {
      bitly_link = data.results[r]['shortUrl'];
      var title = encodeURIComponent(document.title);
      //console.log(bitly_link);
      epaCore.postPopUp('http://twitter.com/home?status='+title+' at '+bitly_link+' /by @EPAgov', 'twitter', 'status=0,height=500,width=750'); break;
      break;
    }
  }

	jQuery("#share li ul li a").click(function () {
	  var site = jQuery(this).attr('title');
	  var popURL = encodeURIComponent(window.location.href);
	  var title = encodeURIComponent(document.title);
	  switch (site) {
	    case "facebook": epaCore.postPopUp('http://www.facebook.com/sharer.php?u='+popURL+'&t='+title, 'facebook', 'status=0,height=436,width=646'); break;
	    case "delicious": epaCore.postPopUp('http://www.delicious.com/save?v=5&noui&jump=close&url='+popURL+'&title='+title, 'delicious', 'status=0,height=400,width=700');  break;
	    case "reddit": epaCore.postPopUp('http://www.reddit.com/submit?url='+popURL, 'reddit', 'toolbar=0,status=0,height=450,width=650'); break;
	    case "stumble": epaCore.postPopUp('http://www.stumbleupon.com/submit?url='+popURL+'&title='+title, 'stumble', 'status=0,height=400,width=750'); break;
	    //case "twitter": epaCore.postPopUp('http://twitter.com/share?text='+title+'&url='+bitly_link+'&via=EPAgov', 'twitter', 'status=0,height=375,width=550,scrollbars=no,resizable=no'); break;
	    case "whatisthis": epaCore.postPopUp('http://www.epa.gov/epahome/bookmarks.htm', 'whatisthis', 'status=0,height=600,width=1000,scrollbars=yes,resizable=no'); break;
	  }
	});

});