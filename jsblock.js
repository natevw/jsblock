var domainsBlockedFromScripting = ["tynt.com", "intellitxt.com", "kontera.com", "snap.com", "google-analytics.com"];

chrome.runtime.onInstalled.addListener(function () {
    // see http://developer.chrome.com/extensions/declarativeWebRequest.html
    // NOTE: if only this is used, then script need NOT be persistent
    if (chrome.declarativeWebRequest) chrome.declarativeWebRequest.onRequest.addRules([{
        conditions: domainsBlockedFromScripting.map(function (host) {
            return new chrome.declarativeWebRequest.RequestMatcher({url:{hostSuffix:host}, resourceType:['script']});
        }),
        actions: [new chrome.declarativeWebRequest.CancelRequest()]
    }]);
    // see http://developer.chrome.com/extensions/webRequest.html
    // NOTE: when this is used this script must be persistent
    else chrome.webRequest.onBeforeRequest.addListener(function (e) {
        return {cancel:true};
    }, {urls:domainsBlockedFromScripting.map(function (host) { return "*://*."+host+"/*"; }), types:['script']}, ['blocking']);
}); 