window.onload = function () {
    console.log("Page has loaded. Running an action...");

    const site = window.location.hostname;
    chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];

        // Check if the site's root domain is in the blockedSites array
        const isBlocked = blockedSites.some((blockedSite) => {
            const blockedRootDomain = getRootDomain(blockedSite);
            return site.endsWith(blockedRootDomain) || site === blockedRootDomain;
        });

        console.log(site, "is blocked: ", isBlocked);
        const date = new Date();
        const time = date.getHours();

        if (isBlocked && time < 21) {
            // Redirect to a custom blocked page or show a message
            window.location.href = chrome.runtime.getURL("blocked.html");
        }

        sendResponse({ isBlocked });
    });
};

// Function to extract the root domain from a full domain
function getRootDomain(domain) {
    const parts = domain.split(".");
    if (parts.length > 2) {
        return parts.slice(1).join(".");
    } else {
        return domain;
    }
}
