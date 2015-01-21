/* EPA's Core JS file, vOneEPA Web
 * 20 June 2012: Added Google Analytics
 * 25 Feb 2014: Share dropdown: added Pinterest and Google+, removed reddit
 * 25 Feb 2014: GA Link Tracking: Added GSA code, colorbox fix, and extended file types tracked
 * 06 Aug 2014: Mailto and Colorbox fixes
 * 22 Aug 2014: Rewritten to add code for Universal Analytics (UA)
 *              to run in parallel with Classic GA for a test period
 * 30 Oct 2014: Classic GA code removed -- tracking with Universal Analytics only
 * 21 Jan 2015: Added "media" parameter to PinIt share button
 * Questions? hessling.michael@epa.gov
 */
var epaCore = {
	printAsIs_Date_URL: function() {
		var f = document.getElementById('footer');
		if (!f) return;
		var p_text = document.createElement('p');
		p_text.id = 'printAsIs';
		var p_func = document.createElement('a');
		p_func.href = '#';
		p_func.title = 'Print this page as-is.';
		p_func.onclick = function() {
			epaCore.p_view();
			return false;
		};
		p_func.appendChild(document.createTextNode('Print As-Is'));
		p_text.appendChild(p_func);
		f.appendChild(p_text);

		var page_URL = document.createElement('p');
		page_URL.id = 'url';
		page_URL.appendChild(document.createTextNode(window.location.href));
		f.insertBefore(page_URL, p_text);

		//Date last modified
		if (document.lastModified == "") {
			var d = new Date();
		} else {
			var d = new Date(document.lastModified);
		}
		var updated = document.createElement('p');
		updated.id = 'date';
		updated.appendChild(document.createTextNode('Last updated on ' + d.toLocaleDateString()));
		f.appendChild(updated);
	},
	//printAsIs_Date_URL
	p_view: function() {
		var links = document.getElementsByTagName('link');
		for (var i = 0; i < links.length; i++) {
			var linkHREF = links[i].getAttribute('href');
			if (linkHREF == 'http://www.epa.gov/epafiles/s/print.css') {
				links[i].removeAttribute('href');
				links[i].href = 'http://www.epa.gov/epafiles/s/epa.css';
			}
		}
		epaCore.add_preview_message();
	},
	//p_view
	add_preview_message: function() {
		var f = document.getElementById('footer');
		var printPara = document.createElement('p');
		printPara.innerHTML = '<b>This document will now print as it appears on screen when you use the File &raquo; Print command.</b><br>Use View &raquo; Refresh to return to original state.';
		f.appendChild(printPara);
	},
	//add_preview_message
	newIcon: function() {
		var new_i = document.getElementsByTagName('ins');
		if (!new_i) return;
		var j = new_i.length;
		var x = new Date();
		var today = new Date(x.toGMTString());
		var now = (Date.UTC(epaCore.takeYear(today), today.getMonth(), today.getDate(), 0, 0, 0)) / 86400000;
		for (var i = 0; i < j; i++) {
			if (!new_i[i].getAttribute('datetime')) continue;
			var a = new_i[i].getAttribute('datetime');
			var b = a.split('-');
			var posted = (Date.UTC(b[0], b[1], b[2], 0, 0, 0)) / 86400000;
			var time_left = posted - (now + 1);
			if (time_left < 31 && time_left > 0) {
				var icon = document.createElement('img');
				icon.alt = 'New!';
				icon.src = 'http://www.epa.gov/epafiles/images/new-en.gif';
				icon.width = '34';
				icon.height = '16';
				new_i[i].appendChild(icon);
			}
		}
	},
	//newIcon
	takeYear: function(theDate) {
		var x = theDate.getYear();
		var y = x % 100;
		y += (y < 38) ? 2000 : 1900;
		return y;
	},

	notice: function() {
		var ns = document.createElement('script');
		ns.type = 'text/javascript';
		ns.async = true;
		ns.src = 'http://www.epa.gov/epahome/notice.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ns, s);
	},
	//notice
	addClass: function(element, name) {
		if (!element.className) {
			element.className = name;
		} else {
			element.className += ' ';
			element.className += name;
		}
	},
	//addClass
	stripeTables: function() {
		if (!document.getElementsByTagName('table')) return;
		var t = document.getElementsByTagName('table');
		var l = t.length;
		for (var i = 0; i < l; i++) {
			if (t[i].className.match('zebra')) {
				var tr = t[i].getElementsByTagName('tr');
				var k = tr.length;
				for (var j = 1; j < k; j = j + 2) {
					epaCore.addClass(tr[j], 'tint');
				}
			}
		}
	},
	//stripeTables
	showHideSwap: function(id1, id2) {
		var id1c = document.getElementById(id1);
		var id2c = document.getElementById(id2);
		if (id1c.className == 'hide' && id2c.className == 'post') {
			id1c.className = 'show';
			id2c.className = 'postFrame';
		} else {
			id1c.className = 'hide';
			id2c.className = 'post';
		}
	},
	//showHideSwap
	articleShare: function(site) {
		var popUrl = encodeURIComponent(window.location.href);
		var title = encodeURIComponent(document.title);
    var pin_media = encodeURIComponent('http://www2.epa.gov/sites/all/themes/epa/img/epa-seal.png');
		var description = '';
		switch (site) {
			case "facebook":
				epaCore.postPopUp("http://www.facebook.com/sharer.php?u=" + popUrl + "&t=" + title, "facebook", "height=436,width=646,scrollbars=yes,resizable=yes");
				ga('EPA.send', 'social', 'facebook', 'share click', popUrl);
				ga('EPA.send', 'event', 'Share', 'facebook', popUrl);
				break;
			case "twitter":
				epaCore.postPopUp("https://twitter.com/share?text=" + title + "&url=" + popUrl + "&via=EPA&count=none&lang=en", "twitter", "height=375,width=550,scrollbars=yes,resizable=yes");
				ga('EPA.send', 'social', 'twitter', 'share click', popUrl);
				ga('EPA.send', 'event', 'Share', 'twitter', popUrl);
				break;
			case "gplus":
				epaCore.postPopUp("https://plus.google.com/share?url=" + popUrl, "gplus", "height=375,width=550,scrollbars=yes,resizable=yes");
				ga('EPA.send', 'social', 'gplus', 'share click', popUrl);
				ga('EPA.send', 'event', 'Share', 'gplus', popUrl);
				break;
			case "pin":
				epaCore.postPopUp("http://pinterest.com/pin/create/button/?url=" + popUrl + "&description=" + title+'media='+pin_media, "pin", "height=375,width=550,scrollbars=yes,resizable=yes");
				ga('EPA.send', 'social', 'pin', 'share click', popUrl);
				ga('EPA.send', 'event', 'Share', 'pin', popUrl);
				break;
		}
	},
	//articleShare
	postPopUp: function(url, name, params) {
		var win = window.open(url, name, params);
	},

	addPostItem: function(parentElement, style, post_link, text) {
		var postItem = document.createElement("li");
		postItem.className = style;
		var itemLink = document.createElement("a");
		itemLink.setAttribute("href", post_link);
		itemLink.innerHTML = text;
		postItem.appendChild(itemLink);
		parentElement.appendChild(postItem);
	},
	//addPostItem
	writePost: function() {
		if (!document.getElementById('footer')) return;
		if (document.getElementById('aara')) return;
		var f = document.getElementById("footer");
		var parentElement = document.createElement("ul");
		parentElement.id = "bookmarkList";

		//create post li
		var postElement = document.createElement("li");
		postElement.className = "post";
		postElement.setAttribute("id", "post");
		// create post link
		var postLink = document.createElement("a");
		postLink.setAttribute("href", "#");
		postLink.onclick = function() {
			epaCore.showHideSwap('postList', 'post');
			return false;
		};
		postLink.innerHTML = "Share";
		postElement.appendChild(postLink);

		// create unordered list for post items
		var postList = document.createElement("ul");
		postList.setAttribute("id", "postList");
		postList.className = "hide";

		//add post links
		epaCore.addPosts(postList);

		postElement.appendChild(postList);
		parentElement.appendChild(postElement);
		f.appendChild(parentElement);
	},
	//writePost
	addPosts: function(shareList) {
		var sList;
		if (typeof(shareList) == 'string') {
			sList = document.getElementById(shareList);
		} else if (typeof(shareList) == 'object') {
			sList = shareList;
		} else return false;

		epaCore.addPostItem(sList, "facebook", "javascript:epaCore.articleShare('facebook');", "Facebook");
		epaCore.addPostItem(sList, "gplus", "javascript:epaCore.articleShare('gplus');", "Google+");
		epaCore.addPostItem(sList, "pin", "javascript:epaCore.articleShare('pin');", "Pinterest");
		epaCore.addPostItem(sList, "twitter", "javascript:epaCore.articleShare('twitter');", "Twitter");
	} //addPosts
}; // end epaCore

