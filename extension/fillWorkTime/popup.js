chrome.tabs.query({active: true}, function (tabs) {
    var tab = tabs[0];
    /*    chrome.tabs.executeScript(tab.id, {
            file: "askForLeave.js"
        }, null);*/

    chrome.tabs.executeScript(tab.id, {file: "askForLeave.js"});
});