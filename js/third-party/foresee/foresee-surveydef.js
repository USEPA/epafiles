FSR.surveydefs = [{
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 2,
        lf: 4
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 0,
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        local: ['indrasoft','induscorp','intranet','m','owstgauthor','staging','wcmsprd'],
        referer: []
    },
    
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b>Thank you for visiting the Environmental Protection Agency.</b><br><br><b>Upon leaving our website,</b> you may be randomly selected to take part in a customer satisfaction survey that is being conducted by ForeSee Results on behalf of the Environmental Protection Agency.<br><br>The feedback you provide will help the Environmental Protection Agency enhance its site and serve you better in the future. All results are strictly confidential.<br><br></div></div></BODY></HTML>',
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
		timeout: 0,
        buttons: {
            accept: 'Continue',
            decline: 'No thanks'
        },
        hideOnClick: false,
		css: 'foresee-dhtml.css'
    },
    
    tracker: {
        width: '500',
        height: '325',
        timeout: 3,
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600,
        loading: true
    },
    
    qualifier: {
        location: 'local',
        width: '500',
        height: '300',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
		css: false
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },

    loading: {
        url: 'survey_loading.html'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referer: true,
        terms: true,
        ref_url: true,
		url_params: false
    },
	
	previous: false,
	
    mode: 'first-party'
};
