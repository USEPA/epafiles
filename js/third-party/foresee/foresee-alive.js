var FSR = {
    'version': '4.6.1',
    'date': '7/11/2009',
    'enabled': true,
    'files': 'http://www.epa.gov/epafiles/js/third-party/foresee/',
    'id': 'VkERNMYgs5wllZ0khFwkEA==',
    'sites': [{
        path: /\w+\.(gov|com|net)/,
        cookie: 'session'
    }]
};
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="foresee.alive="+A+";path=/;domain="+FSR.site.domain+";"
}(function(){if(window!=window.top){return }var F=FSR.sites;for(var D=0,C=F.length;D<C;D++){var B;
if(B=document.location.href.match(F[D].path)){FSR.siteid=D;FSR.site=FSR.sites[FSR.siteid];if(!FSR.site.domain){FSR.site.domain=B[0]
}if(!FSR.site.name){FSR.site.name=FSR.site.domain}var E=["files","js_files","image_files","html_files"];
for(var D=0,A=E.length;D<A;D++){if(FSR.site[E[D]]){FSR[E[D]]=FSR.site[E[D]]}}break}}if(!window["fsr$timer"]){fsr$setAlive();
window["fsr$timer"]=setInterval(fsr$setAlive,1000)}})();