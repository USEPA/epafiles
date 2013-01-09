// EPA's core functions
// Last edited: 14 May 2010
// Updated 20 June 2012: Added Google Analytics
// Questions? hessling.michael@epa.gov
var epaCore = {
  printAsIs_Date_URL : function() {
    var f = document.getElementById('footer');
    if(!f) return;
    var p_text = document.createElement('p'); p_text.id = 'printAsIs';
    var p_func = document.createElement('a'); p_func.href = '#';
    p_func.title = 'Print this page as-is.';
    p_func.onclick = function(){ epaCore.p_view(); return false; };
    p_func.appendChild(document.createTextNode('Print As-Is') );
    p_text.appendChild(p_func);
    f.appendChild(p_text);

    var page_URL = document.createElement('p'); page_URL.id = 'url';
    page_URL.appendChild(document.createTextNode(window.location.href));
    f.insertBefore(page_URL,p_text);

    //Date last modified
    if (document.lastModified == "") { var d = new Date(); }
    else { var d = new Date(document.lastModified); }
    var updated = document.createElement('p'); updated.id = 'date';
    updated.appendChild(document.createTextNode('Last updated on ' + d.toLocaleDateString()));
    f.appendChild(updated);
  },
  
  p_view : function() {
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
      var linkHREF = links[i].getAttribute('href');
      if (linkHREF == 'http://www.epa.gov/epafiles/s/print.css') {
        links[i].removeAttribute('href'); links[i].href = 'http://www.epa.gov/epafiles/s/epa.css';
      }
    }
    epaCore.add_preview_message();
  },

  add_preview_message : function() {
    var f = document.getElementById('footer');
    var printPara = document.createElement('p');
    printPara.innerHTML = '<b>This document will now print as it appears on screen when you use the File &raquo; Print command.</b><br>Use View &raquo; Refresh to return to original state.';
    f.appendChild(printPara);
  },

  newIcon : function() {
    var new_i = document.getElementsByTagName('ins');
  	if(!new_i) return;
  	var j = new_i.length;
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
  	}
  },

  takeYear : function(theDate) { var x = theDate.getYear(); var y = x % 100; y += (y < 38) ? 2000 : 1900; return y; },

  notice : function() {
    var ns = document.createElement('script');
    ns.type = 'text/javascript'; ns.async = true;
    ns.src = 'http://www.epa.gov/epahome/notice.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ns, s);
  },

	addClass : function(element,name) {
		if (!element.className) { element.className = name; }
		else { element.className+= ' '; element.className+= name; }
	},
	
	stripeTables : function() {
		if (!document.getElementsByTagName('table')) return;
		var t = document.getElementsByTagName('table');
		var l = t.length;
		for (var i = 0; i<l; i++) {
			if (t[i].className.match('zebra')) {
				var tr = t[i].getElementsByTagName('tr');
				var k = tr.length;
				for (var j=1; j<k; j=j+2) {
					epaCore.addClass(tr[j],'tint');
				}
			}
		}
	},

	showHideSwap : function(id1,id2) {
		var id1c = document.getElementById(id1); var id2c = document.getElementById(id2);
		if (id1c.className == 'hide' && id2c.className == 'post') {
			id1c.className = 'show'; id2c.className = 'postFrame';
		} else {
			id1c.className = 'hide'; id2c.className = 'post';
		}
	},

	articleShare : function(site) {
		var popUrl = encodeURIComponent(window.location.href);
		var title = encodeURIComponent(document.title);
		var description = '';
		switch (site) {
			case "facebook": epaCore.postPopUp('http://www.facebook.com/sharer.php?u='+popURL+'&t='+title, 'facebook', 'height=436,width=646,scrollbars=yes,resizable=yes'); break;
			case "reddit": epaCore.postPopUp('http://www.reddit.com/submit?url='+popURL, 'reddit', 'height=450,width=650,scrollbars=yes,resizable=yes'); break;
			case "twitter": epaCore.postPopUp('https://twitter.com/share?text='+title+'&url='+popURL+'&via=EPAgov&count=none&lang=en', 'twitter', 'height=375,width=550,scrollbars=yes,resizable=yes'); break;
			case "whatisthis": window.location='http://www.epa.gov/epahome/bookmarks.html'; break;
		}
	},
	
	postPopUp :function(url, name, params) { var win = window.open(url, name, params); },
	
	addPostItem : function(parentElement, style, post_link, text) {
		var postItem = document.createElement("li"); postItem.className = style;
		var itemLink = document.createElement("a");
		itemLink.setAttribute("href", post_link); itemLink.innerHTML = text;
		postItem.appendChild(itemLink); parentElement.appendChild(postItem);
	},
	
	writePost : function() {
		if(!document.getElementById('footer')) return;
		if (document.getElementById('aara')) return;
		var f = document.getElementById("footer");
		var parentElement = document.createElement("ul");
		parentElement.id = "bookmarkList";
		
		//create post li
		var postElement = document.createElement("li");
		postElement.className = "post"; postElement.setAttribute("id", "post");
		// create post link
		var postLink = document.createElement("a"); postLink.setAttribute("href", "#");
		postLink.onclick = function () { epaCore.showHideSwap('postList', 'post'); return false; };
		postLink.innerHTML = "Share";
		postElement.appendChild(postLink);
		
		// create unordered list for post items
		var postList = document.createElement("ul");
		postList.setAttribute("id","postList");	postList.className = "hide";
		
		//add post links
		epaCore.addPosts(postList);
		
		postElement.appendChild(postList);
		parentElement.appendChild(postElement);
		f.appendChild(parentElement);
	},
	
	addPosts : function(shareList) {	
		var sList;
		if(typeof(shareList)=='string') { sList = document.getElementById(shareList); }
		else if(typeof(shareList)=='object') { sList = shareList; }
		else return false;
	
		epaCore.addPostItem(sList, "facebook", "javascript:epaCore.articleShare('facebook');", "Facebook");
		epaCore.addPostItem(sList, "reddit", "javascript:epaCore.articleShare('reddit');", "reddit");
		epaCore.addPostItem(sList, "twitter", "javascript:epaCore.articleShare('twitter');", "Twitter");
		epaCore.addPostItem(sList, "whatisthis", "javascript:epaCore.articleShare('whatisthis');", "What is this?");
	}

}; // end epaCore

function addEvent( obj, type, fn ) {
	if (document.getElementById && document.createTextNode) {
		if (obj.addEventListener)
			obj.addEventListener( type, fn, false );
		else if (obj.attachEvent) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function() { obj['e'+type+fn]( window.event ); }
			obj.attachEvent( 'on'+type, obj[type+fn] );
		}
	}
}
addEvent(window, 'load', epaCore.printAsIs_Date_URL); addEvent(window, 'load', epaCore.newIcon);
addEvent(window, 'load', epaCore.notice); addEvent(window, 'load', epaCore.stripeTables);
addEvent(window, 'load', epaCore.writePost);

// Google Analytics
var _gaq = _gaq || [];

function loadtracking() {
  window._gaq.push(['_setAccount', 'UA-32633028-1']);
  window._gaq.push(['_trackPageview']);
  window._gaq.push(['_trackPageLoadTime']);
  window._gaq.push(['_setDomainName','epa.gov']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

loadtracking();