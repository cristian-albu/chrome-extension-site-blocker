document.addEventListener("DOMContentLoaded", function () {
    const blockButton = document.getElementById("blockButton");
    const unblockButton = document.getElementById("unblockButton");
    const siteInput = document.getElementById("siteInput");
    const statusElement = document.getElementById("status");

    blockButton.addEventListener("click", function () {
        const site = siteInput.value.trim();
        if (site) {
            chrome.runtime.sendMessage({ action: "blockSite", site }, function (response) {
                if (response.success) {
                    statusElement.textContent = `${site} blocked successfully.`;
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
                }
            });
        } else {
            statusElement.textContent = "Please enter a valid site.";
        }
    });
});