function addEvent(obj, type, fn) {
	if (document.getElementById && document.createTextNode) {
		if (obj.addEventListener) {
			obj.addEventListener(type, fn, false);
		} else if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn] = function() {
				obj['e' + type + fn](window.event);
			}
			obj.attachEvent('on' + type, obj[type + fn]);
		}
	}
} //addEvent()
addEvent(window, 'load', epaCore.printAsIs_Date_URL);
addEvent(window, 'load', epaCore.newIcon);
addEvent(window, 'load', epaCore.notice);
addEvent(window, 'load', epaCore.stripeTables);
addEvent(window, 'load', epaCore.writePost);

/* Start Google Analytics */

// UA: Call the Universal Analytics script from a Google server
/* begin script call */
(function(i,s,o,g,r,a,m){
	i['GoogleAnalyticsObject']=r;
	i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)
	},
	i[r].l=1*new Date();
	a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];
	a.async=1;
	a.src=g;
	m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* end script call */

function loadtracking() {

	/* Get Root Domain- Used for Google Analytics
	 * _setDomainName & Cross-Domain Checking & GSA CustomDim2
	 */
	var epaGA_hostName = window.location.hostname;
	var epaGA_hostArray = epaGA_hostName.split('.').slice(-2);
	var epaGA_hostDomain = epaGA_hostArray.join('.').toLowerCase();

	/* Get GA Visitor Cookie */
	function getCookie(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		} // for ARRcookies loop
	}

	// passToUA

	var cookieX=getCookie("_ga");
	if (cookieX!=null && cookieX!="") {
		var split = cookieX.split(".");
		var gaVisitorID = (split[2]);
		var passToUA = gaVisitorID;
	} else {
		passToUA = "one and done visitor";
	}

	/* START For Cross Domain Tracking Use Visitor ID
	 * from __utma query param instead of cookie
	 */
	function getQuerystring(key, default_) {
		if (default_ == null) default_ = "";
		key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
		var qs = regex.exec(window.location.href);
		if (qs == null) {
			return default_;
		} else {
			return qs[1];
		}
	} // getQuerystring

	// passToUA

	if(window.location.href.indexOf('_ga') > 1) {
		passToUA = getQuerystring('_ga').split('.')[2];
	} else {
		//nothing
	}
	/* END For Cross Domain Tracking Use Visitor ID */

