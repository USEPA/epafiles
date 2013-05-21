 /* using unordered class ids
 span id name of "showhidesmallNNN is the "closed" content
 span id name of "showhidebigNNN is the "open" content
 NNN can be anything but MUST be identical, is used to differentiate sections
 'showhidesmall' has 13 characters, is identifier for show-all/hide-all toggles
 If no Javascript, all items will show. JeffM Nov 2009 */

function flipshowhide(theOne){
 var flipA = document.getElementById("showhidesmall" + theOne); var flipB = document.getElementById("showhidebig" + theOne); 
 var xxx = flipB.style.display; flipB.style.display = flipA.style.display; flipA.style.display = xxx;
}

function hideall(){
 var elems = document.getElementsByTagName("span");
 for(var i=0;i<=elems.length;i++){
  if(elems[i].id.substr(0,13) == "showhidesmall"){
   var theOne = elems[i].id.substr(13,elems[i].id.length);
   var flipA = document.getElementById("showhidesmall" + theOne); var flipB = document.getElementById("showhidebig" + theOne);
   flipB.style.display = "none"; flipA.style.display = "inline";
  }
 }
}

function showall(){
 var elems = document.getElementsByTagName("span");
 for(var i=0;i<=elems.length;i++){
  if(elems[i].id.substr(0,13) == "showhidesmall"){
   var theOne = elems[i].id.substr(13,elems[i].id.length);
   var flipA = document.getElementById("showhidesmall" + theOne); var flipB = document.getElementById("showhidebig" + theOne);
   flipB.style.display = "inline"; flipA.style.display = "none";
  }
 }
}
