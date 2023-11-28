chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "checkSite") {
        const site = window.location.hostname;
        chrome.storage.sync.get("blockedSites", function (data) {
            const isBlocked = data.blockedSites.includes(site);
            sendResponse({ isBlocked });
        });
    }
});