// Page Level Google Analytics Code


	// UA: create tracker object for EPA Universal property
	ga('create', {
		'trackingId': 'UA-32633028-1',
		'cookieDomain': epaGA_hostDomain,
		'name': 'EPA',
		'allowLinker': true
	});


	// UA: track page view and send custom dimension
	ga('EPA.send', 'pageview', {
		'dimension1': passToUA
	});

	// // removed lines for _gaq.push

	// Parallel tracking to GSA
	ga('create', {
		'trackingId': 'UA-33523145-1',
		'cookieDomain': epaGA_hostDomain,
		'name': 'GSA',
		'allowLinker': true
	});


	// UA: track page view and send custom dimensions to GSA
	ga('GSA.set', {
		'dimension1': 'EPA',
		'dimension2': 'EPA - ' + epaGA_hostName,
		'dimension3': 'EPA 2.0 141101'
	});
	ga('GSA.send', 'pageview');


	/* Google Analytics Download and
	 * External Link & Mailto & Cross Domain Tracking
	 */

	//Helper function to safely attach to a link
	var unobtrusiveAddEvent = function (element, event, fn) {
		try {
			var old = element[event] ? element[event] : function () {};
			element[event] = function () {fn.call(this);return old.call(this);};
		} catch (err) { }
	};

	function trackDownloads() {
		var myLinks = document.links;

		//Specify Filetypes Tracked
		var fileTypes = ['ai', 'csv', 'dmg', 'doc', 'docx', 'eps', 'exe', 'gif', 'ico', 'jpeg', 'jpg', 'json', 'kml', 'mp3', 'msi', 'pdf', 'png', 'ppt', 'pptx', 'psd', 'rar', 'smi', 'swf', 'tif', 'txt', 'xls', 'xlsm', 'xlsx', 'xml', 'xsd', 'zip'];

		//Specify Cross Domains Tracked
		var crossDomains = ['epa.gov','epa-otis.gov','epa-echo.gov','echo.epa.gov','energystar.gov','enviroflash.info','airnow.gov','urbanwaters.gov','relocatefeds.gov','lab21century.gov','supportportal.com'];

		var crossDomainExclude = ['http://oaspub.epa.gov/enviro/fii_query_dtl.disp_program_facility','http://iaspub.epa.gov/enviro/tsca.get_chem_info','http://iaspub.epa.gov/enviro/ICIS_DETAIL_REPORTS_NPDESID.icis_tst','http://oaspub.epa.gov/enviro/tris_control.tris_print', 'http://www.epa.gov/myenv/myenview2.html','http://www.epa.gov/emefdata/em4ef.html','http://nepassisttool.epa.gov/nepassist/nepamap.aspx','http://nepassist.epa.gov/nepave/nepamap.aspx','cfpub.epa.gov','yosemite.epa.gov','iaspub.epa.gov','oaspub.epa.gov','ofmpub.epa.gov','watersgeo.epa.gov','cfpub2.epa.gov','cumulis.epa.gov','cfpub1.epa.gov','actor.epa.gov','nepis.epa.gov','yosemite1.epa.gov','ofmext.epa.gov','epamap32.epa.gov','gispub2.epa.gov','gispub6.epa.gov','epamap10.epa.gov','epamap21.epa.gov','maps6.epa.gov','http://ghgdata.epa.gov/ghgp/main.do'];

		var theLink ='';
		var theValue = '';
		var theType = '';
		var theTarget = '';

		function track(type, theLink, val1, target){

			var cbox_check1 = "colorbox";
			var cbox_check2 = "cbox";

			if(target == ""){
				target = "_self";
			}
			// UA: new lines rewrite _gaq.push as ga(send)
			try {
				if(type == "Email"){
					setTimeout("window.open('" + theLink.href + "','_self')", 150);
					ga('EPA.send', 'event', type, 'Link Click', val1);
					ga('GSA.send', 'event', type, 'Link Click', val1);
				}
				else if(type == "Download") {
					if (theLink.className.indexOf(cbox_check1) == -1 && theLink.className.indexOf(cbox_check2) == -1) {
						setTimeout("window.open('"+theLink.href+"','"+ target+"')", 150);
					}
					ga('EPA.send', 'event', type, val1 + ' Click', theLink.href);
					ga('GSA.send', 'event', type, val1 + ' Click', theLink.href);
				}
				else if(type == "External" && document.location.hostname != theLink.hostname) {
					if (theLink.className.indexOf(cbox_check1) == -1 && theLink.className.indexOf(cbox_check2) == -1) {
						setTimeout("window.open('"+theLink.href+"','"+ target+"')", 150);
					}
					ga('EPA.send', 'event', type, val1, theLink.href);
					ga('GSA.send', 'event', type, val1, theLink.href);
				}
				else {
					window.open(theLink.href, target);
				}
			} // close try
				catch(e){}
		};//close track()

		for(var i=0;i < myLinks.length;i++) {
			if(myLinks[i].onclick != null || myLinks[i].href.indexOf("javascript:") > -1) {
				continue;
			}
			var download = false;
			for(var k=0;k < fileTypes.length; k++) {
				if(myLinks[i].href.indexOf("." + fileTypes[k]) > -1) {
					theLink = myLinks[i];
					theValue = fileTypes[k];
					theTarget = myLinks[i].target;
					theType = "Download";
					theTarget = myLinks[i].target;
					var f =function(theType, theLink, theValue, theTarget) {
						return function() {
							track(theType, theLink, theValue, theTarget);
							return false;
						};
					}(theType, theLink, theValue, theTarget);
					myLinks[i].onclick = f;
					download = true;
					break;
				}//close ifmyLinks href
			}//close fileTypesLoop

			if(download == false) {
				if(myLinks[i].href.indexOf("mailto:") > -1) {
					theLink = myLinks[i];
					theTarget = null;
					theValue = myLinks[i].href.slice(7);
					theType = "Email";
					var g = function(theType, theLink, theValue, theTarget) {
						return function(){
							track(theType, theLink, theValue, theTarget);
							return false;
						};
					}(theType, theLink, theValue, theTarget);
					myLinks[i].onclick = g;
				}//close ifmyLinks Mail
				else {
					//Cross Domain
					var crossDomain = false;
					for(c=0;c < crossDomains.length; c++) {
						if((myLinks[i].href.indexOf(crossDomains[c]) > -1) && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)) {
							myLinks[i].onclick = function() {
								for(b=0;b < crossDomainExclude.length; b++) {
									if(this.href.indexOf(crossDomainExclude[b]) > -1) {
										target = this.target;
										if(target == "") {
											target = "_self";
										}
										setTimeout("window.open('"+this.href+"','"+ target+"')", 150);
										ga('EPA.send', 'event', 'External', 'Link Click', this.href);
										ga('GSA.send', 'event', 'External', 'Link Click', this.href);
										return false;
									} // if crossDomainExclude
								} //for CrossDomainExclude
								ga('EPA.send', 'event', 'crossDomain', 'Link Click', this.href);
								ga('GSA.send', 'event', 'crossDomain', 'Link Click', this.href);

								// UA: decorate the destination URL
								var trackers = ga.getAll();
								var linker = new window.gaplugins.Linker(trackers[0]);
								var destinationUrl = linker.decorate(this.href);

								// follow the link in the same window or a new window
								if (this.target == '_self' || this.target == '') {
									window.location=destinationUrl;
								} else {
									window.open(destinationUrl, this.target);
								}
								return false;
							}; //myLinks onClick function
							crossDomain = true;
							break;
						} // if myLinks crossDomains
					}	// for crossDomains
					//External
					if((crossDomain == false) && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)) {
						theLink = myLinks[i];
						theTarget = myLinks[i].target;
						theValue = "Link Click";
						theType = "External";
						var h = function(theType, theLink, theValue, theTarget) {
							return function(){
								track(theType, theLink, theValue, theTarget);
								return false;
							};
						}(theType, theLink, theValue, theTarget);
						myLinks[i].onclick = h;
					} //close if ExternalLink
				} // close if else crossDomain
			}  //close if download false
		} //close myLinks for Loop
	} //close trackDownloads

	unobtrusiveAddEvent(window, 'onload', trackDownloads);
	/* END Google Analytics Download */
} // loadtracking

loadtracking();
// End Google Analytics