// To add emergency announcements to pages with the NEW TEMPLATE (3):
// 1) Put the message between the single quotes in the var line - include <span> tags - if you use HTML code, be sure to use double quotes

// 2) Add the message to all var lines that need it
// a) to show the announcement on the EPA home page, AA home pages, and regional home pages only, add message
// to first var line only

// b) to show the announcement on the pages above PLUS other major home pages, add message
// to first and second var lines only

// c) to show the announcement on all other EPA pages, add message to all var lines

// Otherwise, leave quote marks empty

//Suggested text - Our Web site will undergo scheduled maintenance from midnight ET on Friday, July 1, 2011 to 8am ET on Monday, July 4, 2011. During this time, you may find that our web pages are slow to load or that certain applications are not working.  We apologize for any inconvenience.

//ENGLISH
var toponly = '<span>Testing a message in english</span>';

var othermajor = '';

var allother = '';

// SPANISH Translation
var topESonly = '<span>Testing a message in spanish</span>';

var otherESmajor = '<span>Testing a message in spanish</span>';

var allESother = '<span>Testing a message in spanish</span>';

// DO NOT EDIT ANYTHING BELOW

/**
 * Checks a given class attribute for the presence of a given class
 *
 * @param   el         		DOM element object (or element ID) to check
 * @param   nameOfClass     The name of the CSS class to check for
 */
var checkClass = function(nameOfClass) {
  var result = new RegExp("(^|\\s+)" + nameOfClass + "(\\s+|$)");
  console.log(result);
  var re = result.test(document.body.className);
  console.log(re);
  return re;
 // return new RegExp("(^|\\s+)" + nameOfClass + "(\\s+|$)").test(body.className);
};

// Check if English (if 'es' is NOT a class)
if ( ! checkClass('es')) {

  // EPA home page, all AA home pages, and all regional home pages
  if(document.getElementById("sitewidea") && toponly != '') {
	document.getElementById("sitewidea").innerHTML = toponly;
  }

  // Several other home pages
  if(document.getElementById("sitewideb") && othermajor != '') {
	document.getElementById("sitewideb").innerHTML = othermajor;
  }

  // ALL pages using EPA template versions 3 and later
  if(document.getElementById("sitewidec") && allother != '') {
	document.getElementById("sitewidec").innerHTML = allother;
  }

}

// Check if Spanish
if (checkClass('es')) {

  // EPA home page, all AA home pages, and all regional home pages
  if(document.getElementById("sitewidea") && topESonly != '') {
	document.getElementById("sitewidea").innerHTML = topESonly;
  }

  // Several other home pages
  if(document.getElementById("sitewideb") && otherESmajor != '') {
	document.getElementById("sitewideb").innerHTML = otherESmajor;
  }

  // ALL pages using EPA template versions 3 and later
  if(document.getElementById("sitewidec") && allESother != '') {
	document.getElementById("sitewidec").innerHTML = allESother;
  }

}