<!-- //
function makeArray0() {
	for (i = 0; i<makeArray0.arguments.length; i++)
	this[i] = makeArray0.arguments[i];
}

var days = new makeArray0("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var months = new makeArray0('January','February','March','April','May','June','July','August','September','October','November','December');
				
function nths(day) {
	if (day == 1 || day == 21 || day == 31) return 'st';
	if (day == 2 || day == 22) return 'nd';
	if (day == 3 || day == 23) return 'rd';
	return 'th';
}
				
function getCorrectedYear(year) {
	year = year - 0;
	if (year < 70) return (2000 + year);
	if (year < 1900) return (1900 + year);
	return year;
}
				
function y2k(number) { 
	return (number < 1000) ? number + 1900 : number;
}
				
var last = document.lastModified;
var date = new Date(last);
var dateY2K = new Date(getCorrectedYear(date.getYear()),date.getMonth(),date.getDate());
			
document.write("Last updated on " + days[dateY2K.getDay()] + ", " + months[dateY2K.getMonth()] + " " + dateY2K.getDate() + nths(dateY2K.getDate()) + ", " + (y2k(dateY2K.getYear())) + "<br />");

// First, strip off any URL variables
var URLAddress = location.href.substring(0,(location.href.indexOf("?")>0)?location.href.indexOf("?"):location.href.length)

// Remove characters outisde the printable range as well as "<" and ">" which may indicate tags.
var newAddress = '';
for (i=7;i<URLAddress.length;i++)
{
 if ((URLAddress.charCodeAt(i) > 31 && URLAddress.charCodeAt(i) < 127) && URLAddress.charAt(i) != '>' && URLAddress.charAt(i) != '<')
  newAddress = newAddress + URLAddress.charAt(i);
}

// write cleaned URL
document.write("URL: http://" + escape(newAddress));
//-->