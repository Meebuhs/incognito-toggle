chrome.browserAction.onClicked.addListener(function() {
    migrateWindow();
});

function migrateWindow() {
    chrome.windows.getCurrent({populate: true}, window => {
        // Create a new window with all open tabs and switch the incognito state
        chrome.windows.create({incognito: !window.incognito, url: window.tabs.map(tab => tab.url)});
        // Close the original window
        if (window.id) {
            chrome.windows.remove(window.id)
        } else if (window.sessionId) {
            chrome.windows.remove(window.sessionId)
        }
    })
}