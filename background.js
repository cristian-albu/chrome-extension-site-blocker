chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ blockedSites: [] });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "blockSite") {
        chrome.storage.sync.get("blockedSites", function (data) {
            data.blockedSites.push(request.site);
            chrome.storage.sync.set({ blockedSites: data.blockedSites });
            sendResponse({ success: true });
        });
    } else if (request.action === "unblockSite") {
        chrome.storage.sync.get("blockedSites", function (data) {
            const index = data.blockedSites.indexOf(request.site);
            if (index !== -1) {
                data.blockedSites.splice(index, 1);
                chrome.storage.sync.set({ blockedSites: data.blockedSites });
            }
            sendResponse({ success: true });
        });
    } else if (request.action === "checkSite") {
        const site = window.location.hostname;
        chrome.storage.sync.get("blockedSites", function (data) {
            const isBlocked = data.blockedSites.includes(site);
            sendResponse({ isBlocked });
        });
    }
    return true; // Required to use sendResponse asynchronously
});
