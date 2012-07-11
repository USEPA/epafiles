function newbieflag(newbieStartDate){

 var todaysDate=new Date();var startDate=new Date();startDate.setTime(Date.parse(newbieStartDate));var newbieLeftToGo=parseInt(1+(todaysDate-startDate)/86400000);var newbieInsert='<img src="http://www.epa.gov/epafiles/images/new-en.gif" border="0" width="34" height="16" hspace="0" vspace="0" alt="New!">';

 if (newbieLeftToGo < 31  &&  newbieLeftToGo > 0){ document.write(newbieInsert); }

}

// newbieflag.js v2 January 2005

