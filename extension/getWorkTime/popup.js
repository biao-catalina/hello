let tab_title = '';

function display_h1(results) {
    // alert(results)
    // document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
}

chrome.tabs.query({active: true}, function (tabs) {
    var tab = tabs[0];

    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
        file: "getWorkTime.js"
    }, display_h1);
});