
SRS = {
	addLoadEvent: function(f) {
		var oo = window.onload; 
		if (typeof window.onload != 'function') { 
			window.onload = f; 
		} else { 
			window.onload = function() { 
				if (oo) oo(); 
				f(); 
			} 
		} 
	},
	search: {
		d: null,
		init: function() {
			var s = document.getElementById('searchQuery');
			SRS.search.d = s.value;
			s.onfocus = function() {
				if (this.value == SRS.search.d) {
					this.value = '';
					this.className = this.className.replace(new RegExp(" searchQueryIA\\b"), "");
				}
			};
			s.onblur = function() {
				if (this.value == '') {
					this.value = SRS.search.d;
					this.className += " searchQueryIA";
				}
			}
		}
	},
	comment: {
		d: {},
		init: function() {
			//Inject the default WordPress moveForm function with advanced customization.
			if (typeof addComment != 'undefined') {
				addComment._moveForm = addComment.moveForm;
				addComment.moveForm = function(commId, parentId, respondId, postId) {
					var c = this.I('cancel-comment-reply-link');
					var r = this.I(respondId);
					if(!new RegExp('\\bcommentReplyActive\\b').test(r.className))
						r.className+=" commentReplyActive";
					var r = addComment._moveForm(commId, parentId, respondId, postId);
					c._onclick = c.onclick;
					c.onclick = function() {
						var respond = addComment.I(addComment.respondId);
						respond.className = respond.className.replace(new RegExp(" commentReplyActive\\b"), "");
						return this._onclick();
					}
					return r;
				}
			}
			
			//Activate form functionality
			var els = [
				{ID: 'replyName', defaultID: 'replyNameDefault'},
				{ID: 'replyEmail', defaultID: 'replyEmailDefault'},
				{ID: 'replyURL', defaultID: 'replyURLDefault'},
				{ID: 'comment', defaultID: 'replyMsgDefault'}
			];
			for (var i=0; i<els.length; i++) {
				var e = document.getElementById(els[i].ID);
				if (e != null) {
					var dv = document.getElementById(els[i].defaultID).value;
					e._dv = dv;
					e.onfocus = function() {
						if (this.value == this._dv) {
							this.value = '';
							this.className = this.className.replace(this.className.match(' inputIA')?' inputIA':'inputIA', '');
						}
					};
					e.onblur = function() {
						if (this.value == '') {
							this.value = this._dv;
							this.className += this.className==''?"inputIA":" inputIA";
						}
					}
				}
			}
			if(document.reply) {
				document.reply.onsubmit = function() {
					var els = [
						{ID: 'replyName', defaultID: 'replyNameDefault'},
						{ID: 'replyEmail', defaultID: 'replyEmailDefault'},
						{ID: 'replyURL', defaultID: 'replyURLDefault'},
						{ID: 'comment', defaultID: 'replyMsgDefault'}
					];
					for (var i=0; i<els.length; i++) {
						var e = document.getElementById(els[i].ID);
						if (e != null) {
							var dv = document.getElementById(els[i].defaultID).value;
							if (e.value == dv)
								e.value = '';
						}
					}
				}
				return true;
			}
			
		}
		
	}
};

SRS.addLoadEvent(SRS.search.init);
SRS.addLoadEvent(SRS.comment.init);
