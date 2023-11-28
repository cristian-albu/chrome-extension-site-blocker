document.addEventListener("DOMContentLoaded", function () {
    const blockButton = document.getElementById("blockButton");
    const unblockButton = document.getElementById("unblockButton");
    const siteInput = document.getElementById("siteInput");
    const statusElement = document.getElementById("status");
    const blockedSitesList = document.getElementById("blockedSitesList");

    console.log("Popup loaded");

    // Load blocked sites from storage and display them in the popup
    chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];
        blockedSitesList.innerHTML = blockedSites.map((site) => `<li>${site}</li>`).join("");
    });

    blockButton.addEventListener("click", function () {
        const site = siteInput.value.trim();
        if (site) {
            chrome.runtime.sendMessage({ action: "blockSite", site }, function (response) {
                if (response.success) {
                    statusElement.textContent = `${site} blocked successfully.`;
                    updateBlockedSitesList();
                }
            });
        } else {
            statusElement.textContent = "Please enter a valid site.";
        }
    });

    unblockButton.addEventListener("click", function () {
        const site = siteInput.value.trim();
        if (site) {
            chrome.runtime.sendMessage({ action: "unblockSite", site }, function (response) {
                if (response.success) {
                    statusElement.textContent = `${site} unblocked successfully.`;
                    updateBlockedSitesList();
                }
            });
        } else {
            statusElement.textContent = "Please enter a valid site.";
        }
    });

    // Function to update the blocked sites list in the popup
    function updateBlockedSitesList() {
        chrome.storage.sync.get("blockedSites", function (data) {
            const blockedSites = data.blockedSites || [];
            blockedSitesList.innerHTML = blockedSites.map((site) => `<li>${site}</li>`).join("");
        });
    }
});
