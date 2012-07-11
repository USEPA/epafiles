//Dropdown for IE6
SRS.dd = function() {
	if(document.getElementById("headerMenu1")) {
		var els = document.getElementById("headerMenu1").getElementsByTagName("LI");
		for (var i=0; i<els.length; i++) {
			els[i].onmouseover = function() {
				this.className += " jHover";
				this.style.zIndex = '2';
			};
			els[i].onmouseout = function() {
				this.className = this.className.replace(new RegExp(" jHover\\b"), "");
				this.style.zIndex = '1';
			};
		}
	}

	var els = document.getElementById("headerMenu2").getElementsByTagName("LI");
	for (var i=0; i<els.length; i++) {
		els[i].onmouseover = function() {
			this.className += " jHover";
			this.style.zIndex = '2';
		};
		els[i].onmouseout = function(e) {
			this.className = this.className.replace(new RegExp(" jHover\\b"), "");
			this.style.zIndex = '1';
		};
	}
}

SRS.addLoadEvent(SRS.dd);
