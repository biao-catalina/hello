document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.executeScript(null, {
        file: "getWorkTime.js"
    });
});