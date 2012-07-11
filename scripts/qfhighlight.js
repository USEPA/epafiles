<!-- //
function highlightQfTopic(topicID,type,bReset){
	var HLcolor = '#eeeeee'; // highlight box color
	var FontColor = '000000'; // color for topic text to become when highlighted
	var HLcolorReset = '#ffffff'; // color to reset highlighted box when on longer pointed to
	var FontColorReset = '000000'; // color to reset topic text when no longer pointed to

	if (document.getElementById){
		if (bReset) {
			eval('document.getElementById("qfT' + topicID + '").style.color = FontColorReset');
			//eval('document.all.qfT' + topicID + '.style.textDecoration = "none"');
			eval('document.getElementById("qfT' + topicID + '").style.backgroundColor = HLcolorReset');		
			eval('document.getElementById("qfR' + topicID + '").style.backgroundColor = HLcolorReset');
			eval('document.getElementById("qfN' + topicID + '").style.backgroundColor = HLcolorReset');
		}
		else {
			eval('document.getElementById("qfT' + topicID + '").style.color = FontColor');
			//eval('document.all.qfT' + topicID + '.style.textDecoration = "underline"');
			eval('document.getElementById("qfT' + topicID + '").style.backgroundColor = HLcolor');
			switch (type) {
				case 1:
					eval('document.getElementById("qfR' + topicID + '").style.backgroundColor = HLcolor');
					break;
				case 2:
					eval('document.getElementById("qfN' + topicID + '").style.backgroundColor = HLcolor');
					break;	
			}
		}
	}	
	
	/*
	else 
	{
		if (bReset) {
			//eval('document.layer["qfT' + topicID + '"].document.color = FontColorReset');
			eval('document.qfT' + topicID + '.document.bgColor = HLcolorReset');
			eval('document.qfR' + topicID + '.document.bgColor = HLcolorReset');
			eval('document.qfN' + topicID + '.document.bgColor = HLcolorReset');
		}
		else {
			//eval('document.layer["qfT' + topicID + '"].document.color = FontColor');
			//eval('document.all.qfT' + topicID + '.style.textDecoration = "underline"');
			eval('document.qfT' + topicID + '.document.bgColor = HLcolor');
			switch (type) {
				case 1:
					eval('document.qfR' + topicID + '.document.bgColor = HLcolor');
					break;
				case 2:
					eval('document.qfN' + topicID + '.document.bgColor = HLcolor');
					break;	
			}
		
		}
	}*/
} 

//-->